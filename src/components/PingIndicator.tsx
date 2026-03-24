import { observer } from "mobx-react-lite";
import { pingStore } from "../store/pingStore";

const PingIndicator = observer(() => {
  const { averagePing, connectionStatus } = pingStore;

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "excellent":
        return "#4caf50";
      case "unstable":
        return "#ffeb3b";
      case "bad":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        backgroundColor: "#1e1c1f",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: getStatusColor(),
          boxShadow: `0 0 8px ${getStatusColor()}`,
        }}
      />

      <div>
        <div style={{ fontSize: "12px", opacity: 0.7 }}>Connection Status</div>
        <div style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {connectionStatus}
        </div>
      </div>

      <div
        style={{
          marginLeft: "12px",
          paddingLeft: "12px",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          {Math.round(averagePing)}
        </span>
        <span style={{ fontSize: "12px", opacity: 0.6, marginLeft: "4px" }}>
          ms
        </span>
        <button
          style={{ marginLeft: "16px" }}
          onClick={() => pingStore.recordPing(Math.random() * 200)}
        >
          Simulate Ping
        </button>
      </div>
    </div>
  );
});

export default PingIndicator;
