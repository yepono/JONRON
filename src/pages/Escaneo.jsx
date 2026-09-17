import { useEffect, useRef, useState } from 'react';
import camera from '../assets/img/camera.png';
import estadio from '../assets/img/estadio.jpg';
import campo from '../assets/img/campo.webp';
import lockers from '../assets/img/lockers.jpg';
import butacas from '../assets/img/butacas.webp';
import Header from '../components/layout/Header';
import targetFile from '../assets/models/jersey/jersey.mind?url';
import modelFile from '../assets/models/jersey/jersey.glb?url';
import 'aframe';
import 'mind-ar-custom-nocanvas/dist/mindar-image-aframe.prod.js';


const backgroundOptions = [
  { value: 'estadio', label: 'Estadio', image: estadio },
  { value: 'campo', label: 'Campo', image: campo },
  { value: 'lockers', label: 'Banca', image: lockers },
  { value: 'butacas', label: 'Butacas', image: butacas },
];

export default function Escaneo() {
  const videoRef = useRef(null);
  const sceneRef = useRef(null);
  const targetRef = useRef(null);
  const modelRef = useRef(null);
  const [cameraError, setCameraError] = useState('');
  const [scanned, setScanned] = useState(false);
  const [effect, setEffect] = useState('');
  const [background, setBackground] = useState('');
  const [animationStopped, setAnimationStopped] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [scanKey, setScanKey] = useState(0);

  const selectedBackground = backgroundOptions.find((option) => option.value === background);

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

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return undefined;

    const handleTargetFound = () => setScanned(true);
    target.addEventListener('targetFound', handleTargetFound);
    return () => target.removeEventListener('targetFound', handleTargetFound);
  }, [scanKey]);

  useEffect(() => {
    const scene = sceneRef.current;
    const system = scene?.systems?.['mindar-image-system'];
    if (!system) return undefined;

    const restart = () => {
      try {
        system.stop();
      } catch (error) {
        console.warn('MindAR stop error', error);
      }

      window.setTimeout(() => {
        try {
          system.start();
        } catch (error) {
          console.warn('MindAR start error', error);
        }
      }, 150);
    };

    restart();
    return () => window.clearTimeout(restart);
  }, [scanKey]);

  const stopAnimation = () => {
    if (animationStopped) {
      setAnimationStopped(false);
      if (modelRef.current) {
        modelRef.current.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear');
      }
      return;
    }

    setAnimationStopped(true);
    if (modelRef.current) {
      modelRef.current.removeAttribute('animation');
      modelRef.current.setAttribute('rotation', '0 0 0');
    }
  };

  const resetMindARTracking = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    try {
      const system = scene.systems?.['mindar-image-system'];
      system?.stop();
    } catch (error) {
      console.warn('MindAR stop reset error', error);
    }

    scene.removeAttribute('mindar-image');

    window.setTimeout(() => {
      scene.setAttribute(
        'mindar-image',
        `imageTargetSrc: ${targetFile}; autoStart: true; uiLoading: no; uiScanning: no; uiError: no; maxTrack: 1`,
      );
    }, 50);
  };

  const scanAnotherCard = () => {
    setScanned(false);
    setEffect('');
    setBackground('');
    setAnimationStopped(false);
    setScanKey((current) => current + 1);
    resetMindARTracking();
  };

