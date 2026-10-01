import React, { useState } from "react";
import { X, User, Edit3, Award, Trophy, Zap, Flame, Target, BookOpen, Calculator, Check } from "lucide-react";
import { getLevelInfo, saveProfile } from "../utils/storage";
import { ACHIEVEMENTS_LIST } from "../utils/achievements";

const AVATARS = ["🧠", "⚡", "👑", "🎯", "🚀", "📚", "🏆", "🦁", "🦉", "🦊", "🐉", "🪐"];

export default function Profile({ profile, onUpdateProfile, onClose, onOpenAchievements }) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || "🧠");

  const levelData = getLevelInfo(profile.totalXp || 0);

  const handleSave = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    const updated = saveProfile({
      ...profile,
      username: username.trim(),
      avatar: selectedAvatar
    });
    onUpdateProfile(updated);
    setIsEditing(false);
  };

  const totalQuestions = profile.questionsAnswered || 0;
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((profile.totalCorrect / totalQuestions) * 100) : 0;

  const englishTotal = profile.englishAnswered || 0;
  const englishAcc =
    englishTotal > 0 ? Math.round(((profile.englishCorrect || 0) / englishTotal) * 100) : 0;

  const mathsTotal = profile.mathsAnswered || 0;
  const mathsAcc =
    mathsTotal > 0 ? Math.round(((profile.mathsCorrect || 0) / mathsTotal) * 100) : 0;

  const unlockedCount = (profile.unlockedAchievements || []).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <User size={24} style={{ color: "var(--accent-primary)" }} />
            <h2>Player Profile</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="profile-header-card glass-card">
          <div className="avatar-large">{profile.avatar || "🧠"}</div>
          <div style={{ flex: 1 }}>
            {!isEditing ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800 }}>{profile.username}</h3>
                  <button
                    className="nav-icon-btn"
                    style={{ width: "30px", height: "30px" }}
                    onClick={() => setIsEditing(true)}
                    title="Edit Name & Avatar"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
                <div style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "0.9rem", margin: "0.2rem 0" }}>
                  Level {levelData.level} • {levelData.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {profile.totalXp} Total XP
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="num-input"
                    style={{ fontSize: "0.95rem", padding: "0.4rem 0.8rem", textAlign: "left", width: "100%", marginTop: "0.2rem" }}
                    maxLength={16}
                  />
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Select Avatar:</label>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.3rem" }}>
                    {AVATARS.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setSelectedAvatar(av)}
                        style={{
                          fontSize: "1.25rem",
                          padding: "0.3rem",
                          borderRadius: "8px",
                          background: selectedAvatar === av ? "rgba(99, 102, 241, 0.4)" : "rgba(255, 255, 255, 0.05)",
                          border: selectedAvatar === av ? "2px solid #6366f1" : "1px solid transparent"
                        }}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="submit" className="btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}>
                    <Check size={14} /> Save
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* XP Bar */}
            <div style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                <span>XP Progress</span>
                <span>{levelData.progressPercent}% to Next Level</span>
              </div>
              <div className="round-progress-track" style={{ height: "6px" }}>
                <div className="round-progress-fill" style={{ width: `${levelData.progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Career Stats Grid */}
        <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.75rem" }}>Career Statistics</h4>
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <div className="num" style={{ color: "#60a5fa" }}>{profile.gamesPlayed || 0}</div>
            <div className="label">Games Played</div>
          </div>
          <div className="profile-stat-box">
            <div className="num" style={{ color: "#34d399" }}>{profile.totalCorrect || 0}</div>
            <div className="label">Questions Solved</div>
          </div>
          <div className="profile-stat-box">
            <div className="num" style={{ color: "#facc15" }}>{overallAccuracy}%</div>
            <div className="label">Career Accuracy</div>
          </div>
          <div className="profile-stat-box">
            <div className="num" style={{ color: "#ec4899" }}>{profile.highestScore || 0}</div>
            <div className="label">Highest Score</div>
          </div>
          <div className="profile-stat-box">
            <div className="num" style={{ color: "#fb923c" }}>🔥 {profile.bestStreak || 0}</div>
            <div className="label">Best Streak</div>
          </div>
          <div className="profile-stat-box">
            <div className="num" style={{ color: "#a855f7" }}>{profile.dailyStreak || 0} Days</div>
            <div className="label">Daily Streak</div>
          </div>
        </div>

        {/* Subject-Specific Performance Breakdown */}
        <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.75rem" }}>Subject Mastery</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {/* English Card */}
          <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "4px solid #ec4899" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <BookOpen size={18} style={{ color: "#ec4899" }} />
              <strong>English Mastery</strong>
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ec4899" }}>{englishAcc}%</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {profile.englishCorrect || 0} / {englishTotal} Correct
            </div>
          </div>

          {/* Maths Card */}
          <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "4px solid #06b6d4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Calculator size={18} style={{ color: "#06b6d4" }} />
              <strong>Maths Mastery</strong>
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#06b6d4" }}>{mathsAcc}%</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {profile.mathsCorrect || 0} / {mathsTotal} Correct
            </div>
          </div>
        </div>

        {/* Badges Preview */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 800 }}>
            Achievements ({unlockedCount}/{ACHIEVEMENTS_LIST.length})
          </h4>
          <button
            className="btn-secondary"
            style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
            onClick={onOpenAchievements}
          >
            View All Badges
          </button>
        </div>
      </div>
    </div>
  );
}
