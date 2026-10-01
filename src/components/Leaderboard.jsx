import React, { useState } from "react";
import { X, Trophy, Medal, User, Edit2, Check } from "lucide-react";
import { getStoredLeaderboard, updateLeaderboardWithUser, saveProfile } from "../utils/storage";

export default function Leaderboard({ profile, onUpdateProfile, onClose }) {
  const [board, setBoard] = useState(() => updateLeaderboardWithUser(profile));
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(profile.username);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const updated = saveProfile({ ...profile, username: newName.trim() });
    onUpdateProfile(updated);
    const updatedBoard = updateLeaderboardWithUser(updated);
    setBoard(updatedBoard);
    setIsEditingName(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Trophy size={24} style={{ color: "#fbbf24" }} />
            <h2>Leaderboard</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* User Identity Banner in Leaderboard */}
        <div
          style={{
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "var(--radius-md)",
            padding: "0.85rem 1rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{profile.avatar || "🧠"}</span>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Playing as</div>
              {isEditingName ? (
                <form onSubmit={handleSaveName} style={{ display: "flex", gap: "0.3rem", marginTop: "0.2rem" }}>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="num-input"
                    style={{ fontSize: "0.85rem", padding: "0.25rem 0.5rem", maxWidth: "160px" }}
                    maxLength={16}
                    autoFocus
                  />
                  <button type="submit" className="btn-primary" style={{ padding: "0.3rem 0.6rem" }}>
                    <Check size={14} />
                  </button>
                </form>
              ) : (
                <div style={{ fontWeight: 800, fontSize: "1rem" }}>{profile.username}</div>
              )}
            </div>
          </div>

          {!isEditingName && (
            <button
              className="btn-secondary"
              style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
              onClick={() => setIsEditingName(true)}
            >
              <Edit2 size={13} /> Edit Name
            </button>
          )}
        </div>

        {/* Leaderboard Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>XP</th>
                <th>Level</th>
                <th>Streak</th>
                <th>Daily</th>
              </tr>
            </thead>
            <tbody>
              {board.map((item, idx) => {
                const rank = idx + 1;
                const isUser = item.isUser || item.name === profile.username;

                let rankBadgeClass = "";
                if (rank === 1) rankBadgeClass = "rank-1";
                else if (rank === 2) rankBadgeClass = "rank-2";
                else if (rank === 3) rankBadgeClass = "rank-3";

                return (
                  <tr key={idx} className={isUser ? "user-row" : ""}>
                    <td>
                      <span className={`rank-badge ${rankBadgeClass}`}>
                        {rank <= 3 ? (rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉") : rank}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span>{item.avatar || "👤"}</span>
                        <span>
                          {item.name} {isUser && "(You)"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: "#facc15" }}>{item.score}</strong>
                    </td>
                    <td>{item.xp}</td>
                    <td>Lvl {item.level}</td>
                    <td>🔥 {item.streak}</td>
                    <td>{item.dailyScore || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
