// server.js

const express = require("express");
const cors = require("cors");
const webSocketService = require("./webSocketService"); // Import the WebSocket service
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to handle JSON requests
app.use(express.json());

// Start the backend server and initialize browser
(async () => {
  await webSocketService.initializeBrowser(); // Initialize browser with WebSocket service
  app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
  });
})();

// Trigger bypass automation when needed
app.post("/start-bypass", async (req, res) => {
  try {
    const success = await webSocketService.simulateUserInteraction(); // Simulate user interaction
    if (success) {
      res.json({ success: true, message: "Bypass successful." });
    } else {
      res.status(500).json({ success: false, message: "Bypass failed due to an error." });
    }
  } catch (error) {
    console.error("Error in /start-bypass route:", error);
    res.status(500).json({ success: false, message: "Bypass failed." });
  }
});

// Endpoint to get current state
app.get("/current-state", (req, res) => {
  try {
    res.json({ success: true, state: webSocketService.getCurrentState() });
  } catch (error) {
    console.error("Error in /current-state route:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve current state." });
  }
});

// Endpoint to get the current page URL (for frontend iframe display)
app.get("/current-page-url", (req, res) => {
  try {
    const pageUrl = "https://www.outlier.ai/verify-id"; // Update this dynamically if needed
    res.json({ success: true, url: pageUrl });
  } catch (error) {
    console.error("Error in /current-page-url route:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve page URL." });
  }
});
