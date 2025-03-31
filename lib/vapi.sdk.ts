import Vapi from '@vapi-ai/web'

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
//Putting ! mark means that it does actually existis in our environemnt and no undefined capture will be made by typescript.


