import React from "react";
import { X, HelpCircle, Heart, Flame, Zap, Clock, BookOpen, Calculator, Award } from "lucide-react";

export default function HowToPlayModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <HelpCircle size={24} style={{ color: "#34d399" }} />
            <h2>How to Play BrainQuest</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
          {/* Objective */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "0.3rem" }}>
              🎯 Game Objective
            </h4>
            <p style={{ color: "var(--text-muted)" }}>
              BrainQuest is an educational game designed to sharpen your cognitive agility across English linguistics and mathematical problem-solving. Answer 10 questions per round, maintain your streak, and climb the ranks from Beginner to BrainQuest Champion!
            </p>
          </div>

          {/* Lives System */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ef4444", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Heart size={16} /> 3 Lives per Round
            </h4>
            <p style={{ color: "var(--text-muted)" }}>
              You start every round with <strong>3 lives</strong>. Every wrong answer or timeout consumes 1 heart. If you lose all 3 lives, the round ends.
            </p>
          </div>

          {/* Scoring & Difficulty */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fbbf24", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Zap size={16} /> Scoring & Difficulty Tiers
            </h4>
            <ul style={{ paddingLeft: "1.25rem", color: "var(--text-muted)" }}>
              <li><strong>Easy:</strong> +10 points (30s timer)</li>
              <li><strong>Medium:</strong> +20 points (30s timer)</li>
              <li><strong>Hard:</strong> +30 points (60s timer)</li>
              <li><strong>Expert:</strong> +50 points (60s timer)</li>
              <li><strong>Speed Bonus:</strong> Earn bonus points for fast responses!</li>
            </ul>
          </div>

          {/* Streak Multipliers */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#f97316", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Flame size={16} /> Streak System
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.5rem", marginTop: "0.4rem" }}>
              <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: "0.6rem", borderRadius: "8px" }}>
                <strong>🔥 3 Correct</strong>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Hot Streak (+5 pts)</div>
              </div>
              <div style={{ background: "rgba(245, 158, 11, 0.2)", padding: "0.6rem", borderRadius: "8px" }}>
                <strong>💥 5 Correct</strong>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Super Streak (+15 pts)</div>
              </div>
              <div style={{ background: "rgba(245, 158, 11, 0.25)", padding: "0.6rem", borderRadius: "8px" }}>
                <strong>✨ 10 Correct</strong>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Brain Master (+30 pts)</div>
              </div>
            </div>
          </div>

          {/* Question Formats */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#38bdf8", marginBottom: "0.3rem" }}>
              🧩 Interactive Question Types
            </h4>
            <p style={{ color: "var(--text-muted)" }}>
              BrainQuest features multiple-choice options, unscramble letter tiles, drag/click sentence assembly, and instant numeric calculations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
