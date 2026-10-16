import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import camera from '../assets/img/camera.png';
import estadio from '../assets/img/estadio.jpg';
import campo from '../assets/img/campo.webp';
import lockers from '../assets/img/lockers.jpg';
import butacas from '../assets/img/butacas.webp';
import Header from '../components/layout/Header';
import modelData from '../data/models.json';
import americanLeagueTeams from '../data/americanLeagueTeams.json';
import targetFile from '../assets/models/targets.mind?url';
import { markCardScanned } from '../services/authService';
import 'aframe';
import 'mind-ar-custom-nocanvas/dist/mindar-image-aframe.prod.js';

const modelFiles = import.meta.glob('../assets/models/*/*.glb', {
  eager: true,
  import: 'default',
  query: '?url',
});

const targetEntries = modelData
  .filter(({ targetIndex }) => Number.isInteger(targetIndex))
  .sort((first, second) => first.targetIndex - second.targetIndex)
  .map(({ team, targetIndex, folder, model }) => ({
    team,
    targetIndex,
    modelUrl: modelFiles[`../assets/models/${folder}/${model}`],
  }));

const modelAssets = targetEntries.filter(({ modelUrl }, index, entries) =>
  modelUrl && entries.findIndex((entry) => entry.modelUrl === modelUrl) === index,
);
const americanLeagueTeamIds = new Set(americanLeagueTeams.map(({ id }) => id));

const mindArOptions = (targetUrl) =>
  `imageTargetSrc: ${targetUrl}; autoStart: true; uiLoading: no; uiScanning: no; uiError: no; maxTrack: 1`;


const backgroundOptions = [
  { value: 'estadio', label: 'Estadio', image: estadio },
  { value: 'campo', label: 'Campo', image: campo },
  { value: 'lockers', label: 'Banca', image: lockers },
  { value: 'butacas', label: 'Butacas', image: butacas },
];

