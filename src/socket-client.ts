import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: token,
    },
  });

  socket?.removeAllListeners();
  socket = manager.socket("/");

  addListeners();
};

const addListeners = () => {
  const serverStatusLabel =
    document.querySelector<HTMLLabelElement>("#server-status")!;
  const usersUl = document.querySelector<HTMLUListElement>("#users ul")!;
  const chatForm = document.querySelector<HTMLFormElement>("#chat-form")!;
  const chatInput =
    document.querySelector<HTMLInputElement>("#chat-form input")!;
  const chatMessagesUl =
    document.querySelector<HTMLUListElement>("#chat-messages ul")!;

  socket.on("connect", () => {
    serverStatusLabel.classList.remove("offline");
    serverStatusLabel.classList.add("online");
    serverStatusLabel.innerHTML = "Online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.classList.remove("online");
    serverStatusLabel.classList.add("offline");
    serverStatusLabel.innerHTML = "Offline";
  });

  socket.on("connectedUsers", (users: string[]) => {
    let usersHtml = "";
    users.forEach((userId) => {
      usersHtml += `<li>${userId}</li>`;
    });

    usersUl.innerHTML = usersHtml;
  });

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (chatInput.value.trim().length <= 0) return;

    socket.emit("messageFromUser", {
      id: socket.id,
      message: chatInput.value,
    });

    chatInput.value = "";
  });

  socket.on(
    "messageFromServer",
    (payload: { userName: string; message: string }) => {
      const newMessage = `
        <li>
          <strong class="message-author">${payload.userName}: </strong>
          <span class="message-content">${payload.message}</span>
        </li>
        `;
      chatMessagesUl.innerHTML += newMessage;
    }
  );
};
