import readline from "node:readline";
import fs from "node:fs/promises";
import sharp from "sharp";

import { getPlaiceholder } from "plaiceholder";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const main = async () => {
  const filename = await askQuestion("Please enter the file name: ");
  try {
    const file = await fs.readFile(filename);
    const webp = await sharp(file).webp().toBuffer();
    const { base64 } = await getPlaiceholder(webp, {
      size: 35,
      saturation: 1.4,
    });
    console.log(base64);
  } catch (err) {
    console.log(err);
  }
  rl.close();
};

main();
