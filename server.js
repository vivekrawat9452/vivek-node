const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, set, get } = require('firebase/database');
const firebaseConfig = require('./firebaseConfig');
const fetch = require('node-fetch');

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

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    const users = snapshot.val() || {};
    res.status(200).json({
      message: 'Users retrieved successfully',
      users: users
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// New endpoint to test calling the user API internally
app.get('/api/test-add-user/:name/:age/:gender', async (req, res) => {
  try {
    const { name, age, gender } = req.params;
    const response = await fetch(`http://localhost:${port}/api/users/${name}/${age}/${gender}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.status(200).json({
      message: 'Internal API call successful',
      result: data
    });
  } catch (error) {
    console.error('Error in internal API call:', error);
    res.status(500).json({ error: 'Failed to call user API internally' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 