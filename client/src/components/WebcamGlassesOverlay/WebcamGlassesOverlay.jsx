import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const WebcamGlassesOverlay = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const loadModels = async () => {
    try {
      const modelPath = `${window.location.origin}/models`; // נתיב לתיקיית המודלים
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
      await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
      await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
      console.log("Models loaded successfully");
    } catch (error) {
      console.error("Error loading face-api.js models:", error);
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error starting video stream:", err));
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }
    }, 100);
  };

  useEffect(() => {
    const initialize = async () => {
      await loadModels(); // טוען מודלים
      startVideo(); // מתחיל וידאו
    };
    initialize();
  }, []);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        onPlay={handleVideoPlay}
        style={{ position: "relative" }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default WebcamGlassesOverlay;
