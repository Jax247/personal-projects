// import * as dotenv  from 'dotenv';
// import { UploadImage } from './../lib/imgKit';
// import openai from "../lib/open-ai";
import { Request, Response } from "express";
import {
  // Configuration,
  // CreateImageRequest,
  // OpenAIApi,
  // CreateImageRequestResponseFormatEnum,
  // CreateImageRequestSizeEnum,
} from "openai";
import { Log } from "../lib/logger";
// const OpenAIClient = new Configuration({
//   organization: "org-GkKKLN4TTsKjgr4I1IwiZSb3",
//   apiKey: "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", //process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(OpenAIClient);
const createImage = async (req: Request, res: Response) => {
  // Create completion with prompt from request
  //   Need prompt, size 800x800, n images, b_64 response
  const {}: // prompt,
  // n,
  // size,
  // type,
  {
    // prompt: string;
    // n?: number;
    // type?: CreateImageRequestResponseFormatEnum;
    // size?: CreateImageRequestSizeEnum;
  } = req.body;

  //   validate request input
  // if (!prompt) res.json({ error: "No prompt specified" });

  // if (!isValidSize(size)) {
  // res.json({
  //   error:
  //     "Unsupported Size. Images may only be 256x256,512x512, 1024x1024",
  // });
  // return
  // }

  // const createImageRequest: CreateImageRequest = {
  //   prompt: "An egyptian cat",
  //   n: 1,
  //   size: "1024x1024",
  //   // response_format: type,
  // };

  console.log("Generating Image");
  try {
    // const result = await openai.createImage(createImageRequest);

    // console.log("res", "result");

    const image = "hola"//result.data.data[0].url;


    console.log("Created Image URL:", image);

    Log.trace("image generated", { image } )

    // Store image

    // const storageLink = UploadImage(image, '')

    res.status(200).json({ image, format: "" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ error });
  }
};

// function isValidSize(value: unknown): value is CreateImageRequestSizeEnum {
//   return typeof value === "string" && value in CreateImageRequestSizeEnum;
// }
export { createImage };
