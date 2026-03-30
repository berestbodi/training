import { injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";

@injectable()
export class WeatherService {
  @observable public temperature: number = 20;

  constructor() {
    makeObservable(this);
    this.startPolling();
  }

  private startPolling() {
    setInterval(() => {
      runInAction(() => {
        this.temperature += Math.random() > 0.5 ? 1 : -1;
      });
    }, 5000);
  }
}

@injectable()
export class LightBulb {
  @observable public isOn: boolean = false;
  constructor() {
    makeObservable(this);
  }

  @action public toggle() {
    this.isOn = !this.isOn;
  }
}
