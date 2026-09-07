import { createCipheriv, createHash, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const feedSecret = process.env.CANVAS_FEED_URL?.trim();
const passphrase = process.env.CANVAS_SYNC_PASSPHRASE;
const outputPath = new URL("../canvas-sync.enc.json", import.meta.url);

if (!feedSecret || !passphrase) {
  throw new Error("CANVAS_FEED_URL and CANVAS_SYNC_PASSPHRASE repository secrets are required.");
}
if (passphrase.length < 16) {
  throw new Error("CANVAS_SYNC_PASSPHRASE must contain at least 16 characters.");
}

const feedUrl = new URL(feedSecret.replace(/^webcal:/i, "https:"));
if (feedUrl.protocol !== "https:" || !/(^|\.)duke\.edu$/i.test(feedUrl.hostname) || !/\/feeds\/calendars\//i.test(feedUrl.pathname)) {
  throw new Error("The feed must be an HTTPS Duke Canvas calendar-feed URL.");
}

const response = await fetch(feedUrl, { redirect: "follow", headers: { "user-agent": "Academic-Command-Center/1.0" } });
if (!response.ok) throw new Error(`Canvas feed request failed with status ${response.status}.`);
const ics = await response.text();
if (!ics.includes("BEGIN:VCALENDAR")) throw new Error("Canvas did not return a valid iCalendar feed.");

const sourceHash = createHash("sha256").update(ics).digest("hex");
try {
  const current = JSON.parse(await readFile(outputPath, "utf8"));
  if (current.sourceHash === sourceHash) {
    console.log("Canvas feed is unchanged.");
    process.exit(0);
  }
} catch (_) {
  // The first run has no encrypted snapshot yet.
}

const fetchedAt = new Date().toISOString();
const plaintext = JSON.stringify({ ics, fetchedAt });
const iterations = 250000;
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(passphrase, salt, iterations, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final(), cipher.getAuthTag()]);

await writeFile(outputPath, JSON.stringify({
  version: 1,
  algorithm: "AES-256-GCM",
  kdf: "PBKDF2-SHA256",
  iterations,
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  data: encrypted.toString("base64"),
  sourceHash,
  updatedAt: fetchedAt
}, null, 2) + "\n");

console.log(`Encrypted Canvas snapshot created at ${fetchedAt}.`);
