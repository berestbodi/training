export const TYPES = {
  Stealth: Symbol.for("Stealth"),
  Health: Symbol.for("Health"),
  Warrior: Symbol.for("Warrior"),
  WeaponFactory: Symbol.for("Factory<IWeapon>"),
};

export interface IWeapon {
  hit(): string;
}
