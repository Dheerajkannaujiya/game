import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import AchievementsModal from "./components/AchievementsModal";
import HowToPlayModal from "./components/HowToPlayModal";
import SettingsModal from "./components/SettingsModal";

import {
  getStoredProfile,
  saveProfile,
  getStoredSettings,
  saveSettings,
  getDailyChallengeStatus
} from "./utils/storage";
import { soundManager } from "./utils/audio";
import "./App.css";

export default function App() {
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [settings, setSettings] = useState(() => getStoredSettings());
  const [dailyStatus, setDailyStatus] = useState(() => getDailyChallengeStatus());

  // Screen routing
  const [currentScreen, setCurrentScreen] = useState("home"); // "home" | "game"
  const [gameMode, setGameMode] = useState("all"); // "all" | "english" | "maths" | "daily"

  // Modals
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Sync theme attribute with document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme || "dark");
  }, [settings.theme]);

  // Sync audio manager settings
  useEffect(() => {
    soundManager.setSoundEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  useEffect(() => {
    soundManager.setBgmEnabled(settings.bgmEnabled);
    return () => {
      soundManager.stopBgm();
    };
  }, [settings.bgmEnabled]);

  // Handlers
  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    handleUpdateSettings(updated);
  };

  const handleToggleBgm = () => {
    const updated = { ...settings, bgmEnabled: !settings.bgmEnabled };
    handleUpdateSettings(updated);
  };

  const handleStartGame = (mode = "all") => {
    soundManager.playClick();
    setGameMode(mode);
    setCurrentScreen("game");
  };

  const handleGoHome = () => {
    soundManager.playClick();
    setCurrentScreen("home");
    setDailyStatus(getDailyChallengeStatus());
  };

  const handleResetProgress = (freshProfile) => {
    setProfile(freshProfile);
    setSettings(getStoredSettings());
    setDailyStatus(getDailyChallengeStatus());
    soundManager.setSoundEnabled(true);
    soundManager.setBgmEnabled(false);
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar
        profile={profile}
        settings={settings}
        onToggleSound={handleToggleSound}
        onToggleBgm={handleToggleBgm}
        onOpenSettings={() => {
          soundManager.playClick();
          setShowSettings(true);
        }}
        onOpenProfile={() => {
          soundManager.playClick();
          setShowProfile(true);
        }}
        onOpenLeaderboard={() => {
          soundManager.playClick();
          setShowLeaderboard(true);
        }}
        onOpenAchievements={() => {
          soundManager.playClick();
          setShowAchievements(true);
        }}
        onOpenHowToPlay={() => {
          soundManager.playClick();
          setShowHowToPlay(true);
        }}
        onGoHome={handleGoHome}
      />

      {/* Main Screen Content */}
      <main className="main-content">
        {currentScreen === "home" ? (
          <Home
            profile={profile}
            dailyStatus={dailyStatus}
            onStartGame={handleStartGame}
            onOpenLeaderboard={() => {
              soundManager.playClick();
              setShowLeaderboard(true);
            }}
            onOpenHowToPlay={() => {
              soundManager.playClick();
              setShowHowToPlay(true);
            }}
            onOpenSettings={() => {
              soundManager.playClick();
              setShowSettings(true);
            }}
            onOpenProfile={() => {
              soundManager.playClick();
              setShowProfile(true);
            }}
            onOpenAchievements={() => {
              soundManager.playClick();
              setShowAchievements(true);
            }}
            onOpenDaily={() => handleStartGame("daily")}
          />
        ) : (
          <Game
            key={`${gameMode}-${Date.now()}`}
            mode={gameMode}
            profile={profile}
            settings={settings}
            onUpdateProfile={(updated) => {
              setProfile(updated);
              setDailyStatus(getDailyChallengeStatus());
            }}
            onBackHome={handleGoHome}
            onStartAnotherMode={(newMode) => {
              setGameMode(newMode);
            }}
          />
        )}
      </main>

      {/* Modals */}
      {showLeaderboard && (
        <Leaderboard
          profile={profile}
          onUpdateProfile={(updated) => setProfile(updated)}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {showProfile && (
        <Profile
          profile={profile}
          onUpdateProfile={(updated) => setProfile(updated)}
          onClose={() => setShowProfile(false)}
          onOpenAchievements={() => {
            setShowProfile(false);
            setShowAchievements(true);
          }}
        />
      )}

      {showAchievements && (
        <AchievementsModal
          unlockedIds={profile.unlockedAchievements || []}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
