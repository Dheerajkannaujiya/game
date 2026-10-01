import React, { useEffect } from "react";
import { Clock } from "lucide-react";
import { soundManager } from "../utils/audio";

export default function Timer({
  timeLeft,
  totalTime,
  isRunning,
  timerEnabled,
  onTimeUp
}) {
  if (!timerEnabled) {
    return (
      <div className="hud-item" title="Timer is disabled in settings">
        <Clock size={16} style={{ color: "var(--text-muted)" }} />
        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No Limit</span>
      </div>
    );
  }

  // Play subtle warning tick when 5 seconds or less remain
  useEffect(() => {
    if (isRunning && timeLeft <= 5 && timeLeft > 0) {
      soundManager.playTick();
    }
    if (isRunning && timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, isRunning, onTimeUp]);

  const percentage = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));

  let colorClass = "#34d399"; // emerald
  if (percentage <= 25) {
    colorClass = "#ef4444"; // red
  } else if (percentage <= 50) {
    colorClass = "#f59e0b"; // amber
  }

  return (
    <div
      className="hud-item"
      style={{
        borderColor: timeLeft <= 5 ? "#ef4444" : "var(--border-color)",
        animation: timeLeft <= 5 ? "heartBeat 1s infinite" : "none"
      }}
    >
      <Clock size={16} style={{ color: colorClass }} />
      <span style={{ color: colorClass, fontWeight: 800, minWidth: "28px" }}>
        {timeLeft}s
      </span>
      {/* Mini radial/linear progress bar */}
      <div
        style={{
          width: "40px",
          height: "6px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "999px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: colorClass,
            transition: "width 1s linear"
          }}
        />
      </div>
    </div>
  );
}
