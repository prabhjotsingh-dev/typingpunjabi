"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.groq_api_key,
});

export async function generatePunjabiParagraph(
  timeLimitInSeconds: number,
): Promise<string | null> {
  try {
    let estimatedWords = Math.ceil((timeLimitInSeconds / 60) * 35);
    estimatedWords = Math.max(35, Math.min(100, estimatedWords));

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a strict Punjabi language generator. 
Your ONLY job is to output a single paragraph in the Punjabi language (Gurmukhi script).
Rules:
1. DO NOT include any English translations, introductions, or conversational text.
2. ONLY output the Punjabi text.
3. Generate EXACTLY ${estimatedWords} words.
4. Make the text coherent, grammatically correct, and use standard Punjabi vocabulary suitable for a typing test.`,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const output = completion.choices[0]?.message?.content?.trim();

    if (!output) {
      return null;
    }

    return output;
  } catch (error) {
    console.error("Error generating Punjabi paragraph from Groq:", error);
    return null;
  }
}
