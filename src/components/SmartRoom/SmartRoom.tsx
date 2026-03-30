import { observer } from "mobx-react-lite";
import css from "./SmartRoom.module.css";
import { useService } from "../../ioc/inversify.config";
import { RoomStore } from "../../store/RoomStore";
import { TYPES } from "../../ioc/identifiers";
import React from "react";

interface Props {
  name: string;
}

const SmartRoom = observer(({ name }: Props) => {
  const [roomStore] = React.useState(() =>
    useService<RoomStore>(TYPES.RoomStore),
  );

  const { bulb, fan, heater, isAutoMode, targetTemperature } = roomStore;
  const cardClassName = `${css.roomCard} ${bulb.isOn ? css.lightOn : ""}`;

  return (
    <div className={cardClassName}>
      <h2 className={css.roomTitle}>🏠 {name}</h2>

      <div className={css.weatherSection}>
        <div className={css.tempMain}>
          <span className={css.tempLabel}>Зараз:</span>
          <span className={css.temperatureValue}>
            {roomStore.temperature}°C
          </span>
        </div>

        {isAutoMode && (
          <div className={css.targetDisplay}>
            <span className={css.tempLabel}>Ціль:</span>
            <span className={css.targetValue}>{targetTemperature}°C</span>
          </div>
        )}
      </div>

      <div className={css.thermostatSection}>
        <label className={css.checkboxLabel}>
          <input
            type="checkbox"
            checked={isAutoMode}
            onChange={() => roomStore.toggleAutoMode()}
          />
          Автоматичний термостаat
        </label>

        {isAutoMode && (
          <div className={css.targetControls}>
            <button
              className={css.smallButton}
              onClick={() =>
                roomStore.setTargetTemperature(targetTemperature - 1)
              }
            >
              -
            </button>
            <button
              className={css.smallButton}
              onClick={() =>
                roomStore.setTargetTemperature(targetTemperature + 1)
              }
            >
              +
            </button>
          </div>
        )}
      </div>

      <hr className={css.divider} />

      <div className={css.controlRow}>
        <span>Світло: {bulb.isOn ? "💡" : "🌑"}</span>
        <button
          className={`${css.buttonlight} ${bulb.isOn ? css.buttonOn : css.buttonOff}`}
          onClick={() => bulb.toggle()}
        >
          {bulb.isOn ? "Вимкнути" : "Увімкнути"}
        </button>
      </div>

      <div className={css.climateControls}>
        <div className={css.controlRow}>
          <span>❄️ Охолодження:</span>
          <button
            className={`${css.button} ${fan.isOn ? css.buttonActiveCool : ""}`}
            onClick={() => roomStore.toggleClimate("cooling")}
          >
            {fan.isOn ? "Працює" : "Запустити"}
          </button>
        </div>

        <div className={css.controlRow}>
          <span>🔥 Підігрів:</span>
          <button
            className={`${css.button} ${heater.isOn ? css.buttonActiveHeat : ""}`}
            onClick={() => roomStore.toggleClimate("heating")}
          >
            {heater.isOn ? "Працює" : "Запустити"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default SmartRoom;
