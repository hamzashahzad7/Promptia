import Prompt from "@models/prompt";
import { connectDb } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDb();
    const newPrompt = new Prompt({
      creater: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to Create new Prompt", { status: 500 });
  }
};
