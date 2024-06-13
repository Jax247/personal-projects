import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()
const openai = new OpenAI({
    organization: "org-GkKKLN4TTsKjgr4I1IwiZSb3",
    apiKey: process.env.OPENAI_SECRET_KEY,
});



export default openai;