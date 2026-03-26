import "reflect-metadata";
import { Container } from "inversify";
import {
  Katana,
  Shuriken,
  StealthService,
  HealthService,
  Ninja,
} from "./store/ninjaService";
import { TYPES, type IWeapon } from "./types/types";

const container = new Container();

container.bind<IWeapon>("Katana").to(Katana);
container.bind<IWeapon>("Shuriken").to(Shuriken);

container.bind<() => IWeapon>(TYPES.WeaponFactory).toFactory(() => {
  return () => {
    const randomValue = Math.random();
    const weaponName = randomValue > 0.5 ? "Katana" : "Shuriken";

    return container.get<IWeapon>(weaponName);
  };
});

container
  .bind<StealthService>(TYPES.Stealth)
  .to(StealthService)
  .inSingletonScope();

container
  .bind<HealthService>(TYPES.Health)
  .to(HealthService)
  .inSingletonScope();

container.bind<Ninja>(TYPES.Warrior).to(Ninja).inSingletonScope();

export { container };

export function useService<T>(identifier: symbol | string): T {
  return container.get<T>(identifier);
}
