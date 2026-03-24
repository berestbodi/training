import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

class SmartLightStore {
  @observable.ref commandQueue: string[] = [];
  @observable status: "idle" | "processing" = "idle";

  constructor() {
    makeObservable(this);
  }

  @computed get canAddMore() {
    return this.commandQueue.length < 3;
  }

  @action pushCommand(cmd: string) {
    if (this.canAddMore) {
      this.commandQueue = [...this.commandQueue, cmd];
    }
  }

  @action async processNext() {
    if (this.commandQueue.length === 0 || this.status === "processing") return;

    this.status = "processing";
    const command = this.commandQueue[0];
    console.log(command);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    runInAction(() => {
      const [, ...rest] = this.commandQueue;
      this.commandQueue = rest;
      this.status = "idle";
    });

    if (this.commandQueue.length > 0) {
      this.processNext();
    }
  }
}

export const smartLightStore = new SmartLightStore();
