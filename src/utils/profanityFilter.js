// Basic front-end profanity detection using a static blocklist.
// This is intentionally simple—extend the list or logic as needed.

const PROFANE_WORDS = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "dick",
  "cunt",
  "bastard",
  "slut",
  "whore",
  "nigger",
  "nigga",
  "faggot",
  "rape",
  "cock",
  "pussy",
];

const normalize = (value = "") =>
  value
    .toLowerCase()
    .replace(/[@$!1|]/g, (match) => {
      switch (match) {
        case "@":
          return "a";
        case "$":
          return "s";
        case "!":
        case "1":
        case "|":
          return "i";
        default:
          return match;
      }
    });

export function containsProfanity(value) {
  if (!value) return false;
  const normalized = normalize(value);
  return PROFANE_WORDS.some((word) => normalized.includes(word));
}

export function getProfanityList() {
  return [...PROFANE_WORDS];
}

