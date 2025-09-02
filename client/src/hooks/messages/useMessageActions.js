import { useState } from "react";
import { sendMessage } from "./service.js";

export const handleSendMessage = async (message) => {
  console.log("handleSendMessage message");
  if (!message || typeof message !== "object") {
    throw new Error("Message is required and must be an object");
  }

  if (!message.senderId || !message.senderName || !message.teamId) {
    throw new Error("Sender ID, sender name, and team ID are required");
  }

  console.log("handleSendMessage message accepted");

  try {
    console.log("Sending message:", message);
    const response = await sendMessage(message);
    console.log("returning response which is ", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message please try again later.");
  }
};