export default function Escaneo() {
  const scanRootRef = useRef(null);
  const videoRef = useRef(null);
  const sceneRef = useRef(null);
  const targetRefs = useRef([]);
  const modelRefs = useRef([]);
  const [cameraError, setCameraError] = useState('');
  const [scanMessage, setScanMessage] = useState('');
  const [scanned, setScanned] = useState(false);
  const [detectedTargetIndex, setDetectedTargetIndex] = useState(null);
  const [effect, setEffect] = useState('');
  const [background, setBackground] = useState('');
  const [animationStopped, setAnimationStopped] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [scanKey, setScanKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const selectedBackground = backgroundOptions.find((option) => option.value === background);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === scanRootRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (isFullscreen && !document.fullscreenElement) {
      setIsFullscreen(false);
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
      return;
    }

    const scanRoot = scanRootRef.current;
    const requestFullscreen = scanRoot?.requestFullscreen || scanRoot?.webkitRequestFullscreen;
    if (!requestFullscreen) {
      setIsFullscreen((fullscreen) => !fullscreen);
      return;
    }

    try {
      await requestFullscreen.call(scanRoot);
    } catch {
      setIsFullscreen(true);
    }
  };

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
    const listeners = targetRefs.current.map((target, index) => {
      if (!target) return null;

      const handleTargetFound = () => {
        setDetectedTargetIndex(index);
        setScanned(true);
        const card = modelData.find((entry) => entry.targetIndex === index);
        if (card) {
          if (!americanLeagueTeamIds.has(card.team)) {
            setScanMessage('Esta carta no pertenece a la Liga Americana y no se agregó a tu colección.');
          } else {
            const savedCard = markCardScanned({ id: card.team, team: card.team });
            setScanMessage(savedCard ? '' : 'Inicia sesión para guardar esta carta en tu perfil.');
          }
        }
      };
      target.addEventListener('targetFound', handleTargetFound);
      return () => target.removeEventListener('targetFound', handleTargetFound);
    });

    return () => listeners.forEach((removeListener) => removeListener?.());
  }, [scanKey]);

  useEffect(() => {
    modelRefs.current.forEach((model, index) => {
      if (model) model.object3D.visible = detectedTargetIndex === index;
    });
  }, [detectedTargetIndex]);

  useEffect(() => {
    const scene = sceneRef.current;
    const system = scene?.systems?.['mindar-image-system'];
    if (!system) return undefined;

    const handleArError = (event) => {
      console.error('MindAR error', event.detail);
      setCameraError('No se pudo iniciar el reconocimiento de marcadores.');
    };
    scene.addEventListener('arError', handleArError);

    let restartTimeout;
    const restart = () => {
      try {
        system.stop();
      } catch (error) {
        console.warn('MindAR stop error', error);
      }

      restartTimeout = window.setTimeout(() => {
        try {
          system.start();
        } catch (error) {
          console.warn('MindAR start error', error);
        }
      }, 150);
    };

    restart();
    return () => {
      window.clearTimeout(restartTimeout);
      scene.removeEventListener('arError', handleArError);
    };
  }, [scanKey]);

  const stopAnimation = () => {
    if (animationStopped) {
      setAnimationStopped(false);
      if (detectedTargetIndex !== null && modelRefs.current[detectedTargetIndex]) {
        modelRefs.current[detectedTargetIndex].setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear');
      }
      return;
    }

    setAnimationStopped(true);
    if (detectedTargetIndex !== null && modelRefs.current[detectedTargetIndex]) {
      modelRefs.current[detectedTargetIndex].removeAttribute('animation');
      modelRefs.current[detectedTargetIndex].setAttribute('rotation', '0 0 0');
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
        mindArOptions(targetFile),
      );
    }, 50);
  };

  const scanAnotherCard = () => {
    setScanned(false);
    setDetectedTargetIndex(null);
    setScanMessage('');
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
    <div
      ref={scanRootRef}
      className={isFullscreen
        ? 'fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-black'
        : 'absolute inset-0 z-0 overflow-hidden bg-black'}
    >
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
        mindar-image={mindArOptions(targetFile)}
          embedded=""
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights; preserveDrawingBuffer: true"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          style={{ background: 'transparent' }}
          className="absolute inset-0 z-10 h-full w-full"
        >
        <a-assets>
          {modelAssets.map(({ team, modelUrl }) => (
            <a-asset-item key={team} id={`${team}-model`} src={modelUrl} />
          ))}
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false" />
        {targetEntries.map(({ team, targetIndex, modelUrl }) => (
          <a-entity
            key={`${team}-${targetIndex}`}
            ref={(element) => {
              targetRefs.current[targetIndex] = element;
            }}
            mindar-image-target={`targetIndex: ${targetIndex}`}
          >
            <a-gltf-model
              ref={(element) => {
                modelRefs.current[targetIndex] = element;
              }}
              src={modelUrl}
              position="0 0 0"
              rotation="0 0 0"
              scale="1.8 1.8 1.8"
              visible={detectedTargetIndex === targetIndex}
              animation={
                scanned && detectedTargetIndex === targetIndex && !animationStopped
                  ? 'property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear'
                  : undefined
              }
            />
          </a-entity>
        ))}
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
        {scanMessage && (
          <p className="mx-4 mt-2 rounded-lg bg-black/70 p-3 text-center text-sm text-white">
            {scanMessage}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Poner escaneo AR en pantalla completa'}
        className="fixed right-3 top-[calc(env(safe-area-inset-top)+4.5rem)] z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-slate-950/80 text-white shadow-lg backdrop-blur-sm"
      >
        {isFullscreen ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
      </button>

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
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-1/2 z-50 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-[#0047AB] text-2xl text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <img src={camera} alt="" className="h-14 w-14" />
      </button>

      {isFlashing && <div className="pointer-events-none fixed inset-0 z-[60] bg-white" aria-hidden="true" />}
    </div>
  );
}