## Important Libraries used
1. VAPI - AI Voice Assistant (https://dashboard.vapi.ai/workflows/ea9400f0-132d-41d2-ac77-7582b8490e81)
   Here we need to create our Assistant and then the Workflow.

## To Use Toast Messages
1. Need to import <Toaster /> in the Layout.jsx under /app folder.

## Using Firebase Database
1. URL = "firebase.google.com" and for login with your account click on "Go to Console"
2. We'll setup Authentication here in the Project Console
3. Selected Email/Password method from the Authentication method which will use SDK
4. Next install firebase sdk from the console.
5. After that headover to the Project settings and generate a new private key and set it inside the .env.local file.

## Using Google AI Studio
1. It is used to generate questions from Gemini AI. 
2. Need to create a new API Key
3. Gemini may be free for one month trial usage starting from 31st March 2025.
4. npm install ai @ai-sdk/google   ==> used this command to install the libraries.


## VAPI = AI Voice Agent to speak like human
1. It will speak like a human being.
2. I have registered via my Github account on VAPI website. (https://docs.vapi.ai/sdk/web)
3. Next you need to install library for SDK.
4. The copy paste the public key from the VAPI website under the ORG SETTING option from the Navbar of VAPI's website.
5. First we will Make API endpoints to call the AI Agent to receive some information from the user and feed it in the Gemini. The Gemini will then send the response through the API to the server. For this custom API routes we need ROUTE HANDLERS of NextJS.

## Setup Workflows in VAPI
1. Follow this website to modify and customise workflow. (https://dashboard.vapi.ai/workflows/af6fbd05-f564-433f-9fd5-f999b3301cd6)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
