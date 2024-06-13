import { Router, Request, Response } from "express";
import * as dotenv from "dotenv";
import openai from "../lib/open-ai";
// import 
dotenv.config();

type ImageRequestType = {
  prompt: string;
  size?: "1024x1024" | "512x512";
  n?: number | 1;
  format?: "b64_json" | "url";
};

const ImgGenRouter = Router();

ImgGenRouter.get("/", (_, res) => {
  res.status(200).json({ message: "Healthy" });
});

ImgGenRouter.post("/dalle/create", async (req: Request, res: Response) => {
  console.log("Generating Image");
  try {
    const { prompt, size, n, format }: ImageRequestType = req.body;

    console.log("Image Request prompt: ", prompt);

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: n ?? 1,
      size: size ?? "1024x1024",
      response_format: format ?? "url",
    });

    console.log("Response from OpenAI: ", aiResponse);

    const imageDeployments = aiResponse.data[0];

    const image = imageDeployments.b64_json ?? imageDeployments.url;

    console.log("Image Data", image);

    res.status(200).json({ image, format });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export { ImgGenRouter };
