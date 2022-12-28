<script>
  import { createPrompt } from "$lib/stores/chatMsgsStore";
  import IconPaperPlane from "./IconPaperPlane.svelte";

  let prompts = "";

  const handleSubmit = async (e) => {
    if (!prompts || (!prompts && e.keyCode === 13)) {
      alert("Please type prompts !");
      return;
    }

    const msg = { from: 'me', msg: prompts }

    createPrompt(msg)
    // if ($msgSuccess === true) { 
      prompts = ''
    // } else {
    //   alert('Something went wrong !')
    // }
  };
</script>

<div class="chatbox-holder">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="chatbox-wrapper">
      <input
        type="text"
        class="chatbox-input"
        placeholder="Type your prompts here"
        bind:value={prompts}
      />
      <button class="btn-submit" type="submit">
        <IconPaperPlane />
      </button>
    </div>
  </form>
</div>

<style>
  .btn-submit {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .chatbox-wrapper {
    position: relative;
  }

  .chatbox-holder {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 750px;
    width: 750px;
  }

  @media (max-width: 1026px) {
    .chatbox-holder {
      width: 90%;
    }
  }

  .chatbox-input {
    background: var(--bg-inputbox);
    width: 100%;
    border-radius: 5px;
    border: none;
    height: 50px;
    padding: 0 40px 0 10px;
    outline: none;
    font-size: 1.2em;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  }
</style>
