import { useEffect, useRef, useState } from 'react';
import camera from '../assets/img/camera.png';
import Header from '../components/layout/Header';
import targetFile from '../assets/models/jersey/jersey.mind?url';
import modelFile from '../assets/models/jersey/jersey.glb?url';
import 'aframe';
import 'mind-ar-custom-nocanvas/dist/mindar-image-aframe.prod.js';

export default function Escaneo() {
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState('');

  useEffect(() => {
    let stream;

    navigator.mediaDevices?.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    }).then((cameraStream) => {
      stream = cameraStream;
      if (videoRef.current) videoRef.current.srcObject = cameraStream;
    }).catch(() => {
      setCameraError('No se pudo acceder a la cámara. Revisa los permisos del navegador.');
    });

    return () => stream?.getTracks().forEach((track) => track.stop());
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        aria-label="Vista de la cámara"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <a-scene
        mindar-image={`imageTargetSrc: ${targetFile}; autoStart: true; uiLoading: no; uiScanning: no; uiError: no; maxTrack: 1`}
        embedded=""
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ background: 'transparent' }}
        className="absolute inset-0 z-10 h-full w-full"
      >
        <a-assets>
          <a-asset-item id="jersey-model" src={modelFile} />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false" />
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            src="#jersey-model"
            position="0 0 0"
            rotation="0 0 0"
            scale="1 1 1"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear"
          />
        </a-entity>
      </a-scene>

      <div className="pointer-events-none relative z-10 min-h-full">
        <Header />
        {cameraError && (
          <p className="mx-4 mt-4 rounded-lg bg-black/70 p-3 text-center text-sm text-white">
            {cameraError}
          </p>
        )}
      </div>
      <button
        type="button"
        aria-label="Escanear"
        className="fixed bottom-20 left-1/2 z-50 flex h-30 w-30 -translate-x-1/2 items-center justify-center rounded-full bg-[#0047AB] text-2xl text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <img src={camera} alt="" className="h-20 w-20" />
      </button>
    </div>
  );
}