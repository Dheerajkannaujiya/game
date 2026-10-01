# 🧠 BrainQuest – English & Maths Challenge

> **"Train Your Brain – One Puzzle at a Time"**

BrainQuest is a modern, interactive, and visually stunning educational puzzle game designed to sharpen cognitive agility, linguistic precision, and mathematical problem-solving skills through progressively challenging rounds.

---

## 🚀 Key Features

### 1. Game Modes
- **Play Game (Adaptive Mixed Challenge):** Dynamically scales difficulty (Easy → Medium → Hard → Expert) based on your answer streak.
- **English Puzzles:** 
  - Unscramble the word (interactive letter tiles + typing mode)
  - Fill in the blanks & grammar corrections
  - Synonyms & antonyms
  - Correct spelling & vocabulary
  - Sentence reconstruction (click-to-assemble word chips)
  - Odd one out & sentence completions
- **Maths Puzzles:**
  - Number series & missing number grids
  - Mental math (Addition, Subtraction, Multiplication, Division)
  - Percentages & Ratios
  - Profit & Loss
  - Time & Work problems
  - Algebraic equations
  - Logical & geometric puzzles
- **Daily Challenge:** 5 English + 5 Maths puzzles unique to each calendar day, tracking your daily streak and granting bonus XP.

### 2. Gameplay Mechanics
- **10 Questions Per Round:** Randomized question deck without repeats in any single round.
- **Dynamic Timer:** 30 seconds for normal questions, 60 seconds for complex/expert challenges (with optional toggle in Settings).
- **Lives System:** 3 hearts per round. Wrong answers or timeouts consume a heart.
- **Streak Multipliers:**
  - 🔥 3 Correct: **Hot Streak** (+5 pts)
  - 💥 5 Correct: **Super Streak** (+15 pts)
  - ✨ 10 Correct: **Brain Master** (+30 pts)
- **Scoring:** Easy (+10), Medium (+20), Hard (+30), Expert (+50) + Speed bonus for rapid answers!
- **Instant Feedback:** Green/red animations, celebratory sound effects, and explanations for every question.
- **Sound & Ambient Music:** Synthesized crystal-clear Web Audio API sound effects and relaxing ambient BGM with zero external audio file dependencies.
- **Confetti Celebrations:** Powered by `canvas-confetti` when beating high scores or finishing with high accuracy!

### 3. Progression & Profile
- **Player Ranks:** Level 1 (Beginner) through Level 10 (BrainQuest Champion) with XP progress tracking.
- **Player Customization:** Editable username and 12 fun avatars (🧠, ⚡, 👑, 🎯, 🚀, 📚, 🏆, etc.).
- **Achievements:** 13 unlockable badges (First Win, Maths Master, English Expert, Speed Solver, 90% Accuracy, Flawless Victory, etc.).
- **Career Statistics:** Tracks career games, total solved, accuracy %, subject-specific English & Maths accuracy, and best streaks.
- **Local Storage Persistence:** All progress, settings, and high scores persist in your browser.

---

## 🛠️ Technology Stack
- **Framework:** React 19 + Vite
- **Styling:** Vanilla CSS with custom glassmorphism design system & CSS variables
- **Icons:** `lucide-react`
- **Audio:** Web Audio API (Synthesized SFX + Ambient Chords)
- **Effects:** `canvas-confetti`
- **Fonts:** Outfit & Plus Jakarta Sans via Google Fonts

---

## 📦 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🏗️ Production Build

To test and compile an optimized production bundle:
```bash
npm run build
```
To preview the production bundle locally:
```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

### Method 1: Using the Vercel CLI (Fastest)
1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel:
   ```bash
   vercel login
   ```
3. Run the deployment command from the project root:
   ```bash
   vercel
   ```
4. For production deployment:
   ```bash
   vercel --prod
   ```

### Method 2: Via GitHub / Git (Recommended for Continuous Deployment)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: BrainQuest game"
   git remote add origin https://github.com/<your-username>/brainquest.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Import your `brainquest` repository.
5. Vercel automatically detects **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **Deploy**. Your game will be live with a secure HTTPS URL in seconds!

---

## 📁 Project Architecture

```
brainquest/
├── public/
│   └── logo.svg                # Vector game logo & favicon
├── src/
│   ├── assets/                 # Static media assets
│   ├── data/
│   │   ├── englishQuestions.js # English question bank (Easy -> Expert)
│   │   └── mathsQuestions.js   # Maths question bank (Easy -> Expert)
│   ├── utils/
│   │   ├── audio.js            # Web Audio API synthesizers (SFX & BGM)
│   │   ├── storage.js          # LocalStorage persistence & Level calculations
│   │   ├── achievements.js     # Achievements definitions & unlock triggers
│   │   ├── confettiHelper.js   # Confetti particle burst animations
│   │   └── gameEngine.js       # Round generation, difficulty ramp, validation
│   ├── components/
│   │   ├── Navbar.jsx          # Header with level pill, audio toggles, modals
│   │   ├── Home.jsx            # Landing menu with daily challenge hero banner
│   │   ├── Game.jsx            # Gameplay orchestrator
│   │   ├── QuestionCard.jsx    # Multiple-choice, unscramble, word arrange widgets
│   │   ├── Timer.jsx           # Dynamic countdown timer with audio warning
│   │   ├── ScoreBoard.jsx      # HUD with lives, streak multiplier, score
│   │   ├── ProgressBar.jsx     # Smooth 1-to-10 question progression bar
│   │   ├── ResultScreen.jsx    # Score, accuracy, XP, and question review
│   │   ├── Leaderboard.jsx     # Top player rankings with user highlighting
│   │   ├── Profile.jsx         # Career stats, avatar selector, subject mastery
│   │   ├── AchievementsModal.jsx # Unlocked/locked badges grid
│   │   ├── HowToPlayModal.jsx  # Rules, scoring, streak multipliers
│   │   └── SettingsModal.jsx   # Themes, sound toggles, reset progress
│   ├── App.jsx                 # Root component & routing
│   ├── App.css                 # Modular layout and glassmorphism styling
│   ├── index.css               # Design system tokens and animations
│   └── main.jsx                # React DOM entry point
├── index.html                  # HTML entry point with Google Fonts
├── package.json
└── vite.config.js
```
