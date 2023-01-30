<script>
  import { afterUpdate } from "svelte";
  import { chatMsgs } from "$lib/stores/chatMsgsStore";
  import IconChatGpt from "./IconChatGpt.svelte";

  let text;
  let chat;

  const scrollToBottom = (node) => {
    node.scroll({
      top: node.scrollHeight,
      behavior: "smooth",
    });
  };

  const typeText = (element, text) => {
    let index = 0;

    // output text every 20ms
    let interval = setInterval(() => {
      // if chatBot is typing
      if (index < text.length) {
        element.innerHTML += text.charAt(index); // save character
        index++;
      } else {
        // if we have reach the end of text
        clearInterval(interval);
      }
    }, 20);
  };

  // display three dots one by one
  const loader = (node) => {
    node.textContent = "";

    loadInterval = setInterval(() => {
      node.textContent += ".";

      if (node.textContent === "....") {
        node.textContent = "";
      }
    }, 300);
  };

  afterUpdate(() => {
    if ($chatMsgs) scrollToBottom(chat);
  });
</script>

<div class="chat-log" bind:this={chat}>
  {#each $chatMsgs as msg}
    <div
      class="chat-message"
      style:background={msg.from === "chatbot" ? "var(--bg-inputbox)" : ""}
    >
      <div class="chat-message-wrapper">
        <div
          class="avatar"
          style:background={msg.from === "me" ? "var(--bg-primary)" : ""}
        >
          {#if msg.from === "chatbot"}
            <IconChatGpt />
          {/if}

          {#if msg.from === "me"}
            <img
              src="https://cdn4.iconfinder.com/data/icons/avatar-circle-1-1/72/93-512.png"
              alt=""
              width="30"
              height="30"
            />
          {/if}
        </div>

        {#if msg.from !== ""}
          <div class="message">{msg.msg}</div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .chat-log {
    position: absolute;
    width: 100%;
    height: calc(100vh - 90px);
    /* bottom: 90px; */
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .chat-message-wrapper {
    display: flex;

    max-width: 750px;
    margin: auto;
  }

  .message {
    margin-left: 20px;
    padding-top: 3px;
    line-height: 1.5;
    letter-spacing: 0.5px;
    /* border: 1px solid; */
  }

  .chat-message {
    padding: 25px 15px;
    /* border: 1px solid; */
  }

  .avatar {
    width: 30px;
    height: 30px;
    background: var(--bg-chatgpt);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    /* padding: 2px; */
  }
</style>
