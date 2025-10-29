import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import dotenv from 'dotenv'

dotenv.config();

const aj = arcjet({

  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    
    slidingWindow({
      mode:"LIVE",
      max:100,
      interval:60 //60 seconds
    }),
  ],
});

export default aj;
