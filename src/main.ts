import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <span class="card read-the-docs" id="server-status">Offline</span>

    <div id="jwtToken">
      <h3>Connect to server</h3>
      <input type="text" placeholder="Json Wrb Token" />
      <button>Connect</button>
    </div>

    <div id="users">
      <h3>Users online</h3>
      <ul></ul>
    </div>

    <form id="chat-form">
      <input type="text" placeholder="Write your message" />
    </form>

    <div id="chat-messages">
      <h3>Messages</h3>
      <ul></ul>
    </div>
  </div>
`;

// connectToServer();

const inputJwt = document.querySelector<HTMLInputElement>("#jwtToken input")!;
const buttonJwt =
  document.querySelector<HTMLButtonElement>("#jwtToken button")!;

buttonJwt.addEventListener("click", () => {
  if (inputJwt.value.trim().length <= 0) return;

  connectToServer(inputJwt.value.trim());
});
