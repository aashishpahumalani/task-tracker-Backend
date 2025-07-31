const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise');


// Create database if it doesn't exist
async function createDatabaseIfNotExists() {
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.dbhostname,
      port: process.env.dbport,
      user: process.env.dbusername,
      password: process.env.dbpassword,
    });
    
    // Check if database exists
    const [databases] = await connection.execute(
      `SHOW DATABASES LIKE '${process.env.database}'`
    );
    console.log(`🔍 Found databases: ${databases}`);
    
    if (databases.length === 0) {
      console.log(`📋 Database '${process.env.database}' does not exist. Creating...`);
      
      // Create database
      await connection.execute(`CREATE DATABASE \`${process.env.database}\``);
      console.log(`✅ Database '${process.env.database}' created successfully`);
    } else {
      console.log(`✅ Database '${process.env.database}' already exists`);
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error checking/creating database:', error);

    console.error('❌ Error checking/creating database:', error.message);
    throw error;
  }
}

// Create tables if they don't exist
async function createTablesIfNotExist(prismaInstance) {
  try {    
    // Try to query the task table
    await prismaInstance.task.findFirst();
    console.log('✅ Tables already exist and are accessible');
  } catch (error) {
    if (error.code === 'P2021' || error.message.includes("doesn't exist")) {
      console.log('📋 Tables do not exist. Creating schema...');
      
      try {
        // Push the schema to create tables
        const { execSync } = require('child_process');        
        execSync('npx prisma db push --accept-data-loss', { 
          stdio: 'inherit',
          cwd: process.cwd()
        });
        
        console.log('✅ Tables created successfully');
      } catch (pushError) {
        console.error('Error creating tables:', pushError.message);
        throw pushError;
      }
    } else {
      // Some other error occurred
      console.error('Error checking tables:', error.message);
      throw error;
    }
  }
}

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Test database connection with auto-creation
async function connectDB() {
  try {
    console.log('🚀 Initializing database connection...');
    
    // Step 1: Create database if it doesn't exist
    await createDatabaseIfNotExists();
    
    // Step 2: Connect to the database
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Step 3: Create tables if they don't exist
    await createTablesIfNotExist(prisma);
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('Access denied')) {
      console.error('💡 Check your database credentials in .env file');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Make sure MySQL server is running');
    } else if (error.message.includes('Unknown database')) {
      console.error('💡 Database creation failed - check permissions');
    }
    
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = { prisma, connectDB };
