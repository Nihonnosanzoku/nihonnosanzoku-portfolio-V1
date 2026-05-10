import { PrismaClient } from '../prisma/generated/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function migrate() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const files = fs.readdirSync(imagesDir);

  console.log(`Migrating ${files.length} images...`);

  for (const file of files) {
    const url = `/images/${file}`;
    const alt = file.split('.')[0].replace(/-/g, ' ');

    const existing = await (prisma as any).gallery.findFirst({
      where: { url }
    });

    if (!existing) {
      await (prisma as any).gallery.create({
        data: {
          url,
          alt,
          allowedRoles: {
            // By default, make them available to all custom roles if any, 
            // or just leave them public if that's how we set up the filtering.
            // For now, let's just create them.
          }
        }
      });
      console.log(`Added: ${file}`);
    } else {
      console.log(`Skipped (exists): ${file}`);
    }
  }

  console.log('Migration complete!');
}

migrate()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
