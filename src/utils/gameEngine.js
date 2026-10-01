// Game Question Engine & Round Assembler
import { englishQuestions } from "../data/englishQuestions";
import { mathsQuestions } from "../data/mathsQuestions";

export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Generates 10 non-repeating questions for a round
export const generateRoundQuestions = (mode = "all", preferredDifficulty = "Auto-Adaptive") => {
  let pool = [];

  if (mode === "english") {
    pool = [...englishQuestions];
    return assembleTenDeck(pool, preferredDifficulty, "English");
  } else if (mode === "maths") {
    pool = [...mathsQuestions];
    return assembleTenDeck(pool, preferredDifficulty, "Mathematics");
  } else if (mode === "daily") {
    // 5 English + 5 Maths
    const engFive = pickQuestionsWithDifficulty(englishQuestions, 5, preferredDifficulty, "English");
    const mathFive = pickQuestionsWithDifficulty(mathsQuestions, 5, preferredDifficulty, "Mathematics");
    return shuffleArray([...engFive, ...mathFive]);
  } else {
    // "all" mixed mode: 5 English + 5 Maths
    const engFive = pickQuestionsWithDifficulty(englishQuestions, 5, preferredDifficulty, "English");
    const mathFive = pickQuestionsWithDifficulty(mathsQuestions, 5, preferredDifficulty, "Mathematics");
    return shuffleArray([...engFive, ...mathFive]);
  }
};

const assembleTenDeck = (sourceList, preferredDifficulty, subject) => {
  return pickQuestionsWithDifficulty(sourceList, 10, preferredDifficulty, subject);
};

const pickQuestionsWithDifficulty = (items, count, preferredDifficulty, subject) => {
  const tagged = items.map((q) => ({ ...q, subject: q.subject || subject }));

  if (preferredDifficulty && preferredDifficulty !== "Auto-Adaptive") {
    // Try to filter by that difficulty first
    const matching = tagged.filter((q) => q.difficulty.toLowerCase() === preferredDifficulty.toLowerCase());
    if (matching.length >= count) {
      return shuffleArray(matching).slice(0, count);
    }
  }

  // Auto-Adaptive / progressive ramp:
  // e.g. for count=10: 3 Easy, 3 Medium, 2 Hard, 2 Expert
  // for count=5: 2 Easy, 2 Medium, 1 Hard/Expert
  const easy = tagged.filter((q) => q.difficulty === "Easy");
  const medium = tagged.filter((q) => q.difficulty === "Medium");
  const hard = tagged.filter((q) => q.difficulty === "Hard");
  const expert = tagged.filter((q) => q.difficulty === "Expert");

  const deck = [];
  const usedIds = new Set();

  const takeFrom = (bucket, num) => {
    const shuffled = shuffleArray(bucket.filter((q) => !usedIds.has(q.id)));
    for (let i = 0; i < Math.min(num, shuffled.length); i++) {
      usedIds.add(shuffled[i].id);
      deck.push(shuffled[i]);
    }
  };

  if (count === 10) {
    takeFrom(easy, 3);
    takeFrom(medium, 3);
    takeFrom(hard, 2);
    takeFrom(expert, 2);
  } else {
    takeFrom(easy, 2);
    takeFrom(medium, 2);
    takeFrom(hard, 1);
  }

  // Fill up if needed
  if (deck.length < count) {
    const remaining = shuffleArray(tagged.filter((q) => !usedIds.has(q.id)));
    for (const q of remaining) {
      if (deck.length >= count) break;
      deck.push(q);
      usedIds.add(q.id);
    }
  }

  return deck.slice(0, count);
};

// Answer validation helper
export const validateAnswer = (question, userAnswer) => {
  if (!userAnswer && userAnswer !== 0) return false;

  const rawExpected = String(question.answer).trim();
  const rawGiven = String(userAnswer).trim();

  if (question.type === "numeric") {
    const numExpected = parseFloat(rawExpected.replace(/[^0-9.-]/g, ""));
    const numGiven = parseFloat(rawGiven.replace(/[^0-9.-]/g, ""));
    if (!isNaN(numExpected) && !isNaN(numGiven)) {
      return Math.abs(numExpected - numGiven) < 0.001;
    }
    return rawExpected.toLowerCase() === rawGiven.toLowerCase();
  }

  if (question.type === "unscramble") {
    return rawExpected.toUpperCase() === rawGiven.toUpperCase();
  }

  if (question.type === "word_arrange") {
    // normalize spaces & punctuation
    const cleanExp = rawExpected.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ").toLowerCase();
    const cleanGiv = rawGiven.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ").toLowerCase();
    return cleanExp === cleanGiv;
  }

  // multiple choice / fill blank / others
  return rawExpected.toLowerCase() === rawGiven.toLowerCase();
};

export const getBasePointsForDifficulty = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return 10;
    case "Medium":
      return 20;
    case "Hard":
      return 30;
    case "Expert":
      return 50;
    default:
      return 15;
  }
};

export const getQuestionTimerSeconds = (difficulty) => {
  if (difficulty === "Hard" || difficulty === "Expert") {
    return 60;
  }
  return 30;
};
