import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

@injectable()
export class WeatherService {
  @observable public temperature: number;

  constructor() {
    makeObservable(this);
    this.temperature = Math.floor(Math.random() * 15) + 15;
  }

  @action public updateTemperature(delta: number) {
    this.temperature += delta;
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
