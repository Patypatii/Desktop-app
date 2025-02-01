// utils.js

/**
 * Simulate skipping the ID verification step on the page.
 * @param {import('playwright').Page} page - Playwright page object
 */
async function skipIDVerification(page) {
    try {
      // You can find the selector for the "skip" or "next" button on the ID verification page
      const skipButton = await page.$('button#skip-id-verification'); // Update with actual selector
      if (skipButton) {
        await skipButton.click();
        console.log("ID verification skipped.");
      } else {
        console.log("ID verification skip button not found.");
      }
    } catch (error) {
      console.error("Error skipping ID verification:", error);
    }
  }
  
  /**
   * Simulate skipping the image capture step on the page.
   * @param {import('playwright').Page} page - Playwright page object
   */
  async function skipImageCapture(page) {
    try {
      // Similar to skipIDVerification, find the image capture skip button
      const skipButton = await page.$('button#skip-image-capture'); // Update with actual selector
      if (skipButton) {
        await skipButton.click();
        console.log("Image capture skipped.");
      } else {
        console.log("Image capture skip button not found.");
      }
    } catch (error) {
      console.error("Error skipping image capture:", error);
    }
  }
  
  /**
   * Simulate skipping the facial recognition step on the page.
   * @param {import('playwright').Page} page - Playwright page object
   */
  async function skipFacialRecognition(page) {
    try {
      // Find the facial recognition skip button
      const skipButton = await page.$('button#skip-facial-recognition'); // Update with actual selector
      if (skipButton) {
        await skipButton.click();
        console.log("Facial recognition skipped.");
      } else {
        console.log("Facial recognition skip button not found.");
      }
    } catch (error) {
      console.error("Error skipping facial recognition:", error);
    }
  }
  
  // Export the utility functions
  module.exports = {
    skipIDVerification,
    skipImageCapture,
    skipFacialRecognition
  };
  