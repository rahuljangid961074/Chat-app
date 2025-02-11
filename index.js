require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // Download from Firebase Console
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

// User Signup
app.post("/signup", async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const user = await admin.auth().createUser({ email, password, displayName });
    return res.status(201).json({ uid: user.uid, email: user.email, displayName });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Store Chat Messages
app.post("/messages", async (req, res) => {
  const { sender, message } = req.body;

  try {
    const newMessage = await db.collection("messages").add({ sender, message, timestamp: admin.firestore.FieldValue.serverTimestamp() });
    return res.status(201).json({ id: newMessage.id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Fetch Messages
app.get("/messages", async (req, res) => {
  try {
    const snapshot = await db.collection("messages").orderBy("timestamp", "asc").get();
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
