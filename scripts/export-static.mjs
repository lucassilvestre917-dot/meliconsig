// Builds the site and saves the rendered home page as static files in netlify-upload/
// (plus netlify-upload.zip), ready for Netlify's manual "browse files to upload".
import { execSync, spawn } from "node:child_process";
import { cpSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const port = 4319;
const run = (command, env = {}, cwd = ".") => execSync(command, { stdio: "inherit", cwd, env: { ...process.env, ...env } });

rmSync(".output", { recursive: true, force: true });
run("npx vite build", { NITRO_PRESET: "node-server" });

const server = spawn(process.execPath, [".output/server/index.mjs"], { env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
try {
  let html;
  for (let attempt = 0; !html && attempt < 50; attempt++) {
    try {
      const response = await fetch(`http://localhost:${port}/`);
      if (!response.ok) throw new Error(`Home page returned ${response.status}`);
      html = await response.text();
    } catch (error) {
      if (attempt === 49) throw error;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  writeFileSync(".output/public/index.html", html);
} finally {
  server.kill();
}

rmSync("netlify-upload", { recursive: true, force: true });
rmSync("netlify-upload.zip", { force: true });
cpSync(".output/public", "netlify-upload", { recursive: true });
run(`tar -a -c -f ../netlify-upload.zip ${readdirSync("netlify-upload").join(" ")}`, {}, "netlify-upload");
console.log("\nPronto: envie netlify-upload.zip (ou a pasta netlify-upload) para a Netlify.");
