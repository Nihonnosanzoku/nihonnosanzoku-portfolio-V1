"use server";

import { prisma } from "@/server/config/prisma.config";

export async function getRandomVoice() {
  try {
    const count = await prisma.voice.count();
    if (count === 0) return null;
    
    const skip = Math.floor(Math.random() * count);
    const voice = await prisma.voice.findFirst({
      skip: skip,
    });
    
    return voice;
  } catch (error) {
    console.error("Error fetching random voice:", error);
    return null;
  }
}
