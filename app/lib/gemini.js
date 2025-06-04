const { GoogleGenerativeAI } = require("@google/generative-ai");

const systemPrompt = `
    You are an analyst specializing in text analysis of Telegram messages. Your task is to analyze conversations and provide insights on key aspects. Use only the provided messages for your analysis—do not assume or infer information beyond the given data. The provided messages are part of a longer conversation. Make it fun and humorous like Spotify Wrapped without using emojis.

    Give examples to explain reasoning behind criteria. If an example is necessary, make sure there is enough context to understand the example.

    Analyze the conversation based on the following criteria, especially the important ones:

    - **Vibe Check:** Assess the overall tone and sentiment of the conversation.
    - **Compatibility:** Evaluate the compatibility between participants based on communication patterns.
    - **Attachment Styles:** Identify potential attachment styles based on message content and interaction dynamics. (Secure, Anxious, Avoidant, and Disorganized) 
    - **Green Flags:** Highlight positive communication patterns or behaviors. (important: max 1 flag per user)
    - **Red Flags:** Identify concerning behaviors or communication patterns. (important: max 1 flag per user)

    Ensure that your response follows this JSON structure exactly.

    {
        "vibeCheck": "This chat flows with ease—thoughtful exchanges, laughter, comfort, and shared energy. Both are present, engaged, and clearly enjoying the connection naturally.",
        "compatibility": "85%",
        "users": [
            {
            "username": "johndoe",
            "attachmentStyle": [
                {
                "style": "Secure",
                "reasoning": "Confident, relaxed, not needy, emotionally steady."
                }
            ],
            "greenFlags": [
                {
                "flag": "Rapid Fire Replies",
                "reasoning": "Quick replies show high engagement and consistent effort."
                }
            ],
            "redFlags": [
                {
                "flag": "A Dash of Sarcasm",
                "reasoning": "Jokes sometimes misread, creating slight discomfort occasionally."
                }
            ]
            },
            {
            "username": "janesmith",
            "attachmentStyle": [
                {
                "style": "Anxious",
                "reasoning": "Often overthinks and needs extra reassurance."
                }
            ],
            "greenFlags": [
                {
                "flag": "Crystal Clear Communication",
                "reasoning": "She’s always clear, open, and very direct."
                }
            ],
            "redFlags": [
                {
                "flag": "Overthinking Everything",
                "reasoning": "Overanalyzes messages, adding tension without real cause."
                }
            ]
            }
        ]
    }
    
    Each section must contain exactly the specified number of words.
    Do not exceed or go below the word count.
    Use concise, playful language that fits the tone, but respect the limits strictly:

    - vibeCheck: Exactly 25 words
    - attachmentStyle.reasoning: Exactly 7 words
    - greenFlags.reasoning: Exactly 15 words
    - redFlags.reasoning: Exactly 15 words

    Any reasoning with more or fewer words will be considered invalid.
`;

const returnSchema = {
    "type": "object",
    "properties": {
        "vibeCheck": {
            "type": "string",
            "description": "A summary of the vibe between the users"
        },
        "compatibility": {
            "type": "string",
            "description": "A percentage indicating the compatibility between the users"
        },
        "users": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "username": {
                        "type": "string",
                        "description": "User's username"
                    },
                    "attachmentStyle": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "style": {
                                    "type": "string",
                                    "description": "The user's attachment style"
                                },
                                "reasoning": {
                                    "type": "string",
                                    "description": "Explanation for the user's attachment style"
                                }
                            },
                            "required": ["style", "reasoning"]
                        }
                    },
                    "greenFlags": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "flag": {
                                    "type": "string",
                                    "description": "Green flag for positive traits"
                                },
                                "reasoning": {
                                    "type": "string",
                                    "description": "Reasoning for the green flag"
                                }
                            },
                            "required": ["flag", "reasoning"]
                        }
                    },
                    "redFlags": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "flag": {
                                    "type": "string",
                                    "description": "Red flag for negative traits"
                                },
                                "reasoning": {
                                    "type": "string",
                                    "description": "Reasoning for the red flag"
                                }
                            },
                            "required": ["flag", "reasoning"]
                        }                   
                    }
                },
                "required": [
                    "username", "attachmentStyle", "greenFlags", "redFlags"
                ]
            }
        }
    },
    "required": ["vibeCheck", "compatibility", "users"]
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: systemPrompt,
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: returnSchema,
        temperature: 1,
    },
})


/**
 * Analysis given messages using GenAI
 * @param {*} history Chat messages from a specific chat 
 * @returns GenAI analysis result
 */
export async function getAnalysis(history) {
    const formattedHistory = history.map(message => JSON.stringify(message));

    try {
        const prompt = "\n Here are the Telegram messages for analysis: " + formattedHistory;

        const result = await model.generateContent(prompt);
        const json = JSON.parse(result.response.text());

        return json;
    } catch (error) {
        console.log(error);
        return {};
    }
}
