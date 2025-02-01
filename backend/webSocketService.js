// webSocketService.js

const { chromium } = require("playwright");
const WebSocket = require("ws");
const { skipIDVerification, skipImageCapture, skipFacialRecognition } = require("./utils"); // Import utils functions

let currentState = "idle"; // Track whether the user is active or idle
let browser;
let wss;

// Function to set up WebSocket server
function setupWebSocket() {
  wss = new WebSocket.Server({ port: 5001 });
  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket.");
    ws.send(JSON.stringify({ state: currentState })); // Initial state sent to frontend

    // Update the state on the frontend when it changes
    setInterval(() => {
      ws.send(JSON.stringify({ state: currentState }));
    }, 1000); // Send updates every second
  });

  console.log("WebSocket server listening on ws://localhost:5001");
}

// Function to simulate user interaction using browser context
async function simulateUserInteraction() {
  try {
    const context = await browser.newContext(); // Create a new browser context for isolation
    const page = await context.newPage(); // Create a new page within the context
    await page.goto("https://www.outlier.ai");

    currentState = "active"; // Set user state to active once they visit the page

    // Simulate user interactions like verification and bypassing
    await skipIDVerification(page);
    await skipImageCapture(page);
    await skipFacialRecognition(page);

    currentState = "idle"; 
    await context.close(); 
    
    return true;  
  } catch (error) {
    console.error("Error in simulateUserInteraction:", error);
    return false; // Return failure if an error occurs
  }
}

// Initialize the browser for Playwright
async function initializeBrowser() {
  browser = await chromium.launch({ headless: true }); // Launch browser instance for contexts
  setupWebSocket(); // Initialize WebSocket server
}

module.exports = {
  simulateUserInteraction,
  initializeBrowser,
  getCurrentState: () => currentState,
  getWebSocketServer: () => wss
};
