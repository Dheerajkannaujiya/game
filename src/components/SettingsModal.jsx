import React, { useState } from "react";
import { X, Settings, Volume2, VolumeX, Music, Clock, ShieldAlert, Palette, Trash2, CheckCircle2 } from "lucide-react";
import { resetAllProgress } from "../utils/storage";

export default function SettingsModal({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose
}) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const toggleSound = () => {
    onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const toggleBgm = () => {
    onUpdateSettings({ ...settings, bgmEnabled: !settings.bgmEnabled });
  };

  const toggleTimer = () => {
    onUpdateSettings({ ...settings, timerEnabled: !settings.timerEnabled });
  };

  const toggleNegativeMarking = () => {
    onUpdateSettings({ ...settings, negativeMarking: !settings.negativeMarking });
  };

  const handleThemeChange = (theme) => {
    onUpdateSettings({ ...settings, theme });
  };

  const handleDifficultyChange = (e) => {
    onUpdateSettings({ ...settings, defaultDifficulty: e.target.value });
  };

  const handleConfirmReset = () => {
    const fresh = resetAllProgress();
    onResetProgress(fresh);
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Settings size={24} style={{ color: "var(--accent-primary)" }} />
            <h2>Game Settings</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Theme Selector */}
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <Palette size={16} /> Interface Theme
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
              {[
                { id: "dark", label: "Dark Space" },
                { id: "neon", label: "Midnight Neon" },
                { id: "light", label: "Crisp Light" }
              ].map((th) => (
                <button
                  key={th.id}
                  className={`btn-secondary ${settings.theme === th.id ? "active" : ""}`}
                  style={{
                    padding: "0.6rem",
                    fontSize: "0.85rem",
                    borderColor: settings.theme === th.id ? "var(--accent-primary)" : "var(--border-color)",
                    background: settings.theme === th.id ? "rgba(99, 102, 241, 0.25)" : "var(--bg-input)"
                  }}
                  onClick={() => handleThemeChange(th.id)}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Preset */}
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
              Difficulty Progression
            </label>
            <select
              value={settings.defaultDifficulty}
              onChange={handleDifficultyChange}
              className="num-input"
              style={{
                width: "100%",
                padding: "0.6rem 0.8rem",
                fontSize: "0.95rem",
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              <option value="Auto-Adaptive">Auto-Adaptive (Dynamic difficulty scaling)</option>
              <option value="Easy">Always Easy (+10 pts)</option>
              <option value="Medium">Always Medium (+20 pts)</option>
              <option value="Hard">Always Hard (+30 pts)</option>
              <option value="Expert">Always Expert (+50 pts)</option>
            </select>
          </div>

          {/* Audio & Timer Toggles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", background: "rgba(0,0,0,0.15)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
            {/* Sound FX Toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {settings.soundEnabled ? <Volume2 size={18} style={{ color: "#34d399" }} /> : <VolumeX size={18} style={{ color: "var(--text-muted)" }} />}
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Sound Effects</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Pencil sounds, chimes, and buzzers</div>
                </div>
              </div>
              <button
                className={`btn-secondary ${settings.soundEnabled ? "active" : ""}`}
                style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
                onClick={toggleSound}
              >
                {settings.soundEnabled ? "ON" : "OFF"}
              </button>
            </div>

            {/* BGM Toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Music size={18} style={{ color: settings.bgmEnabled ? "#ec4899" : "var(--text-muted)" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Ambient Background Music</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Calm focus ambient synth progression</div>
                </div>
              </div>
              <button
                className={`btn-secondary ${settings.bgmEnabled ? "active" : ""}`}
                style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
                onClick={toggleBgm}
              >
                {settings.bgmEnabled ? "ON" : "OFF"}
              </button>
            </div>

            {/* Timer Toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={18} style={{ color: settings.timerEnabled ? "#38bdf8" : "var(--text-muted)" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Question Timer</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>30s / 60s countdown clock</div>
                </div>
              </div>
              <button
                className={`btn-secondary ${settings.timerEnabled ? "active" : ""}`}
                style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
                onClick={toggleTimer}
              >
                {settings.timerEnabled ? "ON" : "OFF"}
              </button>
            </div>

            {/* Negative Marking Toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldAlert size={18} style={{ color: settings.negativeMarking ? "#f43f5e" : "var(--text-muted)" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Negative Marking</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Deduct 5-10 pts on Hard/Expert if wrong</div>
                </div>
              </div>
              <button
                className={`btn-secondary ${settings.negativeMarking ? "active" : ""}`}
                style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
                onClick={toggleNegativeMarking}
              >
                {settings.negativeMarking ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Reset Progress Section */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
            {!showConfirmReset ? (
              <button
                className="btn-secondary"
                style={{ width: "100%", color: "#f87171", borderColor: "rgba(239, 68, 68, 0.3)" }}
                onClick={() => setShowConfirmReset(true)}
              >
                <Trash2 size={16} /> Reset All Player Progress
              </button>
            ) : (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center"
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "#fca5a5", marginBottom: "0.75rem" }}>
                  Are you sure? This will wipe your high scores, streaks, unlocked badges, and level progress!
                </p>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                  <button
                    className="btn-primary"
                    style={{ background: "#ef4444", padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}
                    onClick={handleConfirmReset}
                  >
                    Yes, Wipe Progress
                  </button>
                  <button
                    className="btn-secondary"
                    style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}
                    onClick={() => setShowConfirmReset(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
