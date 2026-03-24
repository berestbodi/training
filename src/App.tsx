import CommentList from "./components/CommentList";
import EmojiConsole from "./components/EmojiConsole";
import PingIndicator from "./components/PingIndicator";
import SmartLampUI from "./components/SmartLampUI";

const App = () => {
  return (
    <>
      <EmojiConsole />
      <CommentList />
      <PingIndicator />
      <SmartLampUI />
    </>
  );
};

export default App;
