import "./Chat.css";
import { useEffect, useState, useContext } from "react";
import Pusher from "pusher-js";
import serverUrl from "../../serverUrl";
import UserContext from "../UserContext";

function App() {
  const data = useContext(UserContext);
  const user = data[0].loggedUser.name;
  const matchedUser = data[0].matchedUser;
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("32177490e7bcb319718e", {
      cluster: "eu",
    });

    const channel = pusher.subscribe(`chat`);
    channel.bind("message", function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`${serverUrl}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        message,
      }),
    });

    setMessage("");
  };

  return (
    <div className="container">
      <div className="flex flex-col align-items-stretch flex-shrink-0 bg-white">
        <div className="list-group list-group-flush scrollarea">
          {messages.map((message) => {
            return (
              <div className="list-group-item list-group-item-action py-3 lh-tight">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <strong className="mb-1">{message.username}</strong>
                </div>
                <div className="col-10 mb-1 small">{message.message}</div>
              </div>
            );
          })}
        </div>
      </div>
      <form onSubmit={(e) => submit(e)}>
        <input className="form-control" placeholder="Write a message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </form>
    </div>
  );
}

export default App;
