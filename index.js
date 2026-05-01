const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();

const testConnection = async () => {
    try {
        await prisma.$connect();
        console.log("DB connection successfully");
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        await prisma.$disconnect();
        console.log("DB closed");
    }
};

testConnection();