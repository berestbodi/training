import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

export interface IDevice {
  name: string;
  isOn: boolean;
  turnOn(): void;
}

@injectable()
export class Fan implements IDevice {
  public name = "Вентилятор";
  @observable public isOn = false;

  constructor() {
    makeObservable(this);
  }

  @action public turnOn() {
    this.isOn = true;
    console.log("Вентилятор запущено");
  }
}

@injectable()
export class Heater implements IDevice {
  public name = "Обігрівач";
  @observable public isOn = false;

  constructor() {
    makeObservable(this);
  }

  @action public turnOn() {
    this.isOn = true;
    console.log("Обігрівач запущено");
  }
}
