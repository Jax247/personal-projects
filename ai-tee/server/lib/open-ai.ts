import {Configuration, OpenAIApi} from 'openai'

const OpenAIClient = new Configuration({
    organization: "org-GkKKLN4TTsKjgr4I1IwiZSb3",
    apiKey: "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",//process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(OpenAIClient);


export default openai;