import { injectable, inject } from "inversify";
import {
  makeObservable,
  computed,
  action,
  observable,
  runInAction,
} from "mobx";
import type { LightBulb, WeatherService } from "../services/services";
import type { IDevice } from "../services/devices";
import { TYPES } from "../ioc/identifiers";

@injectable()
export class RoomStore {
  @inject(TYPES.WeatherService) private weatherService!: WeatherService;
  @inject(TYPES.LightBulb) public bulb!: LightBulb;
  @inject(TYPES.Fan) public fan!: IDevice;
  @inject(TYPES.Heater) public heater!: IDevice;

  @observable public targetTemperature: number = 22;
  @observable public isAutoMode: boolean = false;

  constructor() {
    makeObservable(this);
    this.startClimateControl();
  }

  private startClimateControl() {
    setInterval(() => {
      runInAction(() => {
        const currentTemp = this.weatherService.temperature;

        if (this.fan.isOn) this.weatherService.updateTemperature(-0.2);
        if (this.heater.isOn) this.weatherService.updateTemperature(0.2);

        if (this.isAutoMode) {
          if (currentTemp > this.targetTemperature + 0.5) {
            this.fan.isOn = true;
            this.heater.isOn = false;
          } else if (currentTemp < this.targetTemperature - 0.5) {
            this.fan.isOn = false;
            this.heater.isOn = true;
          } else {
            this.fan.isOn = false;
            this.heater.isOn = false;
          }
        }

        if (currentTemp < 10) this.fan.isOn = false;
        if (currentTemp > 40) this.heater.isOn = false;
      });
    }, 1000);
  }

  @computed get temperature() {
    return Number(this.weatherService.temperature.toFixed(1));
  }

  @action public toggleAutoMode() {
    this.isAutoMode = !this.isAutoMode;
    if (!this.isAutoMode) {
      this.fan.isOn = false;
      this.heater.isOn = false;
    }
  }

  @action public setTargetTemperature(temp: number) {
    this.targetTemperature = temp;
  }

  @action public toggleClimate(type: "cooling" | "heating") {
    this.isAutoMode = false;
    if (type === "cooling") {
      this.fan.isOn = !this.fan.isOn;
      if (this.fan.isOn) this.heater.isOn = false;
    } else {
      this.heater.isOn = !this.heater.isOn;
      if (this.heater.isOn) this.fan.isOn = false;
    }
  }
}
