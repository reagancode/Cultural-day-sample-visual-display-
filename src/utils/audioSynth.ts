/**
 * Web Audio API synthesizer for traditional Ugandan ceremonial polyrhythmic drums.
 * Plays authentic Bakisimba / Ngoma rhythms without requiring external audio files.
 */

export class UgandanDrumEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;
  private bpm = 108; // Traditional upbeat Bakisimba tempo
  private masterGain: GainNode | null = null;
  private onBeatCallback: ((step: number, drum: string) => void) | null = null;

  constructor() {
    // Lazy AudioContext creation on user gesture
  }

  public setOnBeat(callback: (step: number, drum: string) => void) {
    this.onBeatCallback = callback;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public setTempo(speed: 'calm' | 'festive' | 'dance') {
    switch (speed) {
      case 'calm':
        this.bpm = 88;
        break;
      case 'festive':
        this.bpm = 108;
        break;
      case 'dance':
        this.bpm = 126;
        break;
    }
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  // 16-step polyrhythmic African drum pattern (6/8 feeling mapped over 16/12 steps)
  // Ngoma (Bass), Bakisimba (Mid tone), Engalabi (Slap), Ensaasi (Shaker)
  private playStep() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const s = this.step % 16;

    // Bass Ngoma pattern (heavy accents on beats 0, 6, 10)
    if (s === 0 || s === 6 || s === 10) {
      this.triggerBassNgoma(now, s === 0 ? 1.0 : 0.7);
      if (this.onBeatCallback) this.onBeatCallback(s, 'bass');
    }

    // Bakisimba Tenor Drum (melodic bounce on 2, 4, 8, 12, 14)
    if (s === 2 || s === 4 || s === 8 || s === 12 || s === 14) {
      const pitch = s === 4 || s === 12 ? 165 : 140;
      this.triggerBakisimba(now, pitch, 0.6);
      if (this.onBeatCallback) this.onBeatCallback(s, 'tenor');
    }

    // Engalabi sharp high slap on beats 4 and 12
    if (s === 4 || s === 12) {
      this.triggerEngalabi(now, 0.75);
      if (this.onBeatCallback) this.onBeatCallback(s, 'slap');
    }

    // Ensaasi Gourd Shaker (polyrhythmic sixteenth-note rattle)
    if (s % 2 === 0 || s === 7 || s === 15) {
      this.triggerShaker(now, s % 4 === 0 ? 0.35 : 0.18);
    }

    this.step++;
  }

  private triggerBassNgoma(time: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Deep pitch drop from 110Hz to 48Hz
    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(46, time + 0.28);

    gain.gain.setValueAtTime(gainLevel * 0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.36);
  }

  private triggerBakisimba(time: number, freq: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.75, time + 0.16);

    gain.gain.setValueAtTime(gainLevel * 0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.2);
  }

  private triggerEngalabi(time: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    // Fast snappy pitch slap
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, time);
    osc.frequency.exponentialRampToValueAtTime(120, time + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, time);
    filter.Q.value = 3;

    gain.gain.setValueAtTime(gainLevel * 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.1);
  }

  private triggerShaker(time: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    // White noise burst with high-pass filter for dried gourd seeds sound
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainLevel * 0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.05);
  }

  public start() {
    this.initCtx();
    if (this.isPlaying) return;
    this.isPlaying = true;
    const intervalMs = (60 / this.bpm / 4) * 1000;
    this.timerId = window.setInterval(() => {
      this.playStep();
    }, intervalMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
