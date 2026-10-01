// LocalStorage & Player Profile Persistence Management

export const LEVEL_TIERS = [
  { level: 1, title: "Beginner", minXp: 0, maxXp: 150 },
  { level: 2, title: "Learner", minXp: 150, maxXp: 350 },
  { level: 3, title: "Smart Solver", minXp: 350, maxXp: 650 },
  { level: 4, title: "Brain Trainer", minXp: 650, maxXp: 1050 },
  { level: 5, title: "Puzzle Master", minXp: 1050, maxXp: 1600 },
  { level: 6, title: "Grand Thinker", minXp: 1600, maxXp: 2300 },
  { level: 7, title: "Logic Wizard", minXp: 2300, maxXp: 3200 },
  { level: 8, title: "Mind Prodigy", minXp: 3200, maxXp: 4300 },
  { level: 9, title: "Intellect Overlord", minXp: 4300, maxXp: 5600 },
  { level: 10, title: "BrainQuest Champion", minXp: 5600, maxXp: 7200 }
];

export const getLevelInfo = (xp) => {
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      const tier = LEVEL_TIERS[i];
      const nextTier = LEVEL_TIERS[i + 1] || null;
      const range = nextTier ? nextTier.minXp - tier.minXp : 2000;
      const currentProgress = xp - tier.minXp;
      const progressPercent = Math.min(100, Math.round((currentProgress / range) * 100));
      return {
        level: tier.level,
        title: tier.title,
        minXp: tier.minXp,
        nextTierXp: nextTier ? nextTier.minXp : tier.maxXp,
        progressPercent
      };
    }
  }
  return {
    level: 1,
    title: "Beginner",
    minXp: 0,
    nextTierXp: 150,
    progressPercent: 0
  };
};

const DEFAULT_PROFILE = {
  username: "Player_1",
  avatar: "🧠",
  totalXp: 0,
  level: 1,
  gamesPlayed: 0,
  questionsAnswered: 0,
  totalCorrect: 0,
  totalWrong: 0,
  highestScore: 0,
  bestStreak: 0,
  englishAnswered: 0,
  englishCorrect: 0,
  mathsAnswered: 0,
  mathsCorrect: 0,
  unlockedAchievements: [],
  dailyStreak: 0,
  lastDailyDate: null,
  dailyHighScore: 0
};

const DEFAULT_SETTINGS = {
  theme: "dark",
  soundEnabled: true,
  bgmEnabled: false,
  timerEnabled: true,
  negativeMarking: false,
  defaultDifficulty: "Auto-Adaptive" // Auto-Adaptive, Easy, Medium, Hard, Expert
};

const DEFAULT_LEADERBOARD = [
  { name: "Aria_Apex", score: 850, xp: 6200, level: 10, streak: 14, dailyScore: 320, avatar: "👑" },
  { name: "Neo_Cipher", score: 790, xp: 5400, level: 9, streak: 11, dailyScore: 290, avatar: "⚡" },
  { name: "Elena_V", score: 720, xp: 4800, level: 8, streak: 9, dailyScore: 280, avatar: "🎯" },
  { name: "Quantum_Kid", score: 650, xp: 3900, level: 7, streak: 8, dailyScore: 260, avatar: "🚀" },
  { name: "Sophia_R", score: 580, xp: 3100, level: 6, streak: 7, dailyScore: 240, avatar: "🌟" },
  { name: "Marcus_007", score: 490, xp: 2200, level: 5, streak: 6, dailyScore: 210, avatar: "🔥" }
];

export const getStoredProfile = () => {
  try {
    const raw = localStorage.getItem("brainquest_profile");
    if (raw) {
      const parsed = JSON.parse(raw);
      const levelData = getLevelInfo(parsed.totalXp || 0);
      return { ...DEFAULT_PROFILE, ...parsed, level: levelData.level };
    }
  } catch {
    // fallback
  }
  return { ...DEFAULT_PROFILE };
};

export const saveProfile = (profile) => {
  try {
    const levelData = getLevelInfo(profile.totalXp || 0);
    const updated = { ...profile, level: levelData.level };
    localStorage.setItem("brainquest_profile", JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error saving profile", e);
    return profile;
  }
};

export const getStoredSettings = () => {
  try {
    const raw = localStorage.getItem("brainquest_settings");
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    // fallback
  }
  return { ...DEFAULT_SETTINGS };
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem("brainquest_settings", JSON.stringify(settings));
  } catch (e) {
    console.error("Error saving settings", e);
  }
};

export const getStoredLeaderboard = () => {
  try {
    const raw = localStorage.getItem("brainquest_leaderboard");
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return DEFAULT_LEADERBOARD;
};

export const updateLeaderboardWithUser = (profile) => {
  try {
    let board = getStoredLeaderboard();
    const existingIdx = board.findIndex((b) => b.isUser || b.name === profile.username);
    const userEntry = {
      name: profile.username,
      score: profile.highestScore,
      xp: profile.totalXp,
      level: profile.level,
      streak: profile.bestStreak,
      dailyScore: profile.dailyHighScore || 0,
      avatar: profile.avatar || "🧠",
      isUser: true
    };

    if (existingIdx >= 0) {
      board[existingIdx] = userEntry;
    } else {
      board.push(userEntry);
    }

    // Sort by highestScore descending
    board.sort((a, b) => b.score - a.score);
    localStorage.setItem("brainquest_leaderboard", JSON.stringify(board));
    return board;
  } catch (e) {
    console.error("Error updating leaderboard", e);
    return DEFAULT_LEADERBOARD;
  }
};

export const resetAllProgress = () => {
  try {
    localStorage.removeItem("brainquest_profile");
    localStorage.removeItem("brainquest_settings");
    localStorage.removeItem("brainquest_leaderboard");
    localStorage.removeItem("brainquest_daily");
    return DEFAULT_PROFILE;
  } catch (e) {
    console.error("Error resetting progress", e);
    return DEFAULT_PROFILE;
  }
};

export const getDailyChallengeStatus = () => {
  const todayStr = new Date().toISOString().slice(0, 10);
  try {
    const raw = localStorage.getItem("brainquest_daily");
    if (raw) {
      const data = JSON.parse(raw);
      if (data.date === todayStr) {
        return { completedToday: true, score: data.score, date: todayStr };
      }
    }
  } catch {
    // ignore
  }
  return { completedToday: false, score: 0, date: todayStr };
};

export const saveDailyChallengeResult = (score) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const data = { completedToday: true, score, date: todayStr };
  try {
    localStorage.setItem("brainquest_daily", JSON.stringify(data));
  } catch {
    // ignore
  }
  return data;
};
