import "reflect-metadata";
import { Container } from "inversify";
import { RoomModule } from "./modules/RoomModule";
import { TYPES } from "./identifiers";

const container = new Container();

container.load(RoomModule);

export { container };

export function useService<T>(identifier: any): T {
  return container.get<T>(identifier);
}

container.get(TYPES.WeatherService);
