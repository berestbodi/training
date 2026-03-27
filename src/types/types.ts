export const TYPES = {
  Oxygen: Symbol.for("OxygenGenerator"),
  Drone: Symbol.for("RepairDrone"),
  AstronautFactory: Symbol.for("Factory<IAstronaut>"),
};

export interface IAstronaut {
  type: string;
  report(): string;
}
