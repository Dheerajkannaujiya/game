import React, { useEffect, useState } from "react";
import { Trophy, CheckCircle, XCircle, Clock, Zap, Flame, Award, ChevronDown, ChevronUp, RotateCcw, Home, BookOpen, Calculator } from "lucide-react";
import { triggerRoundVictoryConfetti } from "../utils/confettiHelper";
import { soundManager } from "../utils/audio";

export default function ResultScreen({
  roundResult,
  onPlayAgain,
  onTryEnglish,
  onTryMaths,
  onBackHome
}) {
  const [expandedReview, setExpandedReview] = useState(false);

  const {
    finalScore = 0,
    correctCount = 0,
    wrongCount = 0,
    accuracy = 0,
    totalTimeTaken = 0,
    bestStreak = 0,
    xpEarned = 0,
    newAchievements = [],
    history = [],
    livesRemaining = 0,
    mode = "all"
  } = roundResult;

  useEffect(() => {
    if (accuracy >= 70 || finalScore >= 150) {
      triggerRoundVictoryConfetti();
      soundManager.playVictory();
    } else {
      soundManager.playCorrect();
    }
  }, [accuracy, finalScore]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  return (
    <div className="result-card glass-card anim-slide-up">
      {/* Trophy / Header */}
      <div style={{ display: "inline-flex", padding: "1rem", borderRadius: "50%", background: "rgba(245, 158, 11, 0.15)", marginBottom: "0.5rem" }}>
        <Trophy size={48} style={{ color: "#f59e0b" }} />
      </div>

      <h2 style={{ fontSize: "2rem", fontWeight: 900 }}>Round Complete!</h2>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
        {accuracy >= 90
          ? "Outstanding performance! You mastered this challenge!"
          : accuracy >= 70
          ? "Great job! Your brain is getting sharper!"
          : "Good effort! Keep practicing to elevate your score!"}
      </p>

      {/* Big Score Banner */}
      <div className="result-score-banner">
        {finalScore} <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>PTS</span>
      </div>

      {/* Newly Unlocked Achievements Banner */}
      {newAchievements.length > 0 && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(236, 72, 153, 0.2))",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            borderRadius: "var(--radius-md)",
            padding: "0.85rem 1.25rem",
            margin: "1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem"
          }}
          className="anim-pop"
        >
          <Award size={24} style={{ color: "#fbbf24" }} />
          <div>
            <strong style={{ color: "#fbbf24", fontSize: "0.95rem" }}>
              New Achievement Unlocked!
            </strong>
            <div style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>
              {newAchievements.map((a) => `${a.icon} ${a.title}`).join(", ")}
            </div>
          </div>
        </div>
      )}

      {/* Summary Grid */}
      <div className="result-summary-grid">
        <div className="summary-pill">
          <div className="val" style={{ color: "#34d399" }}>{correctCount}</div>
          <div className="lbl">Correct</div>
        </div>
        <div className="summary-pill">
          <div className="val" style={{ color: "#f87171" }}>{wrongCount}</div>
          <div className="lbl">Wrong</div>
        </div>
        <div className="summary-pill">
          <div className="val" style={{ color: "#60a5fa" }}>{accuracy}%</div>
          <div className="lbl">Accuracy</div>
        </div>
        <div className="summary-pill">
          <div className="val" style={{ color: "#facc15" }}>+{xpEarned}</div>
          <div className="lbl">XP Earned</div>
        </div>
        <div className="summary-pill">
          <div className="val" style={{ color: "#fb923c" }}>🔥 {bestStreak}</div>
          <div className="lbl">Best Streak</div>
        </div>
        <div className="summary-pill">
          <div className="val" style={{ color: "#c084fc" }}>{formatTime(totalTimeTaken)}</div>
          <div className="lbl">Time Taken</div>
        </div>
      </div>

      {/* Question Review Section */}
      <div style={{ margin: "1.75rem 0", textAlign: "left" }}>
        <button
          className="btn-secondary"
          style={{ width: "100%", justifyContent: "space-between" }}
          onClick={() => setExpandedReview(!expandedReview)}
        >
          <span style={{ fontWeight: 700 }}>
            Review All Questions ({history.length})
          </span>
          {expandedReview ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedReview && (
          <div style={{ marginTop: "1rem" }} className="anim-slide-up">
            {history.map((item, idx) => (
              <div
                key={idx}
                className={`review-item ${item.isCorrect ? "review-correct" : "review-wrong"}`}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Q{idx + 1} • {item.question.category} ({item.question.difficulty})
                  </span>
                  {item.isCorrect ? (
                    <span style={{ color: "#34d399", fontWeight: 700, fontSize: "0.8rem" }}>
                      ✓ Correct (+{item.earnedPoints} pts)
                    </span>
                  ) : (
                    <span style={{ color: "#f87171", fontWeight: 700, fontSize: "0.8rem" }}>
                      ✗ Incorrect
                    </span>
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                  {item.question.question}
                </div>

                <div style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Your Answer: </span>
                  <strong style={{ color: item.isCorrect ? "#34d399" : "#f87171" }}>
                    {item.userAnswer || "Timed out / None"}
                  </strong>
                </div>

                {!item.isCorrect && (
                  <div style={{ fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Correct Answer: </span>
                    <strong style={{ color: "#34d399" }}>{item.question.answer}</strong>
                  </div>
                )}

                {item.question.explanation && (
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic", marginTop: "0.3rem" }}>
                    💡 {item.question.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
        <button className="btn-primary" onClick={onPlayAgain}>
          <RotateCcw size={18} /> Play Again
        </button>

        {mode !== "english" && (
          <button className="btn-secondary" onClick={onTryEnglish}>
            <BookOpen size={18} /> Try English
          </button>
        )}

        {mode !== "maths" && (
          <button className="btn-secondary" onClick={onTryMaths}>
            <Calculator size={18} /> Try Maths
          </button>
        )}

        <button className="btn-secondary" onClick={onBackHome}>
          <Home size={18} /> Back to Home
        </button>
      </div>
    </div>
  );
}
