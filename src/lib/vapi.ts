import { VapiClient } from "@vapi-ai/server-sdk";

export const vapi = new VapiClient({
  token: process.env.NEXT_PUBLIC_VAPI_API_KEY! as string
});

// // Create an outbound call
// const call = await vapi.calls.create({
//   phoneNumberId: "YOUR_PHONE_NUMBER_ID",
//   customer: { number: "+1234567890" },
//   assistantId: "YOUR_ASSISTANT_ID"
// });

// console.log("Call created:", "id" in call ? call.id : call);
