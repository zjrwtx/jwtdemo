import { Groq } from "groq-sdk"
import axios from 'axios';
const GROQ_API ="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"

//just for experiment
const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
})


export const requestToGroqAi = async(originalUrl) => {
    const readerUrl = `https://r.jina.ai/${originalUrl}`;
    let jsonResponse;
    try {
        jsonResponse = await axios.get(readerUrl, { headers: { "Accept": "application/json" } });
    } catch (error) {
        console.error('Error fetching the JSON response:', error);
        return;
    }

    if (jsonResponse.status === 200) {
        const jsonData = jsonResponse.data;
        const markdownContent = `文档名称: ${jsonData.data.title}\n文档原地址: ${jsonData.data.url}\n${jsonData.data.content}`;

        try {
            const reply = await groq.chat.completions.create({
                messages: [{
                    role: "user",
                    content: "一定要输出位中文"+markdownContent
                },
                {
                    role: "system",
                    content: "请你详细总结用户的原文为中文的阅读笔记，主要分一句话总结、重要要点、启发灵感、转发到朋友圈等社交媒体的文案和热门标签，并使用中文"
                }],
                model: "Llama3-70b-8192"
            })
        
            return reply.choices[0].message.content
         
        } catch (error) {
            console.error('Error generating the summary:', error);
        }
    } else {
        console.error('Failed to fetch JSON data:', jsonResponse.status);
    }
}