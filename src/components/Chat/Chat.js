import "./Chat.css";
import { useEffect, useState, useContext } from "react";
import Pusher from "pusher-js";
import serverUrl from "../../serverUrl";
import UserContext from "../UserContext";

const axios = require("axios");

function App() {
  const data = useContext(UserContext);
  const user = data[0].loggedUser;
  const matchedUser = data[0].matchedUser;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState("");
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

  useEffect(() => {
    if (user._id && matchedUser._id) {
      axios
        .get(`${serverUrl}/results/${user._id}/${matchedUser._id}`)
        .then((response) => {
          setChat(response.data[0].chatChannel);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`${serverUrl}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.name,
        message,
      }),
    });

    setMessage("");
  };

  return (
    <div className="container mt-16">
      <h1 className="text-xl font-bold mt-4">Chat with {matchedUser.name}:</h1>
      <div className="flex flex-col flex-shrink-0 bg-white">
        <div className="list-group list-group-flush scrollarea">
          {messages.map((message, i) => {
            return (
              <div key={i} class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white mt-2">
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
        <input type="text" className="border-black mb-4" placeholder="Write a message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ height: "40px" }} />
      </form>
    </div>
  );
}

export default App;
