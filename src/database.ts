import { connect, connection } from 'mongoose';

connect(connectionString, connectionOptions)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((e) => {
    console.error('Error connecting to MongoDB Atlas:', e);
    process.exit(1);
  });
