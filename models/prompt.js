import { Schema, model, models } from "mongoose";
const {
  Types: { ObjectId },
} = Schema;
const PromptSchema = new Schema(
  {
    creater: {
      type: ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
