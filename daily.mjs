import fs from "node:fs";

const languages = [
  ["ts", `export const date: string = "DATE";`],
  ["py", `date = "DATE"`]
];

const parts = Object.fromEntries(
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date()).filter(x => x.type !== "literal").map(x => [x.type, x.value])
);

const date = `${parts.year}-${parts.month}-${parts.day}`;
const [ext, template] = languages[Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000) % 2];
const file = `daily/${date}.${ext}`;

if (fs.existsSync(file)) process.exit(0);

fs.mkdirSync("daily", { recursive: true });
fs.writeFileSync(file, `${template.replace("DATE", date)}\n`);
console.log(`Created: ${file}`);
