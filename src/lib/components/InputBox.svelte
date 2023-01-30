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
    /* max-width: 750px; */
    width: 750px;
    /* border: 1px solid red; */
  }
 
  .chatbox-holder {
    position: absolute;
    /* bottom: 30px; */
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
    padding: 10px 0 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background: var(--bg-primary);
    /* border: 2px solid green; */
  }  

  @media (max-width: 750px) {
    .chatbox-wrapper {
      width: 90vw;
      /* max-width: 90%; */
    }
    .chatbox-holder {
      padding: 10px 0 10px 0;
    }
  }

  @media (max-width: 1026px) {
    .chatbox-holder {
      /* width: 90%; */
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
