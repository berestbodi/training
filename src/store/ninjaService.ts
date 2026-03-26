import { inject, injectable } from "inversify";
import { TYPES, type IWeapon } from "../types/types";
import { action, makeObservable, observable } from "mobx";

@injectable()
export class Katana implements IWeapon {
  hit() {
    return "Удар катаною";
  }
}

@injectable()
export class Shuriken implements IWeapon {
  hit() {
    return "Кидок сюрикена";
  }
}

@injectable()
export class StealthService {
  @observable isHidden: boolean = false;
  constructor() {
    makeObservable(this);
  }
  @action toggle() {
    this.isHidden = !this.isHidden;
  }
}

@injectable()
export class HealthService {
  @observable hp: number = 100;
  constructor() {
    makeObservable(this);
  }
  @action takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);
  }
  @action healing(amount: number) {
    this.hp = Math.min(100, this.hp + amount);
  }
}

@injectable()
export class Ninja {
  @inject(TYPES.WeaponFactory) private _weaponFactory!: () => IWeapon;
  @inject(TYPES.Stealth) public stealth!: StealthService;
  @inject(TYPES.Health) public health!: HealthService;

  constructor() {
    makeObservable(this);
  }

  @action public attack() {
    const weapon = this._weaponFactory();
    return weapon.hit();
  }
}
