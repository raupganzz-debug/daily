import fs from "node:fs";

const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
}).formatToParts(new Date()).filter(x => x.type !== "literal").map(x => [x.type, x.value]));

const date = `${parts.year}-${parts.month}-${parts.day}`;
const time = `${parts.hour}:${parts.minute}:${parts.second}`;
const ext = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000) % 2 ? "py" : "ts";
const file = `daily/${ext === "ts" ? "daily.ts" : "daily.py"}`;

fs.mkdirSync("daily", { recursive: true });
fs.writeFileSync(file, ext === "ts"
  ? `export const date: string = "${date}";\nexport const time: string = "${time}";\n`
  : `date = "${date}"\ntime = "${time}"\n`
);

console.log(`Updated ${file} at ${date} ${time} WIB`);
