// Tarot Card Types
export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: string;
  nameCN: string;
  nameEN: string;
  suit: Suit;
  value: number | string;
  meaning: string;
}

// Major Arcana - 22 cards
export const majorArcana: TarotCard[] = [
  { id: 'fool', nameCN: '愚者', nameEN: 'The Fool', suit: 'major', value: 0, meaning: 'New beginnings, innocence, spontaneity, free spirit' },
  { id: 'magician', nameCN: '魔术师', nameEN: 'The Magician', suit: 'major', value: 1, meaning: 'Manifestation, resourcefulness, power, inspired action' },
  { id: 'high-priestess', nameCN: '女祭司', nameEN: 'The High Priestess', suit: 'major', value: 2, meaning: 'Intuition, sacred knowledge, divine feminine, the subconscious mind' },
  { id: 'empress', nameCN: '女皇', nameEN: 'The Empress', suit: 'major', value: 3, meaning: 'Femininity, beauty, nature, nurturing, abundance' },
  { id: 'emperor', nameCN: '皇帝', nameEN: 'The Emperor', suit: 'major', value: 4, meaning: 'Authority, structure, a father figure, leadership' },
  { id: 'hierophant', nameCN: '教皇', nameEN: 'The Hierophant', suit: 'major', value: 5, meaning: 'Spiritual wisdom, tradition, conformity, ethics, beliefs' },
  { id: 'lovers', nameCN: '恋人', nameEN: 'The Lovers', suit: 'major', value: 6, meaning: 'Love, harmony, relationships, values alignment, choices' },
  { id: 'chariot', nameCN: '战车', nameEN: 'The Chariot', suit: 'major', value: 7, meaning: 'Control, willpower, success, action, determination' },
  { id: 'strength', nameCN: '力量', nameEN: 'Strength', suit: 'major', value: 8, meaning: 'Courage, persuasion, influence, compassion, inner strength' },
  { id: 'hermit', nameCN: '隐士', nameEN: 'The Hermit', suit: 'major', value: 9, meaning: 'Soul-searching, introspection, inner guidance, solitude' },
  { id: 'wheel-of-fortune', nameCN: '命运之轮', nameEN: 'Wheel of Fortune', suit: 'major', value: 10, meaning: 'Good luck, karma, life cycles, destiny, turning point' },
  { id: 'justice', nameCN: '正义', nameEN: 'Justice', suit: 'major', value: 11, meaning: 'Fairness, truth, cause and effect, law, accountability' },
  { id: 'hanged-man', nameCN: '倒吊人', nameEN: 'The Hanged Man', suit: 'major', value: 12, meaning: 'Pause, surrender, letting go, new perspectives' },
  { id: 'death', nameCN: '死神', nameEN: 'Death', suit: 'major', value: 13, meaning: 'Endings, change, transformation, transition' },
  { id: 'temperance', nameCN: '节制', nameEN: 'Temperance', suit: 'major', value: 14, meaning: 'Balance, moderation, patience, purpose, meaning' },
  { id: 'devil', nameCN: '恶魔', nameEN: 'The Devil', suit: 'major', value: 15, meaning: 'Shadow self, attachment, addiction, restriction' },
  { id: 'tower', nameCN: '塔', nameEN: 'The Tower', suit: 'major', value: 16, meaning: 'Sudden change, upheaval, chaos, revelation, awakening' },
  { id: 'star', nameCN: '星星', nameEN: 'The Star', suit: 'major', value: 17, meaning: 'Hope, faith, purpose, renewal, spirituality' },
  { id: 'moon', nameCN: '月亮', nameEN: 'The Moon', suit: 'major', value: 18, meaning: 'Illusion, fear, anxiety, subconscious, intuition' },
  { id: 'sun', nameCN: '太阳', nameEN: 'The Sun', suit: 'major', value: 19, meaning: 'Positivity, fun, warmth, success, vitality' },
  { id: 'judgement', nameCN: '审判', nameEN: 'Judgement', suit: 'major', value: 20, meaning: 'Judgement, rebirth, inner calling, absolution' },
  { id: 'world', nameCN: '世界', nameEN: 'The World', suit: 'major', value: 21, meaning: 'Completion, integration, accomplishment, travel' },
];

// Minor Arcana card values
const minorValues = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];

// Minor Arcana names in Chinese
const minorNamesCN: Record<string, string> = {
  Ace: '一',
  Two: '二',
  Three: '三',
  Four: '四',
  Five: '五',
  Six: '六',
  Seven: '七',
  Eight: '八',
  Nine: '九',
  Ten: '十',
  Page: '侍从',
  Knight: '骑士',
  Queen: '皇后',
  King: '国王',
};

// Suit meanings
const suitMeanings: Record<string, string> = {
  wands: 'creativity, passion, energy, inspiration',
  cups: 'emotions, relationships, love, intuition',
  swords: 'thoughts, communication, conflict, decision',
  pentacles: 'material world, work, finances, manifestation',
};

// Create Minor Arcana cards
function createMinorArcana(suit: 'wands' | 'cups' | 'swords' | 'pentacles', suitCN: string): TarotCard[] {
  return minorValues.map((value, index) => ({
    id: `${suit}-${value.toLowerCase()}`,
    nameCN: `${suitCN}${minorNamesCN[value]}`,
    nameEN: `${value} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    suit,
    value: index + 1,
    meaning: suitMeanings[suit],
  }));
}

export const wandsArcana = createMinorArcana('wands', '权杖');
export const cupsArcana = createMinorArcana('cups', '圣杯');
export const swordsArcana = createMinorArcana('swords', '宝剑');
export const pentaclesArcana = createMinorArcana('pentacles', '星币');

// Complete deck
export const allCards: TarotCard[] = [
  ...majorArcana,
  ...wandsArcana,
  ...cupsArcana,
  ...swordsArcana,
  ...pentaclesArcana,
];

// Spread types
export type SpreadType = 'single' | 'three' | 'relationship' | 'five';

export interface SpreadPosition {
  id: string;
  name: string;
  nameEN: string;
  description?: string;
}

export const spreads: Record<SpreadType, SpreadPosition[]> = {
  single: [
    { id: 'position-1', name: '每日指引', nameEN: 'Daily Card' },
  ],
  three: [
    { id: 'past', name: '过去', nameEN: 'Past' },
    { id: 'present', name: '现在', nameEN: 'Present' },
    { id: 'future', name: '未来', nameEN: 'Future' },
  ],
  relationship: [
    { id: 'me', name: '你的能量', nameEN: 'Your Energy' },
    { id: 'them', name: '对方能量', nameEN: 'Their Energy' },
    { id: 'relationship', name: '关系', nameEN: 'Relationship' },
    { id: 'advice', name: '建议', nameEN: 'Advice' },
  ],
  five: [
    { id: 'situation', name: '状况', nameEN: 'Situation' },
    { id: 'obstacle', name: '障碍', nameEN: 'Obstacle' },
    { id: 'subconscious', name: '潜意识', nameEN: 'Subconscious' },
    { id: 'advice', name: '建议', nameEN: 'Advice' },
    { id: 'outcome', name: '结果', nameEN: 'Outcome' },
  ],
};

export const spreadNames: Record<SpreadType, string> = {
  single: '单张牌阵',
  three: '三张牌阵',
  relationship: '关系牌阵',
  five: '五张牌阵',
};

export const spreadNamesEN: Record<SpreadType, string> = {
  single: 'Single Card',
  three: 'Three Card Spread',
  relationship: 'Relationship Spread',
  five: 'Five Card Spread',
};
