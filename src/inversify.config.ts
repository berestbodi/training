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

export const InversifyContext = createContext<Container>(container);

export function useService<T>(identifier: symbol | string): T {
  const ctx = useContext(InversifyContext);
  return ctx.get<T>(identifier);
}

export const getService = <T>(id: symbol | string): T => container.get<T>(id);

export { container };
