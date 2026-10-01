// Achievements Definitions and Unlock Logic

export const ACHIEVEMENTS_LIST = [
  {
    id: "first_win",
    title: "First Win",
    icon: "🏆",
    description: "Complete your first full round in any game mode.",
    tier: "bronze"
  },
  {
    id: "ten_correct",
    title: "10 Correct Answers",
    icon: "🔥",
    description: "Accumulate 10 total correct answers across your games.",
    tier: "bronze"
  },
  {
    id: "maths_master",
    title: "Maths Master",
    icon: "🧠",
    description: "Complete a Mathematics round with 80% or higher accuracy.",
    tier: "silver"
  },
  {
    id: "english_expert",
    title: "English Expert",
    icon: "📚",
    description: "Complete an English round with 80% or higher accuracy.",
    tier: "silver"
  },
  {
    id: "speed_solver",
    title: "Speed Solver",
    icon: "⚡",
    description: "Answer a puzzle correctly in under 5 seconds.",
    tier: "silver"
  },
  {
    id: "ninety_accuracy",
    title: "90% Accuracy",
    icon: "🎯",
    description: "Finish a round with 90% or higher accuracy.",
    tier: "gold"
  },
  {
    id: "hot_streak",
    title: "Hot Streak",
    icon: "🔥",
    description: "Reach a streak of 3 consecutive correct answers.",
    tier: "bronze"
  },
  {
    id: "super_streak",
    title: "Super Streak",
    icon: "💥",
    description: "Reach a streak of 5 consecutive correct answers.",
    tier: "silver"
  },
  {
    id: "brain_master",
    title: "Brain Master",
    icon: "✨",
    description: "Achieve a perfect 10-question streak in a single round!",
    tier: "gold"
  },
  {
    id: "flawless_victory",
    title: "Flawless Victory",
    icon: "🌟",
    description: "Finish a 10-question round with all 3 lives intact and 100% accuracy.",
    tier: "gold"
  },
  {
    id: "puzzle_master",
    title: "Puzzle Master",
    icon: "👑",
    description: "Reach Player Level 5 (Puzzle Master).",
    tier: "gold"
  },
  {
    id: "seven_day_streak",
    title: "7 Day Streak",
    icon: "📅",
    description: "Achieve a 7-day daily challenge streak.",
    tier: "platinum"
  },
  {
    id: "brainquest_champion",
    title: "BrainQuest Champion",
    icon: "🌌",
    description: "Ascend to Player Level 10 (BrainQuest Champion).",
    tier: "platinum"
  }
];

export const checkAchievements = (stats, currentRoundResult = null) => {
  const unlocked = new Set(stats.unlockedAchievements || []);
  const newlyUnlocked = [];

  const grant = (id) => {
    if (!unlocked.has(id)) {
      unlocked.add(id);
      const ach = ACHIEVEMENTS_LIST.find((a) => a.id === id);
      if (ach) newlyUnlocked.push(ach);
    }
  };

  // General cumulative checks
  if (stats.gamesPlayed >= 1) grant("first_win");
  if (stats.totalCorrect >= 10) grant("ten_correct");
  if (stats.level >= 5) grant("puzzle_master");
  if (stats.level >= 10) grant("brainquest_champion");
  if (stats.dailyStreak >= 7) grant("seven_day_streak");
  if (stats.bestStreak >= 3) grant("hot_streak");
  if (stats.bestStreak >= 5) grant("super_streak");
  if (stats.bestStreak >= 10) grant("brain_master");

  // Round specific checks
  if (currentRoundResult) {
    const { accuracy, mode, livesRemaining, bestStreak, fastestAnswerTime } = currentRoundResult;
    if (fastestAnswerTime && fastestAnswerTime < 5) grant("speed_solver");
    if (accuracy >= 80 && (mode === "maths" || mode === "all")) grant("maths_master");
    if (accuracy >= 80 && (mode === "english" || mode === "all")) grant("english_expert");
    if (accuracy >= 90) grant("ninety_accuracy");
    if (accuracy === 100 && livesRemaining === 3) grant("flawless_victory");
    if (bestStreak >= 3) grant("hot_streak");
    if (bestStreak >= 5) grant("super_streak");
    if (bestStreak >= 10) grant("brain_master");
  }

  return {
    updatedUnlocked: Array.from(unlocked),
    newlyUnlocked
  };
};
