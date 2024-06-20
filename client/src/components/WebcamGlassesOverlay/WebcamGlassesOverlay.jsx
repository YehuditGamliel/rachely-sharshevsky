import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';

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
    const imgElement = new Image();
console.log(img)
    imgElement.src = img;
    console.log(imgElement)
     imgElement.crossOrigin = 'anonymous'
    // img.src = '/without.png';
     // Adjust path to your glasses image
    imgElement.onload = () => {
      console.log('Glasses image loaded');
      setGlassesImg(imgElement);
    };
    imgElement.onerror = (error) => {
      console.error('Error loading glasses image:', error);
      //alert(`Glasses image loading error: ${error.message}`);
    };

  }, []);



  

  const drawGlasses = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4 && glassesImg) {
      const video = webcamRef.current.video;
      try {
        console.log('Attempting to detect faces...');
        const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        if (detection) {
          const ctx = canvasRef.current.getContext('2d');
          canvasRef.current.width = video.videoWidth;
          canvasRef.current.height = video.videoHeight;

          faceapi.matchDimensions(canvasRef.current, video);
          const resizedDetection = faceapi.resizeResults(detection, {
            width: video.videoWidth,
            height: video.videoHeight,
          });

          const landmarks = resizedDetection.landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const leftEyeCenter = [leftEye[0].x, leftEye[0].y];
          const rightEyeCenter = [rightEye[3].x, rightEye[3].y];

          const glassesWidth = Math.hypot(leftEyeCenter[0] - rightEyeCenter[0], leftEyeCenter[1] - rightEyeCenter[1]) * 2.5;
          const glassesHeight = (glassesImg.height / glassesImg.width) * glassesWidth;
          const glassesX = leftEyeCenter[0] - glassesWidth / 2;
          const glassesY = leftEyeCenter[1] - glassesHeight / 2;

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