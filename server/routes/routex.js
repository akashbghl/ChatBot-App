import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// route 
router.post('/response', async (req, res) => {
    try {
        const { type, text } = req.body;
        console.log(type);
        
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${text}`,
        });
        console.log(response.text);
        res.status(200).json({ type: 'ai', text: response.text });

    } catch (error) {
        console.error('Internal Error: ', error);
        res.status(500).json({ type:'ai' ,text: 'Server Error hai bhai .'});
    }
})
export default router;