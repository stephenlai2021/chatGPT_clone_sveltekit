import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export const chatMsgs = writable([]);

export const createPrompt = async (msg) => {
  console.log("msg: ", msg);
  chatMsgs.update((cur) => [
    ...cur,
    {
      msg: msg.msg,
      from: msg.from,
      id: uuidv4(),
      created_at: new Date().toLocaleDateString(),
    }
  ]);

  const res = await fetch("/api/openai/generatePrompts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });

  const json = await res.json();
  console.log("data: ", json.data);

  chatMsgs.update((cur) => [
    ...cur,
    {
      msg: json.data.msg,
      from: json.data.from,
      id: uuidv4(),
      created_at: new Date().toLocaleDateString(),
    },
  ]);
};
