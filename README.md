# TeleWrapped
#### **Your chat, cooked to perfection.**
Pick a menu (aka chat). Pick your flavor (aka how many messages). We’ll boil down the stats and serve them like a hotpot feast — one tasty ingredient at a time.

## Concept 
TeleWrapped isn't your typical year-in-review. It’s a fun dive into your chats, served up hot and spicy.

### Here's how it works:
1. Sign in using your Telegram account (via OTP)
2. Choose your menu — a group or private chat you want analyzed
3. Pick your soup base — 3,000 / 5,000 / 7,000 recent messages
4. Enjoy your results — each stat is linked to a hotpot ingredient that you have picked

### Sample Statistics
# TeleWrapped Stats Overview

| **Statistic**                    | **What It Shows**                                                                                   |
|-----------------------------------|------------------------------------------------------------------------------------------------------|
| **Vibe Check**                    | Reflects the overall energy of the chat, showing how well members interact with each other and the general dynamic. |
| **Number of Messages in Total**   | The total count of messages exchanged within the selected chat, indicating the level of activity and engagement. |
| **Compatibility**                 | A percentage that reflects how well your messaging styles align with other members. |
| **Attachment Styles (for each member)** | Identifies each member's attachment style (secure, anxious, avoidant, or disorganized) based on their behavior and engagement in the chat. |
| **Green Flags (for each member)** | Signals of a healthy, positive dynamic in the chat.|
| **Red Flags (for each member)**   | Indicators that something might be off in the chat. |

## Tech Stack
- Next.js (Frontend + Backend)
- GramJS (JavaScript Wrapper for Telegram Database Library)

## Getting Started
1. Clone the repository
   ```
   git clone https://github.com/chulintian/TeleWrapped.git
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Set up environment variables
   Create a `.env file` in the main directory and include:
   ```
   TELEGRAM_API_ID=your_telegram_api_id
   TELEGRAM_API_HASH=your_telegram_api_hash
   GOOGLE_API_KEY=your_google_api_key
   ```
5. Run the app
   ```
   npm run dev
   ```
   Go to `http://localhost:3000`

## Privacy
- No long-term storage
- Messages processed only after user consent
- All data stays local to your session
  
## Contribute / Ideas
This project is open to contributions — feel free to:
- Suggest new “ingredients” (aka creative stats)
- Improve performance
- Polish UI / animations
- Add more Telegram integrations
  
## If You Liked It...
Give it a star 🌟, share your Hotpot on socials, and invite friends to cook up their own chat stats!
