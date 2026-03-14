import { handleInput } from "./Order.js";

class Chat extends HTMLElement {
  sendMessage(evt) {
    evt.preventDefault();
    var msg = this.input.value;
    this.input.value = "";
    this.writeLine(msg);
  }

  writeLine(text) {
    this.messages.insertAdjacentHTML(
      "beforeend",
      '<li class="message-item item-secondary">You say: ' + text + "</li>"
    );
    const aMessages = handleInput(text);
    for (let message of aMessages) {
      this.messages.insertAdjacentHTML(
        "beforeend",
        '<li class="message-item item-primary">Bot says: ' + message + "</li>"
      );
    }
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  connectedCallback() {
    const suffix = (Math.random() * 100).toFixed().toString();
    this.innerHTML =
      "<style>" +
      ".chat" + suffix + " ul { list-style: none; }" +
      ".chat" + suffix + " { max-width: 400px; min-height: 400px; background-color: #fff; padding: 0 15px; border-radius: 1rem; }" +
      ".chat" + suffix + " .messages { display: flex; flex-direction: column; justify-content: space-between; height: 500px; }" +
      ".chat" + suffix + " .message-list { overflow-y: auto; max-height: 500px; }" +
      ".chat" + suffix + " .message-item { padding: 20px; border-radius: 0.75rem; margin: 20px 0; white-space: pre-wrap; }" +
      ".chat" + suffix + " .item-primary { background-color: #f6f7f8; color: #3c3c3e; margin-right: 2em; }" +
      ".chat" + suffix + " .item-secondary { background-color: #5ccad7; color: #fff; margin-left: 2em; }" +
      ".chat" + suffix + " .message-input { display: flex; padding: 20px 0; }" +
      ".chat" + suffix + " .message-input input { width: 100%; padding: 10px; border-radius: 2rem; border: 1px solid #a5a5a5; }" +
      ".chat" + suffix + " .message-input button { padding: 10px; margin-left: 10px; border-radius: 5px; border: none; cursor: pointer; }" +
      "</style>" +
      '<div class="chat' + suffix + '">' +
        '<div class="messages">' +
          '<ul class="message-list"></ul>' +
          '<form class="message-input">' +
            '<input type="text" placeholder="Type your message..." />' +
            '<button type="submit">Send</button>' +
          "</form>" +
        "</div>" +
      "</div>";

    this.input = this.querySelector("input");
    this.messages = this.querySelector(".message-list");
    this.querySelector("form").addEventListener("submit", this.sendMessage.bind(this));

    const welcome = handleInput("");
    for (let message of welcome) {
      this.messages.insertAdjacentHTML(
        "beforeend",
        '<li class="message-item item-primary">Bot says: ' + message + "</li>"
      );
    }
  }
}

customElements.define("x-chat", Chat);