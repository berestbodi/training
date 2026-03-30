import { injectable, inject } from "inversify";
import { makeObservable, computed, action } from "mobx";
import type { LightBulb, WeatherService } from "../services/services";
import type { IDevice } from "../services/devices";
import { TYPES } from "../ioc/identifiers";

@injectable()
export class RoomStore {
  @inject(TYPES.WeatherService) private weatherService!: WeatherService;
  @inject(TYPES.LightBulb) public bulb!: LightBulb;

  @inject(TYPES.Fan) public fan!: IDevice;
  @inject(TYPES.Heater) public heater!: IDevice;

  constructor() {
    makeObservable(this);
  }

  @computed get temperature() {
    return this.weatherService.temperature;
  }

  @action public toggleClimate(type: "cooling" | "heating") {
    if (type === "cooling") {
      this.fan.isOn = !this.fan.isOn;
      if (this.fan.isOn) this.heater.isOn = false;
    } else {
      this.heater.isOn = !this.heater.isOn;
      if (this.heater.isOn) this.fan.isOn = false;
    }
  }
}
