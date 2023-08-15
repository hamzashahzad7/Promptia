import Prompt from "@models/prompt";
import { connectDb } from "@utils/database";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const prompts = await Prompt.findById(params.id).populate("creater");
    if (!prompts) {
      return new Response("Prompt not Found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectDb();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectDb();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt Delete Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to Delete Prompt", { status: 500 });
  }
};
