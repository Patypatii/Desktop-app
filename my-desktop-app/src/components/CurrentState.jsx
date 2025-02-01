import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const CurrentState = () => {
  const [currentState, setCurrentState] = useState("idle");
  const [pageUrl, setPageUrl] = useState(""); // Store the page URL for the iframe
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Function to establish WebSocket connection
    const connectWebSocket = () => {
      const socketConnection = new WebSocket("ws://localhost:5001");

      // Log when connection is successfully established
      socketConnection.onopen = () => {
        console.log("WebSocket connected");
      };

      // Handle any errors that occur
      socketConnection.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      // Handle messages from the WebSocket server
      socketConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.state !== currentState) {
          setCurrentState(data.state); // Update state if it changes
        }
      };

      // Handle WebSocket closure and attempt reconnection
      socketConnection.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect...");
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      };

      setSocket(socketConnection);
    };

    // Fetch current page URL from backend with error handling
    const fetchCurrentPageUrl = async () => {
      try {
        const response = await fetch("/current-page-url");

        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const contentType = response.headers.get("Content-Type");

        // Ensure the response is in JSON format
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setPageUrl(data.url);
        } else {
          // Handle the case where the response is not JSON
          throw new Error("Received non-JSON response");
        }
      } catch (error) {
        console.error("Failed to fetch page URL:", error.message);
        setPageUrl(""); // Optionally, clear the URL if an error occurs
      }
    };

    // Initial fetch of URL and WebSocket connection
    fetchCurrentPageUrl();
    connectWebSocket();

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="w-[58%] mx-auto mt-2 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
        <span>Current State:</span>
        <span className="font-bold text-blue-600">{currentState}</span>
      </h2>
      <div className="flex items-center justify-center mt-4">
        {currentState === "active" ? (
          <button className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-400 focus:outline-none">
            Start Bypass
          </button>
        ) : (
          <p className="text-gray-500">Waiting to start bypass...</p>
        )}
      </div>

      {/* Embed the current page in an iframe */}
      <div className="mt-4">
        {pageUrl ? (
          <iframe
            src={pageUrl}  // Dynamically set the URL from the backend
            width="100%"
            height="500"
            title="Outlier AI Page"
            className="border-2 border-gray-300"
          ></iframe>
        ) : (
          <div className="flex justify-center">
            <Loader className="animate-spin mx-auto text-blue-500 gap-2" size={30} />
            <p>Loading page...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentState;
