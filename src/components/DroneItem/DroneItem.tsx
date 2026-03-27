import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RepairDrone } from "../../store/stationServices";
import css from "../StationControl.module.css";

interface DroneItemProps {
  drone: RepairDrone;
  onExpire: (id: string) => void;
}

const DroneItem = observer(({ drone, onExpire }: DroneItemProps) => {
  useEffect(() => {
    if (drone.timeLeft === 0) {
      onExpire(drone.id);
    }
  }, [drone.timeLeft, drone.id, onExpire]);

  if (drone.timeLeft === 0) return null;

  return (
    <div className={css.droneRow}>
      <span>
        🛰 Дрон: <span className={css.droneId}>{drone.id}</span> — Онлайн
      </span>
      <span
        className={css.timer}
        style={{ color: drone.timeLeft < 10 ? "#ff4d4d" : "#4ecca3" }}
      >
        ⏱ {drone.timeLeft}s
      </span>
    </div>
  );
});

export default DroneItem;
