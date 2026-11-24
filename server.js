// ==========================================
// AI PERSONAL COMMAND CENTER SERVER
// ==========================================

import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();


const app = express();

const PORT =
    process.env.PORT || 3000;


const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);


const openai =
    new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });


app.use(express.json());


// ==========================================
// SERVE FRONTEND
// ==========================================

app.use(
    express.static(__dirname)
);


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message:
            "AI Command Center backend is running."
    });

});

// ==========================================
// REAL AI / LLM ENDPOINT
// ==========================================

app.post("/api/ai", async (req, res) => {

    try {

        const command =
            String(
                req.body?.command || ""
            ).trim();


        const incomingMessages =
            Array.isArray(req.body?.messages)
                ? req.body.messages
                : [];


        if (!command) {

            return res.status(400).json({

                success: false,

                error:
                    "Command is required."

            });

        }


        // ==========================================
        // BUILD CONVERSATION INPUT
        // ==========================================

        const conversationMessages =
            incomingMessages
                .slice(-20)
                .filter(
                    (message) =>
                        message &&
                        typeof message.message ===
                            "string"
                )
                .map((message) => ({

                    role:
                        message.type === "user"
                            ? "user"
                            : "assistant",

                    content:
                        message.message

                }));


        conversationMessages.push({

            role: "user",

            content: command

        });


        // ==========================================
        // REAL OPENAI REQUEST
        // ==========================================

        const response =
            await openai.responses.create({

                model: "gpt-6-luna",

                input: [

                    {
                        role: "system",

                        content:
                            "You are the AI assistant for a Personal Command Center. Answer naturally, clearly, and briefly. Use the conversation history when relevant. If the user asks a normal conversational question, answer it normally."
                    },

                    ...conversationMessages

                ]

            });


        return res.json({

            success: true,

            output:
                response.output_text

        });

    }
    catch (error) {

        console.error(
            "================================"
        );

        console.error(
            "OpenAI API Error"
        );

        console.error(
            "Status:",
            error?.status
        );

        console.error(
            "Code:",
            error?.code
        );

        console.error(
            "Type:",
            error?.type
        );

        console.error(
            "Message:",
            error?.message
        );

        console.error(
            "================================"
        );


        return res.status(
            error?.status || 500
        ).json({

            success: false,

            error:
                error?.message ||
                "AI request failed."

        });

    }

});


// ==========================================
// START SERVER
// ==========================================

app.listen(
    PORT,
    () => {

        console.log(
            `AI Command Center server running on http://localhost:${PORT}`
        );

    }
);