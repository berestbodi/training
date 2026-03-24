import { action, computed, makeObservable, observable } from "mobx";

interface Reaction {
  emoji: string;
  timestamp: number;
}

class EmojiStore {
  @observable recentReactions: Reaction[] = [];
  constructor() {
    makeObservable(this);
  }

  @action addReaction(emoji: string) {
    this.recentReactions.push({ emoji, timestamp: Date.now() });

    setTimeout(() => {
      this.recentReactions = this.recentReactions.filter(
        (r) => Date.now() - r.timestamp < 3000,
      );
    }, 3050);
  }

  @computed get isSpamming() {
    const lastThreeSeconds = this.recentReactions.filter(
      (r) => Date.now() - r.timestamp < 3000,
    );
    return lastThreeSeconds.length > 5;
  }
}

export const emojiStore = new EmojiStore();
