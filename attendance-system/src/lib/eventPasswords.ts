// Static passwords for each event
export const eventPasswords: Record<string, string> = {
  "avishkaar": "AAVI2025",
  "cineverse": "CINE2025", 
  "man-in-the-middle": "MITM2025",
  "escape-the-room": "ESCAPE2025",
  "brain-o-teaser": "BRAIN2025",
  "the-resume-relay": "RESUME2025",
  "stock-x-stake": "STOCK2025",
  "memefest": "MEME2025",
  "human-or-ai": "HUMAN2025",
  "split-or-steal": "SPLIT2025",
  "dataloom": "DATA2025",
  "devBattle": "DEV2025",
};

export const getEventPassword = (eventName: string): string => {
  return eventPasswords[eventName] || "DEFAULT2025";
};