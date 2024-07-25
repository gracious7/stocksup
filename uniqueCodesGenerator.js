import express from "express";
import crypto from "crypto";
import Code from "./models/codeModel.js";
import { promisify } from 'util';
import { writeFile } from 'fs/promises';


export const generateAndStoreUniqueCodes = async () => {
    try {
      const numberOfCodes = 180;
      const uniqueCodes = [];
      const codes = await Code.find();
      if (codes.length > 0) {
        console.log("Code collection is not empty. Skipping code generation.");
        return;
      }

      // Function to generate a unique code of a specified length
      const generateUniqueCode = (length) => {
        const randomBytes = crypto.randomBytes(length / 2);
        return randomBytes.toString('hex').toUpperCase(); // Convert to uppercase for readability
      };
  
      // Generate unique codes with default name "Unknown"
      for (let i = 0; i < numberOfCodes; i++) {
        const uniqueCode = generateUniqueCode(8); // Adjust the code length as needed
        uniqueCodes.push({ code: uniqueCode });
      }
  
      // Store unique codes in the database
      const savedCodes = await Code.create(uniqueCodes);
      const codesString = JSON.stringify(uniqueCodes, null, 2); // 2-space indentation for readability
      await writeFile('unique_codes.json', codesString);
      console.log("Unique codes saved to the database:");
    } catch (error) {
      console.error("Error generating and storing unique codes:", error.message);
    }
  };
  
  // Usage: Call this function to generate and store unique codes in the database
  