import CommentList from "./components/CommentList";
import EmojiConsole from "./components/EmojiConsole";
import PingIndicator from "./components/PingIndicator";
import SmartLampUI from "./components/SmartLampUI";
import TypingSpeedMeter from "./components/TypingSpeedMeter";

const App = () => {
  return (
    <>
      <EmojiConsole />
      <CommentList />
      <PingIndicator />
      <SmartLampUI />
      <TypingSpeedMeter />
    </>
  );
};

export default App;
