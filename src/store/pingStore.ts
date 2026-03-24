import { action, computed, makeObservable, observable } from "mobx";

interface PingHistory {
  ping: number;
  time: number;
}

class PingStore {
  @observable pingHistory: PingHistory[] = [];

  constructor() {
    makeObservable(this);
    setInterval(() => this.autoClearHistory(), 1000);
  }

  @action recordPing(ping: number) {
    this.pingHistory.push({ ping, time: Date.now() });
    console.log(this.pingHistory);
  }

  @action autoClearHistory() {
    this.pingHistory = this.pingHistory.filter(
      (r) => Date.now() - r.time < 10000,
    );
  }

  @computed get averagePing() {
    const history = this.pingHistory;
    if (history.length === 0) return 0;

    const sum = history.reduce((acc, item) => acc + item.ping, 0);
    return sum / history.length;
  }

  @computed get connectionStatus() {
    const ping = this.averagePing;

    if (this.pingHistory.length === 0) return "bad";

    if (ping < 50) return "excellent";
    if (ping < 150) return "unstable";
    return "bad";
  }
}

export const pingStore = new PingStore();
