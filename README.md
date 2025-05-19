# Employees Directory

This repository contains a full-stack employee management application with:

- **Client:** Next.js (React) application
- **Server:** NestJS backend API with Prisma ORM and seeding support
- **Database:** Prisma ORM and Sqlite database
- **Other tools:** React query, Axios, Rsuite, Tailwindcss, react hot toast, tanstack react table, ESLint and more

The project structure is:

employees-directory/
├── app/
│ ├── client/ (Next.js frontend)
│ └── server/ (NestJS backend)
├── package.json (root)

## Prerequisites

- Node.js (>=16 recommended)
- npm (or yarn) installed globally

## Setup Instructions

1. **Install dependencies**

Open your terminal and run these commands to install packages in each folder:

### At the root of the repo

npm install

### Then in client directory

cd app/client
npm install

### Then in server directory

cd ../server
npm install

### If you want to use the seeding feature To populate the database with 100 random employees from randomuser.me, run in the app/server directory:

npm run seed

### Run development servers concurrently

From the root directory, start both client and server concurrently by running:
npm run dev

The client (Next.js) will be running at http://localhost:3000
The server (NestJS) will be running at http://localhost:8000

To open Prisma Studio and explore your database visually, run the following in the app/server folder:
npx prisma studio

### Environment variables

Make sure you have the following environment variables set appropriately:
NEXT_PUBLIC_API_URL="http://localhost:8000"
