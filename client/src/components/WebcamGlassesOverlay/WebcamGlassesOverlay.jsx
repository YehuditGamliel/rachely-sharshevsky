import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';

import logo from '../../img/logo.png';
const WebcamGlassesOverlay = ({img}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [glassesImg, setGlassesImg] = useState(null);

  // Log the loading process step-by-step
  useEffect(() => {
    const loadModels = async () => {
      try {

















        console.log('Loading Tiny Face Detector model...');
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        console.log('Tiny Face Detector Model loaded');
        console.log('Loading Face Landmark 68 model...');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        console.log('Face Landmark Model loaded');

        setInterval(async () => {
          await drawGlasses();
        }, 100);
      } catch (error) {
        console.error('Error loading models:', error);
        alert(`Model loading error: ${error.message}`);
      }
    };

    loadModels();
  }, []);
  // Load glasses image with logging
  useEffect(() => {
    const loadGlassesImage = () => {
      const imgElement = new Image();
      imgElement.src = logo; // Use the imported glasses image
      imgElement.onload = () => {
        console.log('Glasses image loaded');
        setGlassesImg(imgElement);
      };

      imgElement.onerror = (error) => {
        console.error('Error loading glasses image:', error);
        alert(`Glasses image loading error: ${error.message}`);
      };
    };

    loadGlassesImage();
  }, []);












  
  const drawGlasses = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4 && glassesImg) {
      const video = webcamRef.current.video;
  
      try {
        console.log('Attempting to detect faces...');
        const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        
        if (detection) {
          const ctx = canvasRef.current.getContext('2d');
  
          // Process face landmarks
          const landmarks = detection.landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();
  
          // Calculate glasses position and size
          const glassesWidth = Math.abs(rightEye[0].x - leftEye[3].x) * 1.5;
          const glassesHeight = glassesWidth * (glassesImg.height / glassesImg.width);
          const glassesX = leftEye[0].x - glassesWidth * 0.2;
          const glassesY = leftEye[0].y - glassesHeight * 0.4;
  
          // Draw the glasses on the canvas
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(glassesImg, glassesX, glassesY, glassesWidth, glassesHeight);
  
          console.log('Glasses drawn at:', glassesX, glassesY, glassesWidth, glassesHeight);
        } else {
          console.log('No face detected');
        }
      } catch (error) {
        console.error('Error during face detection or drawing glasses:', error);
        alert(`Face detection or drawing error: ${error.message}`);
      }
    }
  };
    return (
    <div style={{position: 'relative', width: 'fit-content' }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width={400}
        height={200}
        videoConstraints={{ width: 440, height: 180, facingMode: 'user' }}
        // style={{ position: 'absolute' }}



      />
             <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        
    </div>
  );
};


export default WebcamGlassesOverlay;