import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

export const getResetPasswordEmail = (resetUrl) => {
  //Read the HTML template.
  const templatePath = path.join(
    __dirname,
    "templates",
    "resetPasswordTemplate.html"
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  let html = fs.readFileSync(templatePath, "utf-8");
  html = html.replace("{{resetUrl}}", resetUrl);
  return html;
};
