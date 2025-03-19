import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI({
    apiKey: apiKey,
});

const systemPrompt = `
    You are an analyst specializing in text analysis of Telegram messages. Your task is to analyze conversations and provide insights on key aspects. Use only the provided messages and users' information for your analysis—do not assume or infer information beyond the given data. The provided messages are part of a longer conversation. Make it fun and humorous like Spotify Wrapped without using emojis.

    Give examples to explain reasoning behind criteria. If an example is necessary, make sure there is enough context to understand the example.

    Analyze the conversation based on the following criteria:

    - **Vibe Check (Percentage):** Assess the overall tone and sentiment of the conversation.
    - **Average Response Time:** Calculate the average time taken between responses.
    - **Compatibility:** Evaluate the compatibility between participants based on communication patterns.
    - **Attachment Styles:** Identify potential attachment styles based on message content and interaction dynamics. (Secure, Anxious, Avoidant, and Disorganized)
    - **Green Flags:** Highlight positive communication patterns or behaviors.
    - **Red Flags:** Identify concerning behaviors or communication patterns.

    Ensure that your response follows this JSON structure exactly.

    {
        "vibeCheck": "The vibe is off the charts this time! You and your chat buddy are completely in sync, making every conversation feel like a breeze. No awkward pauses, just smooth and easy chatting with lots of laughs. Keep that energy flowing, you two are killing it!",
        "compatibility": {
            "percentage": "85%",
            "reasoning": "You and your chat buddy are pretty much twins when it comes to communication. Conversations are effortlessly balanced, with both of you bringing in your own good energy. It's like you're reading each other's minds, and it shows! 10/10 for compatibility!"
        },
        "users": [
            {
                "id": "12345",
                "firstName": "John",
                "lastName": "Doe",
                "username": "johndoe",
                "avgResponseTime": 45,
                "attachmentStyle": [
                    {
                        "style": "Secure",
                        "reasoning": "John’s got a solid, no-nonsense vibe. He’s calm, cool, and collected—ready to handle anything without breaking a sweat. Conversations with him are straightforward, with zero drama. Nice and chill."
                    }
                ],
                "greenFlags": [
                    {
                        "flag": "Rapid Fire Replies",
                        "reasoning": "John doesn't leave you hanging—quick responses keep the convo going at full speed."
                    },
                    {
                        "flag": "Supportive Vibes",
                        "reasoning": "Whenever you’re doubting yourself, John’s there with a ‘You’ve got this!’ He’s all about lifting you up with good energy. Like when you mentioned feeling down about your workout routine, and he said, “You’ve already made progress, keep going!"
                    }
                ],
                "redFlags": [
                    {
                        "flag": "A Dash of Sarcasm",
                        "reasoning": "Sometimes John’s sarcasm is a little too much. For instance, when you were talking about your favorite hobby and he replied with, “Oh, that’s definitely the most original thing I’ve heard all day!” It wasn’t the worst, but a little less spice would have been nice"
                    },
                    {
                        "flag": "Dodging Deep Talks",
                        "reasoning": "When the convo goes deep, John pulls back. You tried to get into that serious chat about how you both handle stress, but John kept things light, shifting to something like, “But hey, at least we can always joke about it!” He’s more about keeping it casual—don’t expect too many heart-to-hearts from him!"
                    }
                ]
            },
            {
                "id": "67890",
                "firstName": "Jane",
                "lastName": "Smith",
                "username": "janesmith",
                "avgResponseTime": 60,
                "attachmentStyle": [
                    {
                        "style": "Anxious",
                        "reasoning": "Jane’s a bit of a worrywart, always double-checking to make sure everything’s okay. Like that time you didn’t reply for a few minutes, and she asked, “Is everything alright?” She might need a little reassurance here and there, but it just means she cares a lot."
                    }
                ],
                "greenFlags": [
                    {
                        "flag": "Crystal Clear Communication",
                        "reasoning": "No beating around the bush with Jane—she’s straightforward and gets her point across clearly. Love the clarity!"
                    },
                    {
                        "flag": "Curiosity Overload ",
                        "reasoning": "Jane’s always digging deeper, asking questions and wanting to know more. Remember when you casually mentioned your travel plans, and she immediately fired back with, “What’s your dream destination? I want all the details!” Her curiosity makes every conversation feel like an exciting discovery.
"
                    }
                ],
                "redFlags": [
                    {
                        "flag": "Overthinking Everything ",
                        "reasoning": "Jane tends to overanalyze stuff a bit too much. You know that time when you were joking about your favorite ice cream flavor, and she was like, “But what does it say about me that I like it? Is it because I’m impulsive or…?” Sometimes her mind races, and it can make things feel a little stressful."
                    },
                    {
                        "flag": "Clingy Alert ",
                        "reasoning": "Jane loves reassurance—she can get a bit needy when it comes to validation. After telling her about your day, she replied, “So, did I say the right thing? Do you agree with me?” Don’t be surprised if she asks ‘Are you sure?’ a few extra times."
                    }
                ]
            }
        ]
    }
`;

export async function getAnalysis(history, users) {
    const formattedHistory = history.map(
        batch => batch.map(
            message => JSON.stringify(message)
        )
    );
    const formattedUsers = users.map(user => JSON.stringify(user));

    try {
        const completion = await client.chat.completions.create({
            model: "o3-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: "Here are the users:" + formattedUsers + "\n Here are the Telegram messages for analysis: " + formattedHistory,
                }
            ],
            response_format: { "type": "json_object" },
        });
        
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.log(error);
    }
}
