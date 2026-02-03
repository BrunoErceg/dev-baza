import { PrismaClient, WebsiteStatus } from "@prisma/client";
import { faker } from "@faker-js/faker"; // Ako ne želiš faker, koristi obični string

const prisma = new PrismaClient();

async function main() {
  // 1. Prvo nađi ili kreiraj jednog korisnika koji će biti vlasnik
  const user = await prisma.user.upsert({
    where: { email: "test-user@dev-baza.hr" },
    update: {},
    create: {
      name: "Test Developer",
      email: "test-user@dev-baza.hr",
    },
  });

  console.log("Generiram 30 stranica...");

  const websites = [];

  for (let i = 1; i <= 30; i++) {
    websites.push({
      name: `Projekt ${faker.commerce.productName()} ${i}`,
      url: faker.internet.url(),
      userId: user.id,
      imageUrl: `https://picsum.photos/seed/${i + 123}/600/400`, // Nasumične slike
      status: WebsiteStatus.APPROVED,
      views: faker.number.int({ min: 10, max: 5000 }),
      createdAt: faker.date.past(),
    });
  }

  // 2. Bulk insert u bazu
  await prisma.website.createMany({
    data: websites,
  });

  console.log("✅ 30 stranica je uspješno dodano!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
