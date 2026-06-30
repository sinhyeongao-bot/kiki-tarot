import { allCards, SpreadType, SpreadPosition } from '@/data/tarot';

export interface DrawnCard {
  cardId: string;
  position: string;
  positionEN: string;
  cardNameCN: string;
  cardNameEN: string;
  suit: string;
  isReversed: boolean;
  meaning: string;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawCards(spreadType: SpreadType, positions: SpreadPosition[]): DrawnCard[] {
  // Shuffle the deck
  const shuffledDeck = shuffleArray(allCards);

  // Draw cards based on spread type
  const numberOfCards = positions.length;
  const drawnCards = shuffledDeck.slice(0, numberOfCards);

  // Determine if each card is reversed (50% chance)
  return drawnCards.map((card, index) => ({
    cardId: card.id,
    position: positions[index].name,
    positionEN: positions[index].nameEN,
    cardNameCN: card.nameCN,
    cardNameEN: card.nameEN,
    suit: card.suit,
    isReversed: Math.random() < 0.5,
    meaning: card.meaning,
  }));
}

export function formatSpreadForCopy(
  question: string,
  spreadType: SpreadType,
  spreadName: string,
  spreadNameEN: string,
  cards: DrawnCard[]
): string {
  const cardLines = cards.map((card, index) => {
    const orientation = card.isReversed ? '逆位' : '正位';
    const orientationEN = card.isReversed ? 'Reversed' : 'Upright';
    return `${index + 1}. ${card.position}: ${card.cardNameCN} / ${card.cardNameEN}, ${orientation} (${orientationEN})`;
  }).join('\n');

  return `═══════════════════════════════════
✨ KIKI Tarot Reading ✨
═══════════════════════════════════

User Question: ${question || 'No specific question'}

Spread Type: ${spreadName} (${spreadNameEN})

Cards:
${cardLines}

═══════════════════════════════════
Final instruction:
Please analyze the spread as a whole, not card-by-card only. Provide interpretation of relationships, patterns, hidden meanings, and advice.
═══════════════════════════════════`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}
