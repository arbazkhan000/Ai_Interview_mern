import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
You are an AI that generates interview questions and answers.

Take inputs: role, years of experience, topics to focus on, and additional description.

Generate exactly 15 interview questions and their answers tailored to the inputs. Format output as:
1. Question: ...
   Answer: ...
2. Question: ...
   Answer: ...
...
Only include the numbered questions and answers. No extra text.
`,
});

async function getInterviewQA({ role, experience, topicToFocus, description }) {
    const prompt = `
Role: ${role}
Experience: ${experience}
Topics to Focus On: ${topicToFocus}
Additional Context: ${description}

Please generate 15 interview questions and detailed answers based on these inputs.
`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // Example Gemini output (text):
    // 1. Question: What is a closure in JavaScript?
    //    Answer: A closure is a function that remembers...
    // 2. Question: ...
    //    Answer: ...

    // ✅ Parse text to structured format
    const output = [];
    const questionBlocks = text.split(/\n(?=\d+\.\s*Question:)/); // Split by question blocks

    for (const block of questionBlocks) {
        const questionMatch = block.match(/Question:\s*(.+)/i);
        const answerMatch = block.match(/Answer:\s*([\s\S]+)/i);

        if (questionMatch && answerMatch) {
            output.push({
                question: questionMatch[1].trim(),
                answer: answerMatch[1].trim(),
            });
        }
    }

    return output;
}

export default getInterviewQA;
