import { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import { Terminal } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import Switch from "../components/ui/switch";
import Button from "../components/ui/button";
import { motion } from "framer-motion";

export default function BypassTool() {
  const [idVerification, setIdVerification] = useState(false);
  const [imageCapture, setImageCapture] = useState(false);
  const [logs, setLogs] = useState(["System Initialized..."]);

  // Function to toggle feature and send request to the backend
  const toggleFeature = async (feature, setFeature, featureState) => {
    try {
      // Toggle the feature state
      setFeature((prev) => {
        const newState = !prev;
        // Log the toggle action
        setLogs((prevLogs) => [
          ...prevLogs,
          `${feature} set to ${newState ? "OFF" : "ON"}`,
        ]);
        return newState;
      });

      // Send the bypass request to the backend
      await axios.post("http://localhost:5000/", {
        feature,
        bypassValue: featureState,
      });
    } catch (error) {
      console.error("Error toggling feature:", error);
      setLogs((prevLogs) => [
        ...prevLogs,
        `Error toggling ${feature}: ${error.message}`,
      ]);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Bypass <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-400 bg-clip-text text-transparent">Tool</span></h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center space-x-6"
      >
        <Card className="w-96 h-full p-4">
          <CardContent className="flex flex-col h-58">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">ID Verification</span>
              <Switch
                checked={!idVerification}
                onCheckedChange={() => toggleFeature("ID Verification", setIdVerification, false)}
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Image Verification</span>
              <Switch
                checked={!imageCapture}
                onCheckedChange={() => toggleFeature("Image Verification", setImageCapture, false)}
              />
            </div>
            <div className="mt-auto">
              <Button onClick={() => setLogs(["System Reset..."])} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 w-full">
                Reset Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-96 h-full p-4">
          <CardContent>
            <h2 className="font-semibold mb-2 flex items-center text-xl">
              <Terminal className="mr-2" /> Logs
            </h2>
            <div className="h-40 flex-1 overflow-auto bg-gray-900 text-white p-2 rounded-lg text-sm">
              {logs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
