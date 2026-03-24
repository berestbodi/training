import { observer } from "mobx-react-lite";
import { emojiStore } from "../store/emojiStore";

const EmojiConsole = observer(() => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Emoji Reactions</h2>

      <div
        style={{
          fontSize: "24px",
          color: emojiStore.isSpamming ? "red" : "green",
        }}
      >
        {emojiStore.isSpamming ? "⚠️ STOP SPAMMING!" : "All good"}
      </div>

      <div style={{ marginTop: "20px" }}>
        {["🔥", "❤️", "😂", "🚀", "⭐"].map((emoji) => (
          <button
            key={emoji}
            onClick={() => emojiStore.addReaction(emoji)}
            style={{ fontSize: "20px", margin: "5px", cursor: "pointer" }}
          >
            {emoji}
          </button>
        ))}
      </div>

      <p>Total active reactions: {emojiStore.recentReactions.length}</p>
    </div>
  );
});

export default EmojiConsole;
