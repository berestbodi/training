import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { typingSpeedStore } from "../store/typingSpeedStore";

const TypingSpeedMeter = observer(() => {
  const { wordsPerMinute, isIdle, keyStrokes } = typingSpeedStore;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        typingSpeedStore.onKeyPress(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      style={{ padding: "20px", textAlign: "center", fontFamily: "monospace" }}
    >
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: isIdle ? "#666" : "#4caf50",
        }}
      >
        {Math.round(wordsPerMinute)}{" "}
        <span style={{ fontSize: "18px" }}>WPM</span>
      </div>

      <div
        style={{
          margin: "10px 0",
          padding: "5px 15px",
          borderRadius: "20px",
          display: "inline-block",
          backgroundColor: isIdle ? "#eee" : "#e8f5e9",
          color: isIdle ? "#999" : "#2e7d32",
        }}
      >
        {isIdle ? "💤 Idle" : "⌨️ User is typing..."}
      </div>

      <div style={{ marginTop: "20px", color: "#999" }}>
        Last chars: {keyStrokes.map((k) => k.char).join(" ")}
      </div>

      <div
        style={{
          width: "200px",
          height: "10px",
          background: "#ddd",
          margin: "20px auto",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(wordsPerMinute, 100)}%`,
            height: "100%",
            background: wordsPerMinute > 60 ? "#f44336" : "#4caf50",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
});

export default TypingSpeedMeter;
