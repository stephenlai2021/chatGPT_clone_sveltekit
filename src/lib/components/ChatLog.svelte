<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { chatMsgs } from "$lib/stores/chatMsgsStore";
  import IconChatGpt from "./IconChatGpt.svelte";

  let chat = null  

  // beforeUpdate(() => {
  //   autoscroll =
  //     chat && chat.offsetHeight + chat.scrollTop > chat.scrollHeight - 20;
  // });

  // afterUpdate(() => {
  //   if (autoscroll) chat.scrollTo(0, chat.scrollHeight);
  // });

  // $: if (chat) chat?.scrollTo(0, chat.scrollHeight);
</script>

<div class="chat-log" bind:this={chat}>
  {#each $chatMsgs as msg}
    <div
      class="chat-message"
      style:background={msg.from === "chatbot" ? "var(--bg-inputbox)" : ""}
    >
      <div class="chat-message-wrapper">
        <div class="avatar" style:background={msg.from === "me" ? "var(--bg-inputbox)" : ""}>
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
  .chat-log {
    position: absolute;
    width: 100%;
    height: calc(100vh - 100px);

    /* height: 100vh; */
    overflow-y: scroll;
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
