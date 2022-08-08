import "./Chat.css";
import { Widget, addResponseMessage } from "react-chat-widget";
import { useEffect, useContext } from "react";
import "react-chat-widget/lib/styles.css";
import UserContext from "../UserContext";

function Chat() {
  const data = useContext(UserContext);

  useEffect(() => {
    addResponseMessage("Initiate chat");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  return (
    <div className="App mt-5">
      <Widget handleNewUserMessage={handleNewUserMessage} fullScreenMode={"NO"} />
    </div>
  );
}

export default Chat;
