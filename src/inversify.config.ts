import { Container } from "inversify";
import { createContext, useContext } from "react";
import {
  Engineer,
  Medic,
  OxygenGenerator,
  RepairDrone,
} from "./store/stationServices";
import { type IAstronaut, TYPES } from "./types/types";

const container = new Container();

container
  .bind<OxygenGenerator>(TYPES.Oxygen)
  .to(OxygenGenerator)
  .inSingletonScope();
container.bind<RepairDrone>(TYPES.Drone).to(RepairDrone).inTransientScope();
container.bind<Engineer>("engineer").to(Engineer);
container.bind<Medic>("medic").to(Medic);

container
  .bind<(role: "engineer" | "medic") => IAstronaut>(TYPES.AstronautFactory)
  .toFactory(() => {
    return (role: "engineer" | "medic") => container.get<IAstronaut>(role);
  });

// Створюємо контекст для контейнера
export const InversifyContext = createContext<Container>(container);

// Тепер це справжній хук
export function useService<T>(identifier: symbol | string): T {
  const ctx = useContext(InversifyContext);
  return ctx.get<T>(identifier);
}

// Утиліта для отримання сервісу ПОЗА хуками
export const getService = <T>(id: symbol | string): T => container.get<T>(id);

export { container };
