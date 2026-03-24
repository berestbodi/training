import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

interface KeyStroke {
  char: string;
  timestamp: number;
}

class TypingSpeedStore {
  @observable keyStrokes: KeyStroke[] = [];
  @observable isIdle = true;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    makeObservable(this);
    setInterval(() => this.autoClearHistory(), 1000);
  }

  @action onKeyPress(char: string) {
    this.keyStrokes.push({ char, timestamp: Date.now() });

    this.isIdle = false;
    if (this.idleTimer) clearTimeout(this.idleTimer);

    this.idleTimer = setTimeout(() => {
      runInAction(() => {
        this.isIdle = true;
      });
    }, 2000);
  }

  @action autoClearHistory() {
    const now = Date.now();
    if (this.isIdle) {
      this.keyStrokes = this.keyStrokes.filter((r) => now - r.timestamp < 5000);
    }
  }

  @computed get wordsPerMinute() {
    const count = this.keyStrokes.length;
    if (count === 0) return 0;
    return (count / 5) * 12;
  }
}

export const typingSpeedStore = new TypingSpeedStore();
