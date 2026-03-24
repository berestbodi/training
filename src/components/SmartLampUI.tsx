import { observer } from "mobx-react-lite";
import { smartLightStore } from "../store/smartLightStore";

const SmartLampUI = observer(() => {
  const { commandQueue, status, canAddMore } = smartLightStore;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Smart Lamp Controller</h2>

      <p>
        Status: <strong>{status}</strong>
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          disabled={!canAddMore}
          onClick={() => smartLightStore.pushCommand("ON")}
        >
          Turn ON
        </button>

        <button
          disabled={!canAddMore}
          onClick={() => smartLightStore.pushCommand("COLOR_RED")}
        >
          Set RED
        </button>

        <button
          disabled={!canAddMore}
          onClick={() => smartLightStore.pushCommand("OFF")}
        >
          Turn OFF
        </button>
      </div>

      <button
        onClick={() => smartLightStore.processNext()}
        disabled={status === "processing" || commandQueue.length === 0}
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px 20px",
        }}
      >
        Execute Queue
      </button>

      <div style={{ marginTop: "20px" }}>
        <h4>Queue ({commandQueue.length}/3):</h4>
        {commandQueue.length === 0 ? (
          <p>No commands pending</p>
        ) : (
          <ul>
            {commandQueue.map((cmd, idx) => (
              <li key={idx}>
                {cmd} {idx === 0 && status === "processing" && "⏳"}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!canAddMore && (
        <p style={{ color: "red" }}>Queue is full! Wait for processing.</p>
      )}
    </div>
  );
});

export default SmartLampUI;
