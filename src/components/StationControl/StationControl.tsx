import { useState } from "react";
import { observer } from "mobx-react-lite";
import css from "../StationControl.module.css";
import { getService, useService } from "../../inversify.config";
import type { OxygenGenerator, RepairDrone } from "../../store/stationServices";
import { TYPES, type IAstronaut } from "../../types/types";
import DroneItem from "../DroneItem/DroneItem";

const StationControl = observer(() => {
  const oxygenSystem = useService<OxygenGenerator>(TYPES.Oxygen);
  const astronautFactory = useService<
    (role: "engineer" | "medic") => IAstronaut
  >(TYPES.AstronautFactory);

  const [drones, setDrones] = useState<RepairDrone[]>([]);
  const [crewLogs, setCrewLogs] = useState<string[]>([]);

  const handleCallDrone = () => {
    const newDrone = getService<RepairDrone>(TYPES.Drone);
    setDrones((prev) => [newDrone, ...prev]);
  };

  const removeDrone = (id: string) => {
    setDrones((prev) => prev.filter((d) => d.id !== id));
  };

  const handleHire = (role: "engineer" | "medic") => {
    const astronaut = astronautFactory(role);
    setCrewLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${astronaut.report()}`,
      ...prev,
    ]);
  };

  return (
    <div className={css.stationWrapper}>
      <h1 className={css.mainTitle}>🚀 Командний Центр</h1>

      <section className={css.section}>
        <h3>🌬 Система Життєзабезпечення (Singleton)</h3>
        <p className={css.statusText}>
          Рівень кисню: <strong>{oxygenSystem.oxygenLevel}%</strong>
        </p>
        <button className={css.button} onClick={() => oxygenSystem.consume(10)}>
          Використати кисень (-10%)
        </button>
      </section>

      <section className={css.section}>
        <h3>🤖 Ангар Дронів (Transient)</h3>
        <button className={css.button} onClick={handleCallDrone}>
          Запустити нового дрона (30с)
        </button>
        <div className={css.droneListContainer}>
          <strong>Активні дрони:</strong>
          <div className={css.logList}>
            {drones.map((drone) => (
              <DroneItem key={drone.id} drone={drone} onExpire={removeDrone} />
            ))}
            {drones.length === 0 && (
              <div className={css.emptyNote}>Дронів немає в космосі</div>
            )}
          </div>
        </div>
      </section>

      <section className={css.section}>
        <h3>👨‍🚀 Екіпаж (Factory)</h3>
        <div className={css.buttonGroup}>
          <button className={css.button} onClick={() => handleHire("engineer")}>
            + Інженер
          </button>
          <button className={css.button} onClick={() => handleHire("medic")}>
            + Медик
          </button>
        </div>
        <ul className={css.logList}>
          {crewLogs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </section>
    </div>
  );
});

export default StationControl;
