import fs from "node:fs";

const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).formatToParts(new Date()).filter(x => x.type !== "literal").map(x => [x.type, x.value]));

const date = `${parts.year}-${parts.month}-${parts.day}`;
const ext = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000) % 2 ? "py" : "ts";
const file = `daily/${ext === "ts" ? "daily.ts" : "daily.py"}`;

fs.mkdirSync("daily", { recursive: true });
fs.writeFileSync(file, ext === "ts"
  ? `export const date: string = "${date}";\n`
  : `date = "${date}"\n`
);

console.log(`Updated ${file}`);
