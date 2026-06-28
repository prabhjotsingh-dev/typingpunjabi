export const englishToPunjabiMap: Record<string, string> = {
  q: "ੌ",
  w: "ੈ",
  e: "ਾ",
  r: "ੀ",
  t: "ੂ",
  y: "ਬ",
  u: "ਹ",
  i: "ਗ",
  o: "ਦ",
  p: "ਜ",
  "[": "ਡ",
  "]": "਼",
  a: "ੋ",
  s: "ੇ",
  d: "੍",
  f: "ਿ",
  g: "ੁ",
  h: "ਪ",
  j: "ਰ",
  k: "ਕ",
  l: "ਤ",
  ";": "ਚ",
  "'": "ਟ",
  x: "ੰ",
  c: "ਮ",
  v: "ਨ",
  b: "ਵ",
  n: "ਲ",
  m: "ਸ",
  "/": "ਯ",
  Q: "ਔ",
  W: "ਐ",
  E: "ਆ",
  R: "ਈ",
  T: "ਊ",
  Y: "ਭ",
  U: "ਙ",
  I: "ਘ",
  O: "ਧ",
  P: "ਝ",
  "{": "ਢ",
  "}": "ਞ",
  A: "ਓ",
  S: "ਏ",
  D: "ਅ",
  F: "ਇ",
  G: "ਉ",
  H: "ਫ",
  J: "ੜ",
  K: "ਖ",
  L: "ਥ",
  ":": "ਛ",
  '"': "ਠ",
  X: "ਂ",
  C: "ਣ",
  V: "ਨ",
  B: "ੲ",
  N: "ਲ਼",
  M: "ਸ਼",
  "<": ",",
  ">": "।",
  "?": "ਯ",
  $: "ੱ",
};

// 1. Cleaner Set to Array conversion
export const allChars = [...new Set(Object.values(englishToPunjabiMap))];

// 2. Extracted and strictly anchored Regular Expressions
const NORMAL_LETTER_REGEX =
  /^[\u0A05\u0A13\u0A15-\u0A32\u0A35\u0A38-\u0A39\u0A5C\u0A72\u0A73]$/;
const NUKTA_LETTER_REGEX = /^[\u0A33\u0A36\u0A59-\u0A5B\u0A5E]$/;
const MATRA_REGEX =
  /^[\u0A01-\u0A04\u0A06-\u0A12\u0A14\u0A3E-\u0A4C\u0A4D\u0A51\u0A70\u0A71\u0A3C]$/;

export const isNormalLetter = (char: string) => NORMAL_LETTER_REGEX.test(char);
export const isNuktaLetter = (char: string) => NUKTA_LETTER_REGEX.test(char);
export const isMatra = (char: string) => MATRA_REGEX.test(char);

// 3. Optimized Sorting using Intl.Collator
const punjabiCollator = new Intl.Collator("pa");

export const PUNJABI_LETTERS = [
  ...allChars.filter(isNormalLetter).sort(punjabiCollator.compare),
  ...allChars.filter(isNuktaLetter).sort(punjabiCollator.compare),
];

export const PUNJABI_MATRAS = allChars
  .filter(isMatra)
  .sort(punjabiCollator.compare);

const topRowEnglish = "qwertyuiop[]QWERTYUIOP{}";
const homeRowEnglish = "asdfghjkl;'ASDFGHJKL:\"";
const bottomRowEnglish = "zxcvbnm,./ZXCVBNM<>?";

// 4. Improved Type Safety in filtering
const getRowLetters = (englishChars: string): string[] => {
  const mappedLetters = englishChars
    .split("")
    .map((c) => englishToPunjabiMap[c])
    // Type-guard ensures TS knows 'undefined' is completely removed
    .filter((char): char is string => char !== undefined);

  return [...new Set(mappedLetters)];
};

export const topRowLetters = getRowLetters(topRowEnglish);
export const homeRowLetters = getRowLetters(homeRowEnglish);
export const bottomRowLetters = getRowLetters(bottomRowEnglish);
