import { observer } from "mobx-react-lite";
import css from "./NinjaDashboard.module.css";
import { TYPES } from "../../types/types";
import type { Ninja } from "../../store/ninjaService";
import { useService } from "../../inversify.config";

const NinjaDashboard = observer(() => {
  const ninja = useService<Ninja>(TYPES.Warrior);

  const healthColor =
    ninja.health.hp > 50
      ? "#4CAF50"
      : ninja.health.hp > 20
        ? "#FF9800"
        : "#F44336";

  return (
    <div
      className={css.container}
      style={{
        backgroundColor: ninja.stealth.isHidden ? "#353333" : "#4d3939",
      }}
    >
      <h2 className={css.title}>🥷 Додзьо Ніндзя</h2>

      <div className={css.statusCard}>
        <p className={css.infoRow}>
          <strong className={css.label}>Статус:</strong>{" "}
          <span
            style={{
              fontWeight: "bold",
              color: ninja.stealth.isHidden ? "#666" : "#000",
            }}
          >
            {ninja.stealth.isHidden ? "🫥 Невидимий (Тінь)" : "👤 Видимий"}
          </span>
        </p>

        <div className={css.infoRow}>
          <strong className={css.label}>Здоров'я:</strong>
          <span
            style={{
              color: healthColor,
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            {ninja.health.hp}%
          </span>
        </div>

        <div className={css.progressBarContainer}>
          <div
            className={css.progressBarFill}
            style={{
              width: `${ninja.health.hp}%`,
              backgroundColor: healthColor,
            }}
          />
        </div>
      </div>

      <div className={css.actionsGrid}>
        <button className={css.button} onClick={() => alert(ninja.attack())}>
          ⚔️ Атакувати
        </button>

        <button className={css.button} onClick={() => ninja.stealth.toggle()}>
          {ninja.stealth.isHidden ? "👁 З'явитися" : "🌑 Сховатися"}
        </button>

        <button
          className={`${css.button} ${css.dangerButton}`}
          onClick={() => ninja.health.takeDamage(15)}
        >
          💥 Поранення
        </button>

        <button
          className={`${css.button} ${css.successButton}`}
          onClick={() => ninja.health.healing(15)}
        >
          🧪 Лікуватися
        </button>
      </div>

      {ninja.health.hp === 0 && (
        <p className={css.deathMessage}>Ніндзя вибув з бою... 💀</p>
      )}
    </div>
  );
});

export default NinjaDashboard;
