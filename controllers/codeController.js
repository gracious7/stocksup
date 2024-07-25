import Code from "../models/codeModel.js";
import path from "path";
import { dirname } from "path";
import csv from "fast-csv";
import fs from "fs";
import { fileURLToPath } from "url";

const upload_codes = async (req, res, next) => {
  try {
    let allCodes = [];
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log("comng");
    fs.createReadStream(
      path.join(__dirname, "../", "/public/files" + "/codes.csv")
    )
      .pipe(csv.parse({ headers: true }))
      .on("error", (err) => console.log(err))
      .on("data", async (row) => {
        const code1 = row.code;
        const code = await Code.create({
          code: code1,
        });
        console.log("code", code);
      })
      .on("end", (rowCount) => {
        res.status(201).json({
          message: "Code created successfully",
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export { upload_codes };
