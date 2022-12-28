import { Configuration, OpenAIApi } from "openai";
import supabase from "$lib/supabase/config";
import * as dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-CNyAxWDWmtUylw5fFDP3pLmc",
});
const openai = new OpenAIApi(configuration);

export const GET = async () => {
  let { data, error } = await supabase
    .from("openai_chatgpt")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.log("error: ", error);

  return new Response(JSON.stringify({ data }), { status: 200 });
};

export const POST = async ({ request }) => {
  const { from, msg } = await request.json();
  console.log("msg: ", msg);

  // save user info to Supabase DB
  const { error } = await supabase
    .from("openai_chatgpt")
    .insert([{ from, msg }]);

  if (error) console.log("error: ", error);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: msg,
      temperature: 2,
      max_tokens: 500,
    });
    console.log("server: ", response.data.choices[0].text);

    // Save chatGPT response to Supabase Database
    await supabase
      .from("openai_chatgpt")
      .insert([{ from: "chatbot", msg: response.data.choices[0].text }]);

    return new Response(
      JSON.stringify({
        success: true,
        data: { from: "chatbot", msg: response.data.choices[0].text },
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error.response) {
      console.log("error code: ", error.response.status);
      console.log("error data", error.response.data);
    } else {
      console.log("error message: ", error.message);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "The answers could not be generated",
      }),
      { status: 500 }
    );
  }
};
