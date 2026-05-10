import { PrismaClient } from '../prisma/generated/client';

const prisma = new PrismaClient();

async function main() {
  const voices = [
    { sound: "/sounds/Yürü-git.opus", url: "https://www.netflix.com/", label: "Site Kötü olmuş" },
    { sound: "/sounds/Ulan-sende-Bi-sg.opus", url: "https://youtube.com", label: "beni Siteye al" },
    { sound: "/sounds/Yürü-git-bana-Muhsin_i-bul-bana.opus", url: "https://www.instagram.com/alliikoksall/", label: "Kimi bulayım sana?" }
  ];

  for (const voice of voices) {
    await prisma.voice.create({
      data: voice,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
