const db = require('../config/connection');
const { User } = require('../models');
const seedUsers = require('./seedUsers.json'); 
const createDrop = require('./createDrop'); 

db.once('open', async () => {
  try {
    // Clean the 'Users' collection
    await createDrop('User', 'user');

  await User.create(seedUsers);

    console.log('All done!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
});
