import React from "react";
import { X, Award, CheckCircle2, Lock } from "lucide-react";
import { ACHIEVEMENTS_LIST } from "../utils/achievements";

export default function AchievementsModal({ unlockedIds = [], onClose }) {
  const unlockedSet = new Set(unlockedIds);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Award size={24} style={{ color: "#ec4899" }} />
            <h2>Badges & Achievements</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Unlocked: <strong>{unlockedSet.size}</strong> of {ACHIEVEMENTS_LIST.length} Badges
        </p>

        <div className="achievements-grid">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const isUnlocked = unlockedSet.has(ach.id);
            return (
              <div
                key={ach.id}
                className={`achievement-card ${isUnlocked ? "unlocked" : "locked"}`}
              >
                <div className="achievement-icon">{ach.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4>{ach.title}</h4>
                    {isUnlocked ? (
                      <CheckCircle2 size={16} style={{ color: "#10b981" }} />
                    ) : (
                      <Lock size={14} style={{ color: "var(--text-subtle)" }} />
                    )}
                  </div>
                  <p>{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