const capturePhoto = async () => {
  setIsFlashing(true);
  window.setTimeout(() => setIsFlashing(false), 180);

  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const sceneCanvas = sceneRef.current?.querySelector('canvas');
    const video = videoRef.current;
    if (!sceneCanvas || !video) return;

    let backgroundImage = null;
    if (selectedBackground) {
      backgroundImage = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = selectedBackground.image;
      });
    }

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    if (backgroundImage) {
      const scale = Math.max(width / backgroundImage.width, height / backgroundImage.height);
      const drawWidth = backgroundImage.width * scale;
      const drawHeight = backgroundImage.height * scale;
      context.drawImage(
        backgroundImage,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    } else {
      context.drawImage(video, 0, 0, width, height);
    }

    context.drawImage(sceneCanvas, 0, 0, width, height);


    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'jonron-screenshot.png';
    link.click();
  } catch (error) {
    console.error('Screenshot failed', error);
  }
};

  const particleSymbols =
    effect === 'confetti'
      ? ['◆', '■', '●', '▲']
      : effect === 'estrellas'
        ? ['✦', '✧', '★']
        : effect === 'lluvia'
          ? ['😭', '😢', '😞']
          : ['🔥'];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        aria-label="Vista de la cámara"
        className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity ${selectedBackground ? 'opacity-0' : 'opacity-100'}`}
      />

      {selectedBackground && (
        <img
          src={selectedBackground.image}
          alt={selectedBackground.label}
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        />
      )}

      <a-scene
        key={scanKey}
        ref={sceneRef}
        mindar-image={`imageTargetSrc: ${targetFile}; autoStart: true; uiLoading: no; uiScanning: no; uiError: no; maxTrack: 1`}
        embedded=""
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights; preserveDrawingBuffer: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ background: 'transparent' }}
        className="absolute inset-0 z-10 h-full w-full"
      >
        <a-assets>
          <a-asset-item id="jersey-model" src={modelFile} />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false" />
        <a-entity ref={targetRef} mindar-image-target="targetIndex: 0">
          <a-gltf-model
            ref={modelRef}
            src="#jersey-model"
            position="0 0 0"
            rotation="0 0 0"
            scale="1.8 1.8 1.8"
            animation={scanned && !animationStopped ? 'property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear' : undefined}
          />
        </a-entity>
      </a-scene>

      {scanned && effect && (
        <div
          className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${
            effect === 'fuego' ? 'text-orange-400' : effect === 'lluvia' ? 'text-sky-200' : 'text-yellow-300'
          }`}
          aria-hidden="true"
        >
          {Array.from({ length: 28 }, (_, index) => (
            <span
              key={`${effect}-${index}`}
              className="particle absolute top-[-8%] text-lg font-black"
              style={{
                left: `${(index * 37) % 100}%`,
                animationDelay: `${(index % 9) * -0.7}s`,
                animationDuration: `${3.2 + (index % 5) * 0.45}s`,
                color:
                  effect === 'confetti'
                    ? ['#f43f5e', '#facc15', '#22c55e', '#38bdf8'][index % 4]
                    : undefined,
              }}
            >
              {particleSymbols[index % particleSymbols.length]}
            </span>
          ))}
        </div>
      )}

      <div className="pointer-events-none relative z-10 min-h-full">
        <Header />
        {cameraError && (
          <p className="mx-4 mt-4 rounded-lg bg-black/70 p-3 text-center text-sm text-white">
            {cameraError}
          </p>
        )}
      </div>

      {scanned && (
        <>
          <div className="fixed left-3 right-3 top-10 z-50 flex justify-between gap-3">
            <select
              aria-label="Elegir fondo"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
              className="pointer-events-auto w-36 rounded-lg border border-white/60 bg-black/70 p-2 text-xs font-bold text-white shadow-lg outline-none"
            >
              <option value="">Fondo</option>
              {backgroundOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              aria-label="Elegir efecto"
              value={effect}
              onChange={(event) => setEffect(event.target.value)}
              className="pointer-events-auto w-36 rounded-lg border border-white/60 bg-black/70 p-2 text-xs font-bold text-white shadow-lg outline-none"
            >
              <option value="">Efectos</option>
              <option value="confetti">Confetti</option>
              <option value="estrellas">Estrellas</option>
              <option value="lluvia">Triste</option>
              <option value="fuego">Fuego</option>
            </select>
          </div>

          <div className="fixed bottom-40 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 gap-2">
            <button
              type="button"
              onClick={stopAnimation}
              className="flex-1 rounded-lg bg-white px-2 py-3 text-xs font-black text-[#0047AB] shadow-lg"
            >
              {animationStopped ? 'Animar' : 'Detener animación'}
            </button>
            <button
              type="button"
              onClick={scanAnotherCard}
              className="flex-1 rounded-lg bg-[#0047AB] px-2 py-3 text-xs font-black text-white shadow-lg"
            >
              Escanea otra carta
            </button>
          </div>
        </>
      )}

      <button
        type="button"
        aria-label="Escanear"
        onClick={capturePhoto}
        className="fixed bottom-18 left-1/2 z-50 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-[#0047AB] text-2xl text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <img src={camera} alt="" className="h-14 w-14" />
      </button>

      {isFlashing && <div className="pointer-events-none fixed inset-0 z-[60] bg-white" aria-hidden="true" />}
    </div>
  );
}