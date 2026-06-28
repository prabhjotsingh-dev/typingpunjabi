"use server";

import Groq from "groq-sdk";

// 1. Move Groq instance outside to reuse connections and improve performance
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generatePunjabiParagraph(
  timeLimitInSeconds: number,
  practiceType?: string,
  customLetters?: string,
): Promise<string | null> {
  try {
    let estimatedWords = Math.ceil((timeLimitInSeconds / 60) * 35);
    estimatedWords = Math.max(35, Math.min(100, estimatedWords));

    const practiceLessonPrompt = `You are a strict text generator for a Punjabi Gurmukhi typing practice app.

Your task is to generate a sequence of valid Punjabi words using ONLY the characters from this list: ${customLetters || "none provided"}.

CRITICAL RULES:
1. NO SINGLE LETTERS (IMPORTANT): You MUST NOT output isolated single characters separated by spaces. Every word MUST be a combination of 2 to 5 characters. 
   - WRONG OUTPUT: ਪ ਰ ਕ ਤ ਚ ਟ
   - CORRECT OUTPUT: ਪਰ ਕਤ ਚਟਕ ਰੁਕ ਕੋਟ
2. Strict Character Set: You MUST NOT use any letter, matra (vowel sign), bindi, tippi, addak, or half-character that is not in the list.
3. No Grammar Required: Do NOT try to form cohesive sentences. Just generate a random sequence of distinct, dictionary-valid words.
4. Word Variety: Mix 2-letter, 3-letter, and 4-letter words. DO NOT REPEAT the same word over and over. Keep the vocabulary varied.
5. No Punctuation: Separate words only with a single space.
6. Generate exactly ${estimatedWords} valid words in total.`;

    const TestLessonPrompt = `You are a strict Punjabi language generator for a typing speed test. 
Your ONLY job is to output a single paragraph in the Punjabi language (Gurmukhi script).
Rules:
1. DO NOT include any English translations, introductions, or conversational text.
2. ONLY output the Punjabi text.
3. Generate EXACTLY ${estimatedWords} words.
4. CONSTRAINT: Make the text coherent, grammatically correct, and use standard Punjabi vocabulary suitable for a typing test.`;

    console.log("Sending request to Groq...");

    // 2. Explicitly check the string value to prevent bugs if practiceType is "test" or "homerow"
    // Update "homerow" below to whatever string you use in your frontend to trigger practice
    const isPracticeMode = practiceType !== "test" && customLetters !== undefined;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a strict linguistic AI. Follow the user's constraints perfectly. Output only the requested text with no explanations.",
        },
        {
          role: "user",
          content: isPracticeMode ? practiceLessonPrompt : TestLessonPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile", 
      temperature: 0.4, 
      max_tokens: 1024,
      top_p: 0.9,
      frequency_penalty: 1.5, 
      presence_penalty: 1.5,
      stream: false,
    });

    let output = completion.choices[0]?.message?.content?.trim();

    if (!output) {
      console.warn("Groq returned an empty response.");
      return null;
    }

    // 3. Clean up formatting: Remove English letters, and turn multiple spaces/newlines into a single space
    let cleanedOutput = output
      .replace(/[A-Za-z]/g, "") // Remove English
      .replace(/[.,?!'"()]/g, "") // Remove stray punctuation just in case
      .replace(/\s+/g, " ") // Collapse multiple spaces and newlines into one
      .trim();

    // 4. THE SILVER BULLET: JS Post-processing filter for practice mode
    if (isPracticeMode && customLetters) {
      // Convert "ਪ,ਰ,ਕ" into a single string "ਪਰਕ" for easy checking
      const allowedCharsString = customLetters.split(',').map(c => c.trim()).join('');
      
      cleanedOutput = cleanedOutput
        .split(' ') // Split into an array of words
        .filter((word) => {
          if (!word) return false;
          // Break the word into individual characters and matras
          const chars = Array.from(word);
          // Only keep the word if EVERY character exists in the allowed list
          return chars.every((char) => allowedCharsString.includes(char));
        })
        .join(' '); // Put it back into a string
    }

    // Check if filtering removed all words (extreme edge case)
    if (!cleanedOutput) {
       console.warn("JS filter removed all words due to strict constraints.");
       return null; 
    }

    return cleanedOutput;

  } catch (error) {
    console.error("Error generating Punjabi paragraph from Groq:", error);
    return null;
  }
}