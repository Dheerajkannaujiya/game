import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = Math.min(100, Math.round(((current - 1) / total) * 100));

  return (
    <div className="round-progress-wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
          fontSize: "0.82rem",
          fontWeight: 700,
          color: "var(--text-muted)"
        }}
      >
        <span>
          Question <strong style={{ color: "var(--text-main)" }}>{current}</strong> of {total}
        </span>
        <span>{Math.round((current / total) * 100)}% Completed</span>
      </div>

      <div className="round-progress-track">
        <div
          className="round-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
