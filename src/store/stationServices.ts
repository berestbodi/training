import { injectable } from "inversify";
import { action, makeObservable, observable, autorun, runInAction } from "mobx";
import type { IAstronaut } from "../types/types";

@injectable()
export class OxygenGenerator {
  @observable public oxygenLevel: number = 100;
  private readonly REGEN_RATE = 1;
  private readonly MAX_OXYGEN = 100;

  constructor() {
    makeObservable(this);

    autorun(() => {
      if (this.oxygenLevel < 20) {
        console.warn(`⚠️ УВАГА! Критичний рівень кисню: ${this.oxygenLevel}%`);
      }
    });

    this.oxygenRegeneration();
  }

  private oxygenRegeneration() {
    setInterval(() => {
      runInAction(() => {
        if (this.oxygenLevel < this.MAX_OXYGEN) {
          this.oxygenLevel = Math.min(
            this.MAX_OXYGEN,
            this.oxygenLevel + this.REGEN_RATE,
          );
        }
      });
    }, 1000);
  }

  @action public consume(amaunt: number) {
    this.oxygenLevel = Math.max(0, this.oxygenLevel - amaunt);
  }
}

@injectable()
export class RepairDrone {
  public readonly id: string;
  @observable public timeLeft: number = 30;
  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.id = `DRN-${Math.floor(Math.random() * 10000)}`;
    console.log(`Дрон ${this.id} активований`);
    makeObservable(this);
    this.startLifeCycle();
  }

  private startLifeCycle() {
    this.timerId = setInterval(() => {
      runInAction(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          this.stopTimer();
        }
      });
    }, 1000);
  }

  private stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public repair() {
    return `Дрон ${this.id} виконує ремонтні роботи...`;
  }
}

@injectable()
export class Engineer implements IAstronaut {
  type = "Engineer";
  report() {
    return "Інженер: Ситеми станції в нормі";
  }
}

@injectable()
export class Medic implements IAstronaut {
  type = "Medic";
  report() {
    return "Медик: Стан екіпажу стабільний";
  }
}
