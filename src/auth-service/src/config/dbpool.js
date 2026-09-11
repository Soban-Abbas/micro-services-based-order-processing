
const { PrismaClient } = require("@prisma/client");
const {dbConfiguration}=require("./config")
const {PrismaPg}=require('@prisma/adapter-pg')
const adapter = new PrismaPg({ connectionString: dbConfiguration.DATABASE_URL})
exports.prisma = new PrismaClient({ adapter })




