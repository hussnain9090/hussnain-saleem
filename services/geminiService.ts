
import { GoogleGenAI } from "@google/genai";
import { Booking, ContactMessage } from '../types';

// IMPORTANT: In a real application, you would not expose the API key on the frontend.
// This is for demonstration purposes only. The key should be handled on a secure backend.
// The environment variable is assumed to be set in the execution environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateBookingMessage = async (booking: Booking): Promise<string> => {
  if (!API_KEY) return "AI service is unavailable. Please configure the API key.";

  const prompt = `
    Generate a professional and friendly confirmation message for a gaming console booking.
    The message should be concise and ready to be sent to the customer.
    Use the following details:
    - Customer Name: ${booking.userName}
    - Console Booked: ${booking.consoleName}
    - Date: ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    - Time Slot: ${booking.timeSlot}
    - Brand Name: Game Fire

    The message should confirm the booking and express excitement. Start with "Dear ${booking.userName}," and end with "See you soon, The Game Fire Team".
    Do not include any placeholders like [Customer Name].
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating booking message:", error);
    return "Failed to generate AI message. Please try again.";
  }
};


export const generateContactReply = async (message: ContactMessage): Promise<string> => {
  if (!API_KEY) return "AI service is unavailable. Please configure the API key.";

  const prompt = `
    Generate a professional, helpful, and empathetic reply to a customer's message for a gaming cafe called "Game Fire".
    The original message is from a customer named ${message.name}.
    Customer's message: "${message.message}"

    Your task is to draft a reply that:
    1. Acknowledges the customer's query.
    2. Provides a helpful and positive response. If you don't know the answer, suggest a way to find it (e.g., "For specific game availability, we recommend calling us directly on the day of your visit.").
    3. Maintains a friendly and professional tone, consistent with the "Game Fire" brand.
    4. Starts with "Hi ${message.name}," and ends with "Best regards, The Game Fire Team".
    
    Do not make up specific details you don't have (like exact game inventory or pricing). Keep the response general but helpful.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating contact reply:", error);
    return "Failed to generate AI reply. Please try again.";
  }
};
