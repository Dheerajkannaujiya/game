import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import ScoreBoard from "./ScoreBoard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";
import ResultScreen from "./ResultScreen";
import {
  generateRoundQuestions,
  getBasePointsForDifficulty,
  getQuestionTimerSeconds
} from "../utils/gameEngine";
import { soundManager } from "../utils/audio";
import { triggerHighStreakConfetti } from "../utils/confettiHelper";
import { checkAchievements } from "../utils/achievements";
import {
  saveProfile,
  updateLeaderboardWithUser,
  saveDailyChallengeResult
} from "../utils/storage";

export default function Game({
  mode = "all", // "all" | "english" | "maths" | "daily"
  profile,
  settings,
  onUpdateProfile,
  onBackHome,
  onStartAnotherMode
}) {
  const [questions, setQuestions] = useState(() =>
    generateRoundQuestions(mode, settings.defaultDifficulty)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [history, setHistory] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRoundComplete, setIsRoundComplete] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Current Question
  const currentQuestion = questions[currentIndex] || null;

  // Timer state
  const totalTimerSeconds = currentQuestion
    ? getQuestionTimerSeconds(currentQuestion.difficulty)
    : 30;
  const [timeLeft, setTimeLeft] = useState(totalTimerSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Answer status for current question
  const [answeredState, setAnsweredState] = useState({
    isAnswered: false,
    isCorrect: false,
    selectedAnswer: null,
    earnedPoints: 0,
    timeTaken: 0
  });

  const timerRef = useRef(null);

  // Initialize or reset timer for current question
  useEffect(() => {
    if (!currentQuestion || isRoundComplete || isGameOver) return;

    const initialSeconds = getQuestionTimerSeconds(currentQuestion.difficulty);
    setTimeLeft(initialSeconds);
    setIsTimerRunning(true);
    setAnsweredState({
      isAnswered: false,
      isCorrect: false,
      selectedAnswer: null,
      earnedPoints: 0,
      timeTaken: 0
    });
  }, [currentIndex, currentQuestion, isRoundComplete, isGameOver]);

  // Countdown effect
  useEffect(() => {
    if (!isTimerRunning || !settings.timerEnabled || answeredState.isAnswered) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, settings.timerEnabled, answeredState.isAnswered]);

  // Finish round and record results
  const finishRound = useCallback(
    (finalLives, updatedHistory, finalScore, finalBestStreak) => {
      setIsTimerRunning(false);
      clearInterval(timerRef.current);

      const correctCount = updatedHistory.filter((h) => h.isCorrect).length;
      const wrongCount = updatedHistory.length - correctCount;
      const accuracy =
        updatedHistory.length > 0
          ? Math.round((correctCount / updatedHistory.length) * 100)
          : 0;
      const totalTimeTaken = updatedHistory.reduce(
        (acc, curr) => acc + (curr.timeTaken || 0),
        0
      );
      const fastestAnswerTime = Math.min(
        ...updatedHistory.map((h) => h.timeTaken || 999)
      );

      // XP calculation: Base 50 XP + (score * 0.4) + accuracy bonus (up to 50 XP)
      const xpEarned = Math.round(50 + finalScore * 0.4 + (accuracy >= 80 ? 40 : 15));

      // Subject specific counters
      let engTotal = 0;
      let engCorr = 0;
      let matTotal = 0;
      let matCorr = 0;

      updatedHistory.forEach((item) => {
        if (item.question.subject === "English" || item.question.id.startsWith("eng")) {
          engTotal++;
          if (item.isCorrect) engCorr++;
        } else {
          matTotal++;
          if (item.isCorrect) matCorr++;
        }
      });

      // Daily streak logic
      let newDailyStreak = profile.dailyStreak || 0;
      let newDailyHighScore = profile.dailyHighScore || 0;
      if (mode === "daily") {
        saveDailyChallengeResult(finalScore);
        newDailyStreak += 1;
        newDailyHighScore = Math.max(newDailyHighScore, finalScore);
      }

      // Check achievements
      const updatedProfileStats = {
        ...profile,
        totalXp: (profile.totalXp || 0) + xpEarned,
        gamesPlayed: (profile.gamesPlayed || 0) + 1,
        questionsAnswered: (profile.questionsAnswered || 0) + updatedHistory.length,
        totalCorrect: (profile.totalCorrect || 0) + correctCount,
        totalWrong: (profile.totalWrong || 0) + wrongCount,
        highestScore: Math.max(profile.highestScore || 0, finalScore),
        bestStreak: Math.max(profile.bestStreak || 0, finalBestStreak),
        englishAnswered: (profile.englishAnswered || 0) + engTotal,
        englishCorrect: (profile.englishCorrect || 0) + engCorr,
        mathsAnswered: (profile.mathsAnswered || 0) + matTotal,
        mathsCorrect: (profile.mathsCorrect || 0) + matCorr,
        dailyStreak: newDailyStreak,
        dailyHighScore: newDailyHighScore
      };

      const { updatedUnlocked, newlyUnlocked } = checkAchievements(
        updatedProfileStats,
        {
          accuracy,
          mode,
          livesRemaining: finalLives,
          bestStreak: finalBestStreak,
          fastestAnswerTime
        }
      );

      updatedProfileStats.unlockedAchievements = updatedUnlocked;
      const saved = saveProfile(updatedProfileStats);
      updateLeaderboardWithUser(saved);
      onUpdateProfile(saved);

      const finalResultData = {
        finalScore,
        correctCount,
        wrongCount,
        accuracy,
        totalTimeTaken,
        bestStreak: finalBestStreak,
        xpEarned,
        newAchievements: newlyUnlocked,
        history: updatedHistory,
        livesRemaining: finalLives,
        mode
      };

      setRoundResult(finalResultData);
      setIsRoundComplete(true);
    },
    [profile, mode, onUpdateProfile]
  );

  // Handle Question Answer Submission
  const handleAnswerSubmit = (userAnswer, isCorrect) => {
    if (answeredState.isAnswered) return;
    setIsTimerRunning(false);

    const timeSpent = totalTimerSeconds - timeLeft;
    let earnedPoints = 0;
    let nextStreak = streak;
    let nextBestStreak = bestStreak;
    let nextLives = lives;

    if (isCorrect) {
      // Base points
      const basePts = getBasePointsForDifficulty(currentQuestion.difficulty);
      // Speed bonus: 1 point per 2 remaining seconds
      const speedBonus = Math.floor(timeLeft / 2);

      // Streak multiplier bonus
      nextStreak = streak + 1;
      if (nextStreak > nextBestStreak) nextBestStreak = nextStreak;

      let streakBonus = 0;
      if (nextStreak >= 10) {
        streakBonus = 30; // Brain Master
        triggerHighStreakConfetti();
        soundManager.playStreak();
      } else if (nextStreak >= 5) {
        streakBonus = 15; // Super Streak
        triggerHighStreakConfetti();
        soundManager.playStreak();
      } else if (nextStreak >= 3) {
        streakBonus = 5; // Hot Streak
        soundManager.playStreak();
      } else {
        soundManager.playCorrect();
      }

      earnedPoints = basePts + speedBonus + streakBonus;
      setScore((prev) => prev + earnedPoints);
      setStreak(nextStreak);
      setBestStreak(nextBestStreak);
    } else {
      // Wrong answer
      soundManager.playWrong();
      nextStreak = 0;
      setStreak(0);
      nextLives = Math.max(0, lives - 1);
      setLives(nextLives);

      // Negative marking (if enabled for Hard / Expert)
      if (settings.negativeMarking) {
        if (currentQuestion.difficulty === "Expert") {
          setScore((prev) => Math.max(0, prev - 10));
        } else if (currentQuestion.difficulty === "Hard") {
          setScore((prev) => Math.max(0, prev - 5));
        }
      }
    }

    const currentHistoryItem = {
      question: currentQuestion,
      userAnswer,
      isCorrect,
      earnedPoints,
      timeTaken: timeSpent
    };

    const updatedHistory = [...history, currentHistoryItem];
    setHistory(updatedHistory);

    setAnsweredState({
      isAnswered: true,
      isCorrect,
      selectedAnswer: userAnswer,
      earnedPoints,
      timeTaken: timeSpent
    });

    // Check if player just lost their last life
    if (nextLives <= 0) {
      soundManager.playGameOver();
      setTimeout(() => {
        setIsGameOver(true);
        finishRound(0, updatedHistory, isCorrect ? score + earnedPoints : score, nextBestStreak);
      }, 1200);
    }
  };

  // Handle Timeout (time ran out)
  const handleTimeUp = () => {
    if (answeredState.isAnswered) return;
    handleAnswerSubmit(null, false);
  };

  // Next Question / Finish Round button
  const handleNext = () => {
    if (lives <= 0) return;

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all 10 questions!
      finishRound(lives, history, score, bestStreak);
    }
  };

  // Replay this same mode
  const handlePlayAgain = () => {
    const newQuestions = generateRoundQuestions(mode, settings.defaultDifficulty);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLives(3);
    setHistory([]);
    setIsGameOver(false);
    setIsRoundComplete(false);
    setRoundResult(null);
  };

  if (isRoundComplete && roundResult) {
    return (
      <ResultScreen
        roundResult={roundResult}
        onPlayAgain={handlePlayAgain}
        onTryEnglish={() => onStartAnotherMode("english")}
        onTryMaths={() => onStartAnotherMode("maths")}
        onBackHome={onBackHome}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="game-screen anim-slide-up">
      {/* Top Header Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <button
          className="btn-secondary"
          style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
          onClick={() => setShowQuitConfirm(true)}
        >
          <ArrowLeft size={16} /> Exit Game
        </button>

        <Timer
          timeLeft={timeLeft}
          totalTime={totalTimerSeconds}
          isRunning={isTimerRunning}
          timerEnabled={settings.timerEnabled}
          onTimeUp={handleTimeUp}
        />
      </div>

      {/* Round Progress Tracker */}
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      {/* Score & HUD */}
      <ScoreBoard score={score} streak={streak} lives={lives} maxLives={3} />

      {/* Main Question Card with interactive widgets */}
      <QuestionCard
        question={currentQuestion}
        onAnswerSubmit={handleAnswerSubmit}
        answeredState={answeredState}
        onNextQuestion={handleNext}
        isLastQuestion={currentIndex === questions.length - 1}
      />

      {/* Quit Game Confirmation Modal */}
      {showQuitConfirm && (
        <div className="modal-overlay" onClick={() => setShowQuitConfirm(false)}>
          <div className="modal-content glass-card" style={{ maxWidth: "400px", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <AlertCircle size={44} style={{ color: "#f59e0b", margin: "0 auto 0.75rem" }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Leave Current Round?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
              Your current progress in this round will not be saved to your career stats.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                className="btn-primary"
                style={{ background: "#ef4444" }}
                onClick={() => {
                  setShowQuitConfirm(false);
                  onBackHome();
                }}
              >
                Quit Game
              </button>
              <button className="btn-secondary" onClick={() => setShowQuitConfirm(false)}>
                Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
