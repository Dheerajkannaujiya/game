import React from "react";
import { Play, BookOpen, Calculator, Calendar, Trophy, HelpCircle, Settings, Award, User, Flame, ArrowRight, Zap, Target } from "lucide-react";
import { getLevelInfo } from "../utils/storage";

export default function Home({
  profile,
  dailyStatus,
  onStartGame,
  onOpenLeaderboard,
  onOpenHowToPlay,
  onOpenSettings,
  onOpenProfile,
  onOpenAchievements,
  onOpenDaily
}) {
  const levelData = getLevelInfo(profile.totalXp || 0);

  return (
    <div className="anim-slide-up">
      {/* Hero Header */}
      <section className="home-hero">
        <div className="hero-badge">
          <Zap size={14} /> Educational Brain Gym
        </div>
        <h1 className="hero-title">
          <span className="gradient-text">BrainQuest</span>
        </h1>
        <p className="hero-subtitle">
          "Train Your Brain – One Puzzle at a Time"
        </p>

        {/* Daily Challenge Interactive Banner */}
        <div className="daily-banner">
          <div className="daily-banner-info">
            <div className="daily-icon-box">
              <Calendar size={28} style={{ color: "#ffffff" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h3 style={{ margin: 0 }}>Daily Challenge</h3>
                {profile.dailyStreak > 0 && (
                  <span
                    style={{
                      background: "rgba(245, 158, 11, 0.25)",
                      color: "#fbbf24",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem"
                    }}
                  >
                    <Flame size={12} /> {profile.dailyStreak} Day Streak
                  </span>
                )}
              </div>
              <p style={{ margin: "0.25rem 0 0" }}>
                5 English + 5 Maths puzzles • Earn bonus XP & maintain your daily streak
              </p>
            </div>
          </div>

          <div>
            {dailyStatus.completedToday ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span
                  style={{
                    color: "#34d399",
                    fontWeight: 700,
                    fontSize: "0.9rem"
                  }}
                >
                  ✓ Completed Today ({dailyStatus.score} pts)
                </span>
                <button className="btn-secondary" onClick={() => onStartGame("daily")}>
                  Replay
                </button>
              </div>
            ) : (
              <button
                className="btn-primary"
                onClick={() => onStartGame("daily")}
              >
                Play Daily Challenge <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Game Modes Grid */}
      <section className="modes-grid">
        {/* 1. Play Game (Mixed / Adaptive Challenge) */}
        <div
          className="mode-card primary"
          onClick={() => onStartGame("all")}
          role="button"
          tabIndex={0}
        >
          <div>
            <div className="mode-card-icon">
              <Zap size={28} />
            </div>
            <h2>Play Game</h2>
            <p>
              Adaptive mixed challenge. Starts simple and scales to Expert as your hot streak ignites!
            </p>
          </div>
          <div className="mode-card-cta">
            <span>Start Challenge</span>
            <ArrowRight size={18} />
          </div>
        </div>

        {/* 2. English Puzzles */}
        <div
          className="mode-card english glass-card"
          onClick={() => onStartGame("english")}
          role="button"
          tabIndex={0}
        >
          <div>
            <div className="mode-card-icon" style={{ background: "rgba(236, 72, 153, 0.2)" }}>
              <BookOpen size={28} style={{ color: "#f472b6" }} />
            </div>
            <h2 style={{ color: "#f472b6" }}>English Puzzles</h2>
            <p>
              Unscramble words, spot typos, arrange sentences, master vocabulary, and grammar rules.
            </p>
          </div>
          <div className="mode-card-cta" style={{ color: "#f472b6" }}>
            <span>Play English</span>
            <ArrowRight size={18} />
          </div>
        </div>

        {/* 3. Maths Puzzles */}
        <div
          className="mode-card maths glass-card"
          onClick={() => onStartGame("maths")}
          role="button"
          tabIndex={0}
        >
          <div>
            <div className="mode-card-icon" style={{ background: "rgba(6, 182, 212, 0.2)" }}>
              <Calculator size={28} style={{ color: "#38bdf8" }} />
            </div>
            <h2 style={{ color: "#38bdf8" }}>Maths Puzzles</h2>
            <p>
              Number series, missing numbers, percentages, profit & loss, algebra, ratios and mental math.
            </p>
          </div>
          <div className="mode-card-cta" style={{ color: "#38bdf8" }}>
            <span>Play Maths</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </section>

      {/* Main Menu Action Navigation Bar */}
      <section className="menu-nav-grid">
        <button className="nav-tile-btn" onClick={onOpenLeaderboard}>
          <span className="nav-tile-icon" style={{ color: "#fbbf24" }}>🏆</span>
          <span>Leaderboard</span>
        </button>

        <button className="nav-tile-btn" onClick={onOpenAchievements}>
          <span className="nav-tile-icon" style={{ color: "#ec4899" }}>🎖️</span>
          <span>Achievements</span>
        </button>

        <button className="nav-tile-btn" onClick={onOpenProfile}>
          <span className="nav-tile-icon" style={{ color: "#818cf8" }}>👤</span>
          <span>Player Profile</span>
        </button>

        <button className="nav-tile-btn" onClick={onOpenHowToPlay}>
          <span className="nav-tile-icon" style={{ color: "#34d399" }}>📖</span>
          <span>How to Play</span>
        </button>

        <button className="nav-tile-btn" onClick={onOpenSettings}>
          <span className="nav-tile-icon" style={{ color: "#94a3b8" }}>⚙️</span>
          <span>Settings</span>
        </button>
      </section>

      {/* Quick Player Stats Overview */}
      <section className="quick-stats-strip glass-card">
        <div className="stat-item">
          <div className="val" style={{ color: "var(--accent-primary)" }}>
            {levelData.title}
          </div>
          <div className="lbl">Rank (Lvl {levelData.level})</div>
        </div>
        <div className="stat-item">
          <div className="val" style={{ color: "#facc15" }}>
            {profile.highestScore}
          </div>
          <div className="lbl">High Score</div>
        </div>
        <div className="stat-item">
          <div className="val" style={{ color: "#fb923c" }}>
            🔥 {profile.bestStreak}
          </div>
          <div className="lbl">Best Streak</div>
        </div>
        <div className="stat-item">
          <div className="val" style={{ color: "#34d399" }}>
            {profile.questionsAnswered > 0
              ? Math.round((profile.totalCorrect / profile.questionsAnswered) * 100)
              : 0}
            %
          </div>
          <div className="lbl">Career Accuracy</div>
        </div>
      </section>
    </div>
  );
}
