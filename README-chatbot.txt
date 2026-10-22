BLEWSPACE CHATBOT — SETUP
=========================
The chat bubble works straight away with built-in answers about Blewspace only
(services, prices, work, process, contact). Off-topic questions are refused and
the contact card is shown. The in-chat "Book a call" form sends to the same
SUBMIT_URL as the other forms (assets/app.js, line 7).

To switch on real AI answers (optional):
1. Create a free Vercel project and upload the "api" folder (api/chat.js).
2. In Vercel > Settings > Environment Variables add:
     ANTHROPIC_API_KEY = your Claude API key
     ALLOWED_ORIGIN    = https://blewspace.com   (your domain)
3. Deploy, then open assets/chat.js and set line 9:
     var CHAT_API_URL = 'https://YOUR-PROJECT.vercel.app/api/chat';
The AI is restricted to Blewspace facts by its instructions in api/chat.js.
If the AI is ever unavailable, the chat falls back to the built-in answers.
