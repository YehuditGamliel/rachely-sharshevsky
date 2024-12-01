import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';
import glassesForShow2 from './glassesForShow.jpg';

const WebcamGlassesOverlay = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [glassesImg, setGlassesImg] = useState(null);

  // Load models for face detection and landmarks
  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log('Loading models...');
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        ]);
        console.log('Models loaded successfully');
      } catch (error) {
        console.error('Error loading models:', error);
        alert('Error loading face detection models.');
      }
    };
    loadModels();
  }, []);

  // Load the glasses image
  useEffect(() => {
    const imgElement = new Image();
    imgElement.src = glassesForShow2;
    imgElement.crossOrigin = 'anonymous';

    imgElement.onload = () => {
      console.log('Glasses image loaded');
      setGlassesImg(imgElement);
    };

    imgElement.onerror = (error) => {
      console.error('Error loading glasses image:', error);
    };
  }, []);

  // Draw glasses on the detected face
  const drawGlasses = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      glassesImg
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      try {
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        if (detection) {
          const ctx = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const resizedDetections = faceapi.resizeResults(detection, {
            width: video.videoWidth,
            height: video.videoHeight,
          });

          const landmarks = resizedDetections.landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const leftEyeCenter = {
            x: (leftEye[0].x + leftEye[3].x) / 2,
            y: (leftEye[0].y + leftEye[3].y) / 2,
          };
          const rightEyeCenter = {
            x: (rightEye[0].x + rightEye[3].x) / 2,
            y: (rightEye[0].y + rightEye[3].y) / 2,
          };

          const glassesWidth = Math.hypot(
            rightEyeCenter.x - leftEyeCenter.x,
            rightEyeCenter.y - leftEyeCenter.y
          ) * 2.5;
          const glassesHeight =
            (glassesImg.height / glassesImg.width) * glassesWidth;

          // Adjust the glasses' position for lower and slightly to the right
          const glassesX = leftEyeCenter.x - glassesWidth / 2 + 15; // ימינה
          const glassesY =
            leftEyeCenter.y - glassesHeight / 1.0 + 10 + 20; // הורדת 40 פיקסלים (2 ס"מ)

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            glassesImg,
            glassesX,
            glassesY,
            glassesWidth,
            glassesHeight
          );
          console.log('Glasses drawn');
        } else {
          console.log('No face detected');
        }
      } catch (error) {
        console.error('Error during face detection:', error);
      }
    }
  };

  // Set interval to keep drawing glasses
  useEffect(() => {
    const interval = setInterval(() => {
      drawGlasses();
    }, 100);
    return () => clearInterval(interval);
  }, [glassesImg]);

  return (
    <div style={{ position: 'relative', width: 440, height: 180 }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={{ width: 440, height: 180, facingMode: 'user' }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />
    </div>
  );
};

export default WebcamGlassesOverlay;
