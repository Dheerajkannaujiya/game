// Sound Effects & Ambient Background Music using Web Audio API
// High performance, zero external asset dependencies, crystal clear audio

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isSoundEnabled = true;
    this.isBgmEnabled = false;
    this.bgmOscillators = [];
    this.bgmGainNode = null;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setSoundEnabled(enabled) {
    this.isSoundEnabled = enabled;
  }

  setBgmEnabled(enabled) {
    this.isBgmEnabled = enabled;
    if (enabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
  }

  playClick() {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext blocked or not allowed yet
    }
  }

  playCorrect() {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.28);
      });
    } catch {
      // AudioContext safe catch
    }
  }

  playWrong() {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext safe catch
    }
  }

  playStreak() {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.15, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.45);
      });
    } catch {
      // AudioContext safe catch
    }
  }

  playTick() {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext safe catch
    }
  }

  playVictory() {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.15 },
        { f: 783.99, d: 0.15, t: 0.3 },
        { f: 1046.5, d: 0.45, t: 0.45 }
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0.2, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + d + 0.05);
      });
    } catch {
      // AudioContext safe catch
    }
  }

  playGameOver() {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [392.0, 369.99, 349.23, 311.13]; // G4, F#4, F4, D#4
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        gain.gain.setValueAtTime(0.12, now + idx * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.25);
      });
    } catch {
      // AudioContext safe catch
    }
  }

  startBgm() {
    this.stopBgm();
    this.init();
    if (!this.ctx) return;

    // Ambient relaxing chords progression: Cmaj7 -> Am7 -> Fmaj7 -> G7
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // C, E, G, B
      [220.0, 261.63, 329.63, 392.0],  // A, C, E, G
      [174.61, 220.0, 261.63, 329.63], // F, A, C, E
      [196.0, 246.94, 293.66, 349.23]  // G, B, D, F
    ];
    let chordIndex = 0;

    const playChordStep = () => {
      if (!this.isBgmEnabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      currentChord.forEach((freq, i) => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.2);

          gain.gain.setValueAtTime(0.001, now + i * 0.2);
          gain.gain.linearRampToValueAtTime(0.025, now + i * 0.2 + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.2 + 2.8);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + i * 0.2);
          osc.stop(now + i * 0.2 + 3.0);
        } catch {
          // ignore
        }
      });
    };

    playChordStep();
    this.bgmInterval = setInterval(playChordStep, 3200);
  }

  stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
