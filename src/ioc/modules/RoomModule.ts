import { ContainerModule } from "inversify";
import type { ContainerModuleLoadOptions } from "inversify";
import { LightBulb, WeatherService } from "../../services/services";
import { Fan, Heater, type IDevice } from "../../services/devices";
import { RoomStore } from "../../store/RoomStore";
import { TYPES } from "../identifiers";

export const RoomModule = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    const { bind } = options;

    bind<WeatherService>(TYPES.WeatherService)
      .to(WeatherService)
      .inTransientScope();

    bind<LightBulb>(TYPES.LightBulb).to(LightBulb).inTransientScope();
    bind<Fan>(TYPES.Fan).to(Fan).inTransientScope();
    bind<Heater>(TYPES.Heater).to(Heater).inTransientScope();
    bind<IDevice>(TYPES.Device).toService(TYPES.Heater);
    bind(TYPES.RoomStore).to(RoomStore).inTransientScope();
  },
);
