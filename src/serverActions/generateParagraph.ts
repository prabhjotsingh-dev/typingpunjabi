"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generatePunjabiParagraph(
  timeLimitInSeconds: number,
  practiceType?: string,
  customLetters?: string
): Promise<string | null> {
  try {
    let estimatedWords = Math.ceil((timeLimitInSeconds / 60) * 35);
    estimatedWords = Math.max(35, Math.min(100, estimatedWords));

    let constraintInstruction = "";
    
    if (practiceType === "homerow") {
      constraintInstruction = "Use ONLY letters typically found on the HOME ROW of a standard ravi Punjabi keyboard. Create combinations that resemble words.";
    } else if (practiceType === "toprow") {
      constraintInstruction = "Use ONLY letters typically found on the TOP ROW of a standard ravi Punjabi keyboard. Create combinations that resemble words.";
    } else if (practiceType === "bottomrow") {
      constraintInstruction = "Use ONLY letters typically found on the BOTTOM ROW of a standard ravi Punjabi keyboard. Create combinations that resemble words.";
    } else if (practiceType === "custom" && customLetters) {
      constraintInstruction = `Use ONLY the following letters to form words: ${customLetters.split(",").join(", ")}. You can repeat these letters. Do NOT use any other letters. Create combinations that resemble words or real words if possible.`;
    } else {
      constraintInstruction = "Make the text coherent, grammatically correct, and use standard Punjabi vocabulary suitable for a typing test.";
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a strict Punjabi language generator${practiceType ? ' for a typing practice' : 'for a typing speed test'}. 
Your ONLY job is to output a single paragraph in the Punjabi language (Gurmukhi script).
Rules:
1. DO NOT include any English translations, introductions, or conversational text.
2. ONLY output the Punjabi text.
3. Generate EXACTLY ${estimatedWords} words.
4. CONSTRAINT: ${constraintInstruction}`,
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

    // A quick check to strip English text if the model hallucinated explanations
    const cleanedOutput = output.replace(/[A-Za-z]/g, '').trim();

    return cleanedOutput || null;
  } catch (error) {
    console.error("Error generating Punjabi paragraph from Groq:", error);
    return null;
  }
}
