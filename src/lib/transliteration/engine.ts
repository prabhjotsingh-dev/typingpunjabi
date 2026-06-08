import { englishToPunjabiMap } from "@/lib/transliteration/languages/punjabi";

export function transliterate(text: string): string {
  return text
    .split("")
    .map((char) => englishToPunjabiMap[char] || char)
    .join("");
}
