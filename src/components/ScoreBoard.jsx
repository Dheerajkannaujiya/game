import React from "react";
import { Zap, Heart } from "lucide-react";

export default function ScoreBoard({ score, streak, lives, maxLives = 3 }) {
  let streakLabel = null;
  if (streak >= 10) {
    streakLabel = "🔥 Brain Master (x3)";
  } else if (streak >= 5) {
    streakLabel = "🔥 Super Streak (x2)";
  } else if (streak >= 3) {
    streakLabel = "🔥 Hot Streak (x1.5)";
  }

  return (
    <div className="game-hud">
      {/* Lives */}
      <div className="hud-item" title={`${lives} of ${maxLives} lives remaining`}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginRight: "0.2rem" }}>
          LIVES:
        </span>
        <div className="hud-lives">
          {Array.from({ length: maxLives }).map((_, idx) => {
            const isAlive = idx < lives;
            return (
              <Heart
                key={idx}
                size={18}
                style={{
                  fill: isAlive ? "#ef4444" : "transparent",
                  color: isAlive ? "#ef4444" : "rgba(255, 255, 255, 0.2)",
                  transform: isAlive ? "scale(1)" : "scale(0.85)",
                  transition: "all 0.3s ease"
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Streak Badge */}
      {streak >= 3 && (
        <div className="hud-item hud-streak" title="Consecutive correct answers bonus!">
          <span>{streakLabel}</span>
          <span
            style={{
              padding: "0.15rem 0.45rem",
              background: "rgba(245, 158, 11, 0.25)",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 800
            }}
          >
            +{streak}
          </span>
        </div>
      )}

      {/* Score */}
      <div className="hud-item" title="Current Round Score">
        <Zap size={16} style={{ color: "#facc15" }} />
        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>SCORE:</span>
        <strong style={{ fontSize: "1.1rem", color: "#facc15" }}>{score}</strong>
      </div>
    </div>
  );
}
