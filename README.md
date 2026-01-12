```bash

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
🔵 API Endpoints
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The application utilizes a RESTful API built on Next.js Route Handlers. All endpoints return JSON responses.

## 1. Nodes (Collection)
**Base path:** `/api/nodes`

Used for working with the full nodes collection and building the initial tree structure.

| Method | Endpoint      | Purpose |
|------:|---------------|---------|
| GET   | `/api/nodes`  | Fetches all nodes from the database to initially build the tree structure. |
| POST  | `/api/nodes`  | Creates a new node.


## 2. Individual Node

**Base path:** `/api/nodes/:id`

| Method | Endpoint         | Purpose |
|------:|------------------|---------|
| GET   | `/api/nodes/:id` | Fetches detailed information about a specific node. |
| PATCH | `/api/nodes/:id` | Updates basic node fields (renaming the title). |
| DELETE| `/api/nodes/:id` | Deletes the node and recursively removes its entire sub-tree (`onDelete: Cascade`). |

## 3. Drag & Drop (Grafting)

**Base path:** `/api/nodes/:id/reattach`

| Method | Endpoint                  | Purpose |
|------:|---------------------------|---------|
| PATCH | `/api/nodes/:id/reattach` | Moves a node and its children under a new parent. |


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