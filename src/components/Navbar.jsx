import React from "react";
import { Volume2, VolumeX, Music, Settings, User, Trophy, Award, HelpCircle } from "lucide-react";
import { getLevelInfo } from "../utils/storage";

export default function Navbar({
  profile,
  settings,
  onToggleSound,
  onToggleBgm,
  onOpenSettings,
  onOpenProfile,
  onOpenLeaderboard,
  onOpenAchievements,
  onOpenHowToPlay,
  onGoHome
}) {
  const levelData = getLevelInfo(profile.totalXp || 0);

  return (
    <header className="navbar">
      <div className="nav-brand" onClick={onGoHome} title="Go to Home">
        <div className="brand-icon-box">
          <span style={{ fontSize: "1.5rem" }}>🧠</span>
        </div>
        <div className="brand-text">
          <h1>BrainQuest</h1>
          <span>English & Maths Challenge</span>
        </div>
      </div>

      <div className="nav-actions">
        {/* Level & XP Pill */}
        <div className="nav-pill" onClick={onOpenProfile} title="View Profile & Stats">
          <span>{profile.avatar || "🧠"}</span>
          <span>Lvl {levelData.level}</span>
          <span style={{ color: "var(--accent-primary)", fontSize: "0.75rem" }}>
            ({profile.totalXp} XP)
          </span>
        </div>

        {/* Audio Toggles */}
        <button
          className={`nav-icon-btn ${settings.soundEnabled ? "active" : ""}`}
          onClick={onToggleSound}
          title={settings.soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
          aria-label="Toggle Sound Effects"
        >
          {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button
          className={`nav-icon-btn ${settings.bgmEnabled ? "active" : ""}`}
          onClick={onToggleBgm}
          title={settings.bgmEnabled ? "Pause Ambient Music" : "Play Ambient Music"}
          aria-label="Toggle Ambient Music"
        >
          <Music size={18} />
        </button>

        {/* Leaderboard Button */}
        <button
          className="nav-icon-btn"
          onClick={onOpenLeaderboard}
          title="Leaderboard"
          aria-label="Leaderboard"
        >
          <Trophy size={18} />
        </button>

        {/* Achievements Button */}
        <button
          className="nav-icon-btn"
          onClick={onOpenAchievements}
          title="Achievements"
          aria-label="Achievements"
        >
          <Award size={18} />
        </button>

        {/* How to Play Button */}
        <button
          className="nav-icon-btn"
          onClick={onOpenHowToPlay}
          title="How to Play"
          aria-label="How to Play"
        >
          <HelpCircle size={18} />
        </button>

        {/* Profile Button */}
        <button
          className="nav-icon-btn"
          onClick={onOpenProfile}
          title="Profile"
          aria-label="Profile"
        >
          <User size={18} />
        </button>

        {/* Settings Button */}
        <button
          className="nav-icon-btn"
          onClick={onOpenSettings}
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
