# Step-by-Step Implementation Guide: Two-Tier Storage for Assessment Tool

This guide outlines how to implement a two-tier storage strategy for your assessment tool using localStorage for immediate client-side persistence and MongoDB for server-side storage.

## Phase 1: Setup Development Environment

### Step 1: Set Up MongoDB
```bash
# Install MongoDB Community Edition (Ubuntu example)
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 2: Set Up Backend Framework
```bash
# Create a new Node.js project
mkdir assessment-tool-backend
cd assessment-tool-backend
npm init -y

# Install necessary packages
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon

# Create basic directory structure
mkdir controllers models routes config
```

## Phase 2: Create Database Schema

### Step 3: Define MongoDB Schema
Create `models/User.js`:

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
```

Create `models/Assessment.js`:

```javascript
const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'My Assessment'
  },
  data: {
    type: Object,  // Store the entire JSON structure here
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
```

## Phase 3: Create API Endpoints

### Step 4: Configure Express App
Create `server.js`:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));  // Increased limit for large assessment data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/assessments', require('./routes/assessments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Step 5: Create Authentication Routes
Create `routes/users.js`:

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      email,
      password
    });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Create and return JWT
    const payload = {
      user: {
        id: user.id
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Create and return JWT
    const payload = {
      user: {
        id: user.id
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
```

### Step 6: Create Assessment Routes
Create `routes/assessments.js`:

```javascript
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assessment = require('../models/Assessment');

// Get all assessments for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user.id })
      .select('title lastUpdated');
    res.json(assessments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get specific assessment
router.get('/:id', auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create new assessment
router.post('/', auth, async (req, res) => {
  try {
    const { title, data } = req.body;
    
    const assessment = new Assessment({
      userId: req.user.id,
      title: title || 'My Assessment',
      data
    });
    
    await assessment.save();
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update assessment
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, data } = req.body;
    
    // Find and update assessment
    const assessment = await Assessment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { 
        title: title || 'My Assessment',
        data,
        lastUpdated: Date.now()
      },
      { new: true }
    );
    
    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete assessment
router.delete('/:id', auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    
    res.json({ msg: 'Assessment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

### Step 7: Create Auth Middleware
Create `middleware/auth.js`:

```javascript
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
```

## Phase 4: Modify Frontend to Use API

### Step 8: Update Frontend Authentication
Create `js/auth.js`:

```javascript
// Handle user registration
function registerUser(email, password) {
  return fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    return data;
  });
}

// Handle user login
function loginUser(email, password) {
  return fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    return data;
  });
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

// Log out user
function logoutUser() {
  localStorage.removeItem('token');
}
```

### Step 9: Update Frontend Assessment Handling
Create `js/assessment-api.js`:

```javascript
// Get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Get all assessments for user
function getAssessments() {
  return fetch('http://localhost:5000/api/assessments', {
    headers: {
      'x-auth-token': getToken()
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  });
}

// Get specific assessment
function getAssessment(id) {
  return fetch(`http://localhost:5000/api/assessments/${id}`, {
    headers: {
      'x-auth-token': getToken()
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  });
}

// Create new assessment
function createAssessment(data, title = 'My Assessment') {
  return fetch('http://localhost:5000/api/assessments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken()
    },
    body: JSON.stringify({ data, title })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  });
}

// Update assessment
function updateAssessment(id, data, title) {
  return fetch(`http://localhost:5000/api/assessments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken()
    },
    body: JSON.stringify({ data, title })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  });
}

// Delete assessment
function deleteAssessment(id) {
  return fetch(`http://localhost:5000/api/assessments/${id}`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': getToken()
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  });
}
```

### Step 10: Integrate with Existing Assessment Tool
Modify your existing JS to sync with the server:

```javascript
// Add these functions to your existing assessment tool JS

// Current assessment ID (null for new assessment)
let currentAssessmentId = null;

// Sync data to server (called when data changes)
function syncToServer() {
  // Only sync if user is logged in
  if (!isLoggedIn()) return;
  
  const assessmentData = getAllData(); // Your existing function to get all form data
  
  if (currentAssessmentId) {
    // Update existing assessment
    updateAssessment(currentAssessmentId, assessmentData)
      .then(response => {
        console.log('Assessment synced to server');
      })
      .catch(err => {
        console.error('Error syncing to server:', err);
      });
  } else {
    // Create new assessment
    createAssessment(assessmentData)
      .then(response => {
        currentAssessmentId = response._id;
        console.log('New assessment created on server');
      })
      .catch(err => {
        console.error('Error creating assessment on server:', err);
      });
  }
}

// Load assessment from server
function loadFromServer(id) {
  getAssessment(id)
    .then(assessment => {
      currentAssessmentId = assessment._id;
      loadAllData(assessment.data); // Your existing function to populate forms
    })
    .catch(err => {
      console.error('Error loading assessment:', err);
    });
}

// Add auth UI elements
function addAuthUI() {
  const authDiv = document.createElement('div');
  authDiv.className = 'auth-container';
  authDiv.innerHTML = `
    <div class="auth-status">
      <span id="auth-status-text">Not logged in</span>
      <button id="auth-button">Login</button>
    </div>
    <div id="auth-modal" class="auth-modal">
      <div class="auth-modal-content">
        <span class="close">&times;</span>
        <div class="auth-tabs">
          <button class="auth-tab-button active" data-tab="login">Login</button>
          <button class="auth-tab-button" data-tab="register">Register</button>
        </div>
        <div id="login-tab" class="auth-tab-content active">
          <form id="login-form">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" required>
            </div>
            <div class="form-group">
              <label for="login-password">Password</label>
              <input type="password" id="login-password" required>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
        <div id="register-tab" class="auth-tab-content">
          <form id="register-form">
            <div class="form-group">
              <label for="register-email">Email</label>
              <input type="email" id="register-email" required>
            </div>
            <div class="form-group">
              <label for="register-password">Password</label>
              <input type="password" id="register-password" required minlength="6">
            </div>
            <div class="form-group">
              <label for="register-password-confirm">Confirm Password</label>
              <input type="password" id="register-password-confirm" required minlength="6">
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(authDiv);
  
  // Add event listeners (implementation details omitted)
}

// Add assessment list UI when logged in
function addAssessmentListUI() {
  const listDiv = document.createElement('div');
  listDiv.className = 'assessment-list-container';
  listDiv.innerHTML = `
    <h3>Your Assessments</h3>
    <button id="new-assessment-button">New Assessment</button>
    <ul id="assessment-list"></ul>
  `;
  
  document.querySelector('.main-container').prepend(listDiv);
  
  // Load assessment list
  loadAssessmentList();
  
  // Add event listeners (implementation details omitted)
}

// Load assessment list from server
function loadAssessmentList() {
  const listElement = document.getElementById('assessment-list');
  listElement.innerHTML = '<li>Loading...</li>';
  
  getAssessments()
    .then(assessments => {
      if (assessments.length === 0) {
        listElement.innerHTML = '<li>No assessments found</li>';
        return;
      }
      
      listElement.innerHTML = '';
      assessments.forEach(assessment => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${assessment.title}</span>
          <span>${new Date(assessment.lastUpdated).toLocaleDateString()}</span>
          <button class="load-btn" data-id="${assessment._id}">Load</button>
          <button class="delete-btn" data-id="${assessment._id}">Delete</button>
        `;
        listElement.appendChild(li);
      });
      
      // Add event listeners for load and delete buttons
    })
    .catch(err => {
      listElement.innerHTML = '<li>Error loading assessments</li>';
      console.error('Error loading assessment list:', err);
    });
}

// Initialize auth
function initAuth() {
  if (isLoggedIn()) {
    // Show logged in UI
    document.getElementById('auth-status-text').textContent = 'Logged In';
    document.getElementById('auth-button').textContent = 'Logout';
    addAssessmentListUI();
  }
}

// Setup auto-sync (call this during initialization)
function setupAutoSync() {
  // Sync data whenever it changes (integrate with your existing save functions)
  const originalSaveFunction = saveToLocalStorage; // Your existing save function
  
  // Override save function to also sync to server
  window.saveToLocalStorage = function() {
    // Call original function
    originalSaveFunction.apply(this, arguments);
    
    // Then sync to server
    syncToServer();
  };
}

// Call during initialization
function init() {
  // Initialize your original code
  initOriginalCode();
  
  // Add auth UI and initialize
  addAuthUI();
  initAuth();
  
  // Setup auto-sync
  setupAutoSync();
}
```

## Phase 5: Add Authentication UI and CSS

### Step 11: Add CSS for Auth UI
Add to your existing CSS:

```css
.auth-container {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.auth-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1001;
}

.auth-modal-content {
  position: relative;
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.auth-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.auth-tab-button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.auth-tab-button.active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
}

.auth-tab-content {
  display: none;
}

.auth-tab-content.active {
  display: block;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.assessment-list-container {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 6px;
}

#assessment-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

#assessment-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

#assessment-list li:last-child {
  border-bottom: none;
}

.load-btn, .delete-btn {
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.load-btn {
  background-color: #007bff;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}
```

### Step 12: Create .env File
Create `.env` in your backend folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/assessment-tool
JWT_SECRET=your_jwt_secret_here
```

## Phase 6: Production Deployment

### Step 13: Prepare for Production
Update the backend `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 14: Deploy to Production
For a simple deployment:

1. Set up MongoDB Atlas account for production database
2. Deploy backend to Heroku, Railway, or similar platform
3. Update frontend code to use production API endpoints
4. Deploy frontend to Netlify, Vercel, or similar platform

## Additional Considerations

1. **Security**
   - Implement rate limiting to prevent abuse
   - Add HTTPS for all connections
   - Consider adding CSRF protection
   - Add validation for all input fields

2. **User Experience**
   - Add loading indicators for server operations
   - Implement error handling with user-friendly messages
   - Add confirmation dialogs for destructive actions

3. **Features to Consider Adding**
   - Password reset functionality
   - Assessment sharing capabilities
   - Export assessment as PDF
   - Admin dashboard for analytics

This implementation provides a solid foundation for your assessment tool with both client-side and server-side persistence, user accounts, and synchronization between local and remote storage.