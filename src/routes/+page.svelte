<script>
  import { chatMsgs } from '$lib/stores/chatMsgsStore'
  import InputBox from "$lib/components/InputBox.svelte";
  import ChatLog from "$lib/components/ChatLog.svelte";
  import { v4 as uuidv4 } from 'uuid'

  export let data
  const { openai } = data
  $chatMsgs = openai
</script>

<section class="chatbox">
  <ChatLog />
  <InputBox />
</section>

<style>
  .chatbox {
    flex: 1;
    position: relative;
  }
</style>


