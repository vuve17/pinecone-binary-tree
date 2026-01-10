🌳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌳
        Binary Tree Manager
🌳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌳

📌 **Overview**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A full-stack application for visualizing and managing hierarchical data structures using **Binary Tree logic**.

🧩 **Tech Stack**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• ⚡ Next.js  
• 🐘 PostgreSQL  
• 🔷 Prisma  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Getting Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Follow the steps below to get the project running on your local machine.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧰 1. Prerequisites
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before you begin, make sure you have the following installed:

✔ Node.js *(v18 or higher recommended)*  
✔ Docker Desktop *(required for PostgreSQL https://www.docker.com/products/docker-desktop/)*  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ 2. Installation & Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Open your terminal in the project root directory and run the commands below **in order**.



```bash

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 A. Install Dependencies
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


# Install project dependencies
npm install

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐘 B. Start the Database
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


# Start PostgreSQL using Docker Compose (detached mode)
docker-compose up -d

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧬 C. Database Setup (Prisma)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



# Create database tables
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed database with initial nodes
npx prisma db seed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶️ 3. Running the Project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


# Start the development server
npm run dev


# OPTIONALY - Start the prisma studio
npx prisma studio

```

👉 The application will be available at: http://localhost:3000
👉 The prisma studio will be available at: http://localhost:5555