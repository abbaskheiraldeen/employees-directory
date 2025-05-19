// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  // Fetch 20 random users
  const { data } = await axios.get(
    'https://randomuser.me/api/?results=100&nat=us',
  );

  const users = data.results;
  console.log(users);

  // Map them to your Employee model structure
  const employees = users.map((user: any) => ({
    firstName: user.name.first,
    lastName: user.name.last,
    email: user.email,
    department: getRandomDepartment(),
    title: getRandomTitle(),
    location: `${user.location.city}, ${user.location.state}`,
  }));

  await prisma.employee.createMany({
    data: employees,
  });

  console.log('Seeded employees from randomuser.me!');
}

// Helper functions to mock department and title
function getRandomDepartment() {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Product'];
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomTitle() {
  const titles = ['Manager', 'Director', 'Engineer', 'Designer', 'Developer'];
  return titles[Math.floor(Math.random() * titles.length)];
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
