const prisma = require('../src/config/db');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('Seeding initial Smart Mines database records...');

  // 1. Create Default Users (Admin, Reviewer, Student)
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@smartmines.com' },
    update: {
      name: 'Project Lead Admin',
      username: 'admin',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      name: 'Project Lead Admin',
      username: 'admin',
      email: 'admin@smartmines.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  const reviewer = await prisma.user.upsert({
    where: { email: 'reviewer@smartmines.com' },
    update: {
      name: 'Project Reviewer',
      username: 'reviewer',
      passwordHash: hashedPassword,
      role: 'REVIEWER',
    },
    create: {
      name: 'Project Reviewer',
      username: 'reviewer',
      email: 'reviewer@smartmines.com',
      passwordHash: hashedPassword,
      role: 'REVIEWER',
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@smartmines.com' },
    update: {
      name: 'Lead Developer Student',
      username: 'student',
      passwordHash: hashedPassword,
      role: 'STUDENT',
    },
    create: {
      name: 'Lead Developer Student',
      username: 'student',
      email: 'student@smartmines.com',
      passwordHash: hashedPassword,
      role: 'STUDENT',
    },
  });

  // 2. Initialize Project Modules for Progress Tracking
  const modules = [
    { moduleName: 'ANPR Module', progress: 70 },
    { moduleName: 'Billing Module', progress: 55 },
    { moduleName: 'Weighbridge Module', progress: 80 },
    { moduleName: 'Reports Module', progress: 40 },
  ];

  for (const mod of modules) {
    await prisma.projectModule.upsert({
      where: { moduleName: mod.moduleName },
      update: { progress: mod.progress },
      create: mod,
    });
  }

  // 3. Add Sample GitHub Repository
  await prisma.githubRepo.createMany({
    data: [
      {
        name: 'smart-mines-portal',
        description: 'Cloud-based MERN stack student project portal repository.',
        url: 'https://github.com/smart-mines/student-portal',
        teamMember: 'Lead Developer Student',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeding completed successfully! 🌱');
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });