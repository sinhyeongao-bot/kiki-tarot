# KIKI Tarot - Specification Document

## 1. Project Overview

**Project Name:** KIKI Tarot
**Project Type:** Frontend-only web application
**Core Functionality:** A tarot card drawing assistant that generates structured spreads for users to copy and paste into AI tools for interpretation.
**Target Users:** Individuals seeking spiritual guidance who want to use AI tools for tarot interpretation.

---

## 2. Visual & Rendering Specification

### Scene Setup
- **Layout:** Single-page application with card-based UI
- **Background:** Dark mystical gradient with subtle animated particles/stars
- **Theme:** Dark mode only - deep purple/black with gold accents

### Color Palette
| Element | Color |
|---------|-------|
| Background Primary | `#0a0a0f` (near black) |
| Background Secondary | `#12121a` (dark purple-black) |
| Gold Primary | `#d4af37` (classic gold) |
| Gold Light | `#f4d03f` (bright gold) |
| Gold Dark | `#b8860b` (dark gold) |
| Text Primary | `#e8e8e8` (off-white) |
| Text Secondary | `#9d9d9d` (muted gray) |
| Card Background | `#1a1a24` (dark purple) |
| Accent Purple | `#6b21a8` (mystical purple) |

### Typography
- **Headings:** "Cinzel" (Google Font) - elegant serif for mystical feel
- **Body:** "Inter" (Google Font) - clean modern readability
- **Card Names:** Both Chinese and English displayed

### Materials & Effects
- **Gold borders:** 2px solid gold with subtle glow effect
- **Card hover:** Scale up 1.05 with enhanced glow
- **Reveal animation:** Flip animation with 3D transform
- **Background particles:** Subtle floating gold particles (CSS only)

---

## 3. Application Structure

### Spread Types
1. **Single Card** - Daily guidance
   - Positions: "Daily Card"

2. **Three Card Spread** - Classic
   - Positions: "Past" / "Present" / "Future"

3. **Relationship Spread** - For love/connection questions
   - Positions: "Your Energy" / "Their Energy" / "Relationship" / "Advice"

4. **Five Card Spread** - Comprehensive
   - Positions: "Situation" / "Obstacle" / "Subconscious" / "Advice" / "Outcome"

### Tarot Deck Structure

#### Major Arcana (22 cards)
```
0. The Fool (愚者)
I. The Magician (魔术师)
II. The High Priestess (女祭司)
III. The Empress (女皇)
IV. The Emperor (皇帝)
V. The Hierophant (教皇)
VI. The Lovers (恋人)
VII. The Chariot (战车)
VIII. Strength (力量)
IX. The Hermit (隐士)
X. Wheel of Fortune (命运之轮)
XI. Justice (正义)
XII. The Hanged Man (倒吊人)
XIII. Death (死神)
XIV. Temperance (节制)
XV. The Devil (恶魔)
XVI. The Tower (塔)
XVII. The Star (星星)
XVIII. The Moon (月亮)
XIX. The Sun (太阳)
XX. Judgement (审判)
XXI. The World (世界)
```

#### Minor Arcana (56 cards) - 14 cards per suit

**Wands (权杖) - Fire energy, passion, creativity**
- Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Page, Knight, Queen, King

**Cups (圣杯) - Water energy, emotions, relationships**
- Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Page, Knight, Queen, King

**Swords (宝剑) - Air energy, intellect, conflict**
- Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Page, Knight, Queen, King

**Pentacles (星币) - Earth energy, material, work**
- Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Page, Knight, Queen, King

---

## 4. Interaction Specification

### User Flow
1. User enters a question (optional but encouraged)
2. User selects spread type from visual buttons
3. User clicks "Draw Cards" button
4. Cards are randomly selected and displayed with reveal animation
5. Each card shows: position name, card name (CN/EN), upright/reversed status
6. User clicks "Copy Results" to copy formatted text

### Card Drawing Logic
- Fisher-Yates shuffle for true randomness
- Cards drawn without replacement (no duplicates in spread)
- 50% chance for each card to be upright or reversed

### Card UI Design
- **Size:** Responsive, ~200px width on desktop
- **Shape:** Rounded rectangle with gold border
- **Content:**
  - Top: Position label
  - Center: Symbolic icon (unique per suit/Major Arcana)
  - Card name in Chinese
  - Card name in English
  - Upright/Reversed indicator
- **Reversed state:** Card rotated 180° on Y-axis or displayed upside-down with "REVERSED" badge

### Symbolic Icons
- **Major Arcana:** Unique mystical symbols per card
- **Wands:** Flame/fire symbol
- **Cups:** Heart/water drop symbol
- **Swords:** Crossed swords
- **Pentacles:** Coin/gold circle
- **Ace:** Glowing center with suit symbol

### Copy Format
```
═══════════════════════════════════
✨ KIKI Tarot Reading ✨
═══════════════════════════════════

User Question: [user's question]

Spread Type: [spread name]

Cards:
[Number]. [Position]: [Card Name CN] / [Card Name EN], [Upright/Reversed]

═══════════════════════════════════
Final instruction:
Please analyze the spread as a whole, not card-by-card only. Provide interpretation of relationships, patterns, hidden meanings, and advice.
═══════════════════════════════════
```

---

## 5. Technical Requirements

### Framework & Tools
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **No external images** - all icons rendered with CSS/SVG

### File Structure
```
kiki-tarot/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── TarotCard.tsx
│   ├── SpreadSelector.tsx
│   ├── QuestionInput.tsx
│   ├── CopyButton.tsx
│   └── CardDisplay.tsx
├── data/
│   └── tarot.ts
├── utils/
│   └── spread.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

### State Management
- React useState for:
  - User question
  - Selected spread type
  - Drawn cards array
  - Copy status

---

## 6. Acceptance Criteria

### Functional
- [ ] User can enter a question
- [ ] User can select from 4 spread types
- [ ] Drawing cards produces correct number of cards for spread
- [ ] No duplicate cards in a single reading
- [ ] Each card has ~50% chance of being reversed
- [ ] Copy button copies correctly formatted text to clipboard
- [ ] All 78 cards are in the database with Chinese and English names

### Visual
- [ ] Dark mystical aesthetic achieved
- [ ] Gold borders and accents visible
- [ ] Card reveal animation smooth (flip effect)
- [ ] Reversed cards visually distinct
- [ ] Responsive on mobile and desktop
- [ ] Typography uses Cinzel for headings

### Performance
- [ ] Page loads under 2 seconds
- [ ] Animations run at 60fps
- [ ] No layout shift during card reveal
