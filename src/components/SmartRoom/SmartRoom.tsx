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
  const { bulb, fan, heater } = roomStore;

  return (
    <div className={css.roomCard}>
      <h2 className={css.roomTitle}>🏠 {name}</h2>

      <div className={css.weatherSection}>
        <strong>Температура:</strong>
        <span className={css.temperatureValue}>{roomStore.temperature}°C</span>
      </div>

      {/* Світло */}
      <div className={css.controls}>
        <span>Світло: {bulb.isOn ? "💡" : "🌑"}</span>
        <button
          className={`${css.button} ${bulb.isOn ? css.buttonOn : css.buttonOff}`}
          onClick={() => bulb.toggle()}
        >
          {bulb.isOn ? "Вимкнути" : "Увімкнути"}
        </button>
      </div>

      <hr className={css.divider} />

      {/* Клімат-контроль */}
      <div className={css.climateControls}>
        <div className={css.controlRow}>
          <span>❄️ Охолодження:</span>
          <button
            className={`${css.button} ${fan.isOn ? css.buttonActive : ""}`}
            onClick={() => roomStore.toggleClimate("cooling")}
          >
            {fan.isOn ? "Працює" : "Запустити"}
          </button>
        </div>

        <div className={css.controlRow}>
          <span>🔥 Підігрів:</span>
          <button
            className={`${css.button} ${heater.isOn ? css.buttonActive : ""}`}
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
