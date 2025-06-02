const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, set, get } = require('firebase/database');
const firebaseConfig = require('./firebaseConfig');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js Server!');
});

// API endpoint to add user and get all users
app.post('/api/users/:name/:age/:gender', async (req, res) => {
  try {
    const { name, age, gender } = req.params;
    
    // Save user to Firebase Realtime Database
    const usersRef = ref(db, 'users');
    const newUserRef = push(usersRef);
    await set(newUserRef, {
      details: {
        name,
        age: parseInt(age),
        gender
      }
    });
    
    // Get all users from database
    const snapshot = await get(usersRef);
    const users = snapshot.val() || {};
    
    res.status(200).json({
      message: 'User added successfully',
      userId: newUserRef.key,
      allUsers: users
    });
  } catch (error) {
    console.error('Error handling user data:', error);
    res.status(500).json({ error: 'Failed to handle user data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 