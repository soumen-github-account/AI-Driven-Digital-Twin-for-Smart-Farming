// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky, Grid } from '@react-three/drei';
// import { Suspense, useRef } from 'react';
// import useFarmStore from '../../../store/farmStore';
// import Ground from './Ground';
// import FieldBoundary from './FieldBoundary';
// import CropRows from './CropRows';
// import IrrigationLines from './IrrigationLines';
// import SensorMarkers from './SensorMarkers';
// import HeatmapOverlay from './HeatmapOverlay';
// import { Camera, Compass, RotateCcw, Eye } from 'lucide-react';

// export default function FarmExplorer() {
//   const { layers } = useFarmStore();
//   const controlsRef = useRef();

//   const setView = (type) => {
//     if (!controlsRef.current) return;
//     if (type === 'top') {
//       controlsRef.current.object.position.set(0, 240, 0);
//       controlsRef.current.target.set(0, 0, 0);
//     } else if (type === 'perspective') {
//       controlsRef.current.object.position.set(0, 90, 160);
//       controlsRef.current.target.set(0, 0, 0);
//     } else if (type === 'close') {
//       controlsRef.current.object.position.set(-20, 25, 40);
//       controlsRef.current.target.set(-10, 5, 0);
//     }
//     controlsRef.current.update();
//   };

//   return (
//     <div className="w-full h-full relative bg-zinc-950">
//       <Canvas
//         camera={{ position: [0, 95, 165], fov: 42 }}
//         shadows
//       >
//         <color attach="background" args={['#0b140e']} />

//         <Sky
//           sunPosition={[120, 45, 80]}
//           turbidity={0.08}
//           rayleigh={0.6}
//           mieCoefficient={0.005}
//           mieDirectionalG={0.8}
//         />
//         <ambientLight intensity={0.55} />
//         <directionalLight
//           position={[100, 130, 60]}
//           intensity={1.35}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//           shadow-camera-left={-180}
//           shadow-camera-right={180}
//           shadow-camera-top={180}
//           shadow-camera-bottom={-180}
//         />

//         {layers.grid && (
//           <Grid
//             args={[500, 500]}
//             position={[0, 0.08, 0]}
//             cellColor="#1e3a24"
//             sectionColor="#346840"
//             fadeDistance={320}
//             cellThickness={0.6}
//             sectionThickness={1.2}
//           />
//         )}

//         <Suspense fallback={null}>
//           <Ground />
//           {layers.boundary && <FieldBoundary />}
//           <CropRows />
//           <IrrigationLines />
//           {layers.sensors && <SensorMarkers />}
//           <HeatmapOverlay />
//         </Suspense>

//         <OrbitControls
//           ref={controlsRef}
//           makeDefault
//           minPolarAngle={0.05}
//           maxPolarAngle={Math.PI / 2 - 0.05}
//           minDistance={10}
//           maxDistance={420}
//         />
//       </Canvas>

//       {/* Floating 3D Camera Quick Controls */}
//       <div className="absolute bottom-5 left-5 z-10 flex items-center gap-1.5 bg-zinc-900/85 backdrop-blur-md border border-zinc-800 rounded-lg p-1 shadow-lg text-xs">
//         <button
//           onClick={() => setView('perspective')}
//           className="flex items-center gap-1 px-2.5 py-1.5 rounded text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
//           title="Default Isometric Angle"
//         >
//           <Camera className="w-3.5 h-3.5 text-emerald-400" />
//           <span>Isometric</span>
//         </button>
//         <button
//           onClick={() => setView('top')}
//           className="flex items-center gap-1 px-2.5 py-1.5 rounded text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
//           title="Top-Down Plan View"
//         >
//           <Compass className="w-3.5 h-3.5 text-sky-400" />
//           <span>Top-Down</span>
//         </button>
//         <button
//           onClick={() => setView('close')}
//           className="flex items-center gap-1 px-2.5 py-1.5 rounded text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
//           title="Field Row Detail View"
//         >
//           <Eye className="w-3.5 h-3.5 text-amber-400" />
//           <span>Inspect Rows</span>
//         </button>
//         <div className="w-px h-4 bg-zinc-700 mx-0.5" />
//         <button
//           onClick={() => setView('perspective')}
//           className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
//           title="Reset Camera"
//         >
//           <RotateCcw className="w-3.5 h-3.5" />
//         </button>
//       </div>
//     </div>
//   );
// }


import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Grid } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Camera,
  Compass,
  RotateCcw,
  Eye,
  LoaderCircle,
  AlertCircle,
} from 'lucide-react';

import useFarmStore from '../../../store/farmStore';
import Ground from './Ground';
import FieldBoundary, { getLocalPolygonCoordinates } from './FieldBoundary';
import CropRows from './CropRows';
import IrrigationLines from './IrrigationLines';
import SensorMarkers from './SensorMarkers';
import HeatmapOverlay from './HeatmapOverlay';

const API_BASE = import.meta.env.VITE_API_URL
async function apiGet(path, signal) {
  const token = localStorage.getItem('agritwin_token');

  if (!token) {
    throw new Error('Please log in again to load your Digital Twins.');
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    signal,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }

  return result;
}

function FieldCameraController({ coordinates, controlsRef, viewMode }) {
  const { camera } = useThree();

  const bounds = useMemo(() => {
    if (!coordinates?.length) return null;

    const xs = coordinates.map(([x]) => x);
    const zs = coordinates.map(([, z]) => z);

    return {
      x: (Math.min(...xs) + Math.max(...xs)) / 2,
      z: (Math.min(...zs) + Math.max(...zs)) / 2,
      size: Math.max(
        Math.max(...xs) - Math.min(...xs),
        Math.max(...zs) - Math.min(...zs),
        10
      ),
    };
  }, [coordinates]);

  useEffect(() => {
    if (!bounds) return;

    const { x, z, size } = bounds;
    const controls = controlsRef.current;

    if (!controls) return;

    controls.target.set(x, 0, z);

    if (viewMode === 'top') {
      camera.position.set(x, size * 2, z + 0.01);
    } else if (viewMode === 'close') {
      camera.position.set(x - size * 0.25, size * 0.55, z + size * 0.5);
    } else {
      camera.position.set(x + size * 0.65, size * 0.8, z + size * 0.9);
    }

    camera.near = 0.1;
    camera.far = Math.max(2000, size * 10);
    camera.updateProjectionMatrix();
    controls.update();
  }, [bounds, camera, controlsRef, viewMode]);

  return null;
}

export default function FarmExplorer() {
  const { layers } = useFarmStore();
  const controlsRef = useRef(null);

  const [twins, setTwins] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [digitalTwin, setDigitalTwin] = useState(null);
  const [listLoading, setListLoading] = useState(true);
  const [twinLoading, setTwinLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('perspective');

  // Load the logged-in farmer's Digital Twin list.
  useEffect(() => {
    const controller = new AbortController();

    async function loadTwins() {
      setListLoading(true);
      setError('');

      try {
        const result = await apiGet('/digital-twins/my-digital-twins', controller.signal);
        const items = Array.isArray(result.digitalTwins)
          ? result.digitalTwins
          : [];

        setTwins(items);

        if (items.length > 0) {
          setSelectedFieldId((current) =>
            items.some((item) => item.fieldId === current)
              ? current
              : items[0].fieldId
          );
        } else {
          setSelectedFieldId('');
          setDigitalTwin(null);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load Digital Twins.');
        }
      } finally {
        if (!controller.signal.aborted) setListLoading(false);
      }
    }

    loadTwins();

    return () => controller.abort();
  }, []);

  // Fetch full saved geometry whenever the selected field changes.
  useEffect(() => {
    if (!selectedFieldId) {
      setDigitalTwin(null);
      return;
    }

    const controller = new AbortController();

    async function loadSelectedTwin() {
      setTwinLoading(true);
      setError('');
      setDigitalTwin(null);

      try {
        const result = await apiGet(
          `/digital-twins/field/${encodeURIComponent(selectedFieldId)}`,
          controller.signal
        );

        if (!result.digitalTwin) {
          throw new Error('The API did not return a Digital Twin.');
        }

        setDigitalTwin(result.digitalTwin);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load the selected field.');
        }
      } finally {
        if (!controller.signal.aborted) setTwinLoading(false);
      }
    }

    loadSelectedTwin();

    return () => controller.abort();
  }, [selectedFieldId]);

  const geometry = digitalTwin?.geometryJson ?? null;

  const fieldCoordinates = useMemo(
    () =>
      getLocalPolygonCoordinates(
        geometry,
        digitalTwin?.localCoordinates
      ),
    [geometry, digitalTwin?.localCoordinates]
  );

  const hasGeometry = fieldCoordinates.length >= 3;

  const setView = (mode) => {
    setViewMode(mode);
    controlsRef.current?.update();
  };

  const selectedListItem = twins.find(
    (item) => item.fieldId === selectedFieldId
  );

  return (
    <div className="relative h-full min-h-0 w-full bg-zinc-950">
      <Canvas camera={{ position: [0, 95, 165], fov: 42 }} shadows>
        <color attach="background" args={['#0b140e']} />

        <Sky
          sunPosition={[120, 45, 80]}
          turbidity={0.08}
          rayleigh={0.6}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />

        <ambientLight intensity={0.55} />
        <directionalLight
          position={[100, 130, 60]}
          intensity={1.35}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-180}
          shadow-camera-right={180}
          shadow-camera-top={180}
          shadow-camera-bottom={-180}
        />

        {layers?.grid && (
          <Grid
            args={[500, 500]}
            position={[0, 0.03, 0]}
            cellColor="#1e3a24"
            sectionColor="#346840"
            fadeDistance={320}
            cellThickness={0.6}
            sectionThickness={1.2}
          />
        )}

        <Suspense fallback={null}>
          <Ground />

          {hasGeometry && layers?.boundary && (
            <FieldBoundary
              key={digitalTwin.id}
              coordinates={fieldCoordinates}
            />
          )}

          {hasGeometry && <CropRows />}
          {hasGeometry && <IrrigationLines />}
          {hasGeometry && layers?.sensors && <SensorMarkers />}
          {hasGeometry && <HeatmapOverlay />}

          <FieldCameraController
            coordinates={fieldCoordinates}
            controlsRef={controlsRef}
            viewMode={viewMode}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          minPolarAngle={0.05}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={2}
          maxDistance={2000}
        />
      </Canvas>

      {/* Field selector and status */}
      <div className="absolute left-4 top-4 z-20 w-[min(360px,calc(100%-2rem))] space-y-2">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900/95 p-3 shadow-xl backdrop-blur">
          <label
            htmlFor="digital-twin-select"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-400"
          >
            Select field
          </label>

          <select
            id="digital-twin-select"
            value={selectedFieldId}
            onChange={(event) => setSelectedFieldId(event.target.value)}
            disabled={listLoading || twins.length === 0}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500 disabled:opacity-60"
          >
            {listLoading && <option value="">Loading fields...</option>}

            {!listLoading && twins.length === 0 && (
              <option value="">No Digital Twins available</option>
            )}

            {twins.map((twin) => (
              <option key={twin.id} value={twin.fieldId}>
                {twin.name} — {twin.field?.name || twin.fieldId}
              </option>
            ))}
          </select>

          {twinLoading && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-300">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Loading selected field geometry...
            </div>
          )}

          {error && (
            <div className="mt-3 flex items-start gap-2 text-xs text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!listLoading && !twinLoading && !error && hasGeometry && (
            <div className="mt-3 text-xs text-emerald-300">
              Geometry loaded · {fieldCoordinates.length} boundary points
            </div>
          )}
        </div>

        {digitalTwin && hasGeometry && (
          <div className="rounded-lg border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-300">
            <div className="font-semibold text-white">{digitalTwin.name}</div>
            <div className="mt-1">
              Crop: {digitalTwin.crop || digitalTwin.field?.crop || 'Not specified'}
            </div>
            <div>
              Area: {digitalTwin.area ?? '—'} {digitalTwin.areaUnit || 'sqm'}
            </div>
            <div>Farm: {digitalTwin.farm?.name || '—'}</div>
          </div>
        )}

        {!listLoading && !twinLoading && !error && digitalTwin && !hasGeometry && (
          <div className="rounded-lg border border-amber-700/60 bg-zinc-900/95 p-3 text-xs text-amber-300">
            This Digital Twin has no valid polygon geometry. Check geometryJson and localCoordinates in the API response.
          </div>
        )}
      </div>

      {/* Camera controls */}
      <div className="absolute bottom-5 left-4 z-10 flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 p-1 text-xs shadow-lg">
        <button
          onClick={() => setView('perspective')}
          className="flex items-center gap-1 rounded px-2 py-1.5 text-zinc-300 hover:bg-zinc-800"
          title="Isometric view"
        >
          <Camera className="h-3.5 w-3.5 text-emerald-400" />
          Isometric
        </button>

        <button
          onClick={() => setView('top')}
          className="flex items-center gap-1 rounded px-2 py-1.5 text-zinc-300 hover:bg-zinc-800"
          title="Top-down view"
        >
          <Compass className="h-3.5 w-3.5 text-sky-400" />
          Top-down
        </button>

        <button
          onClick={() => setView('close')}
          className="flex items-center gap-1 rounded px-2 py-1.5 text-zinc-300 hover:bg-zinc-800"
          title="Inspect view"
        >
          <Eye className="h-3.5 w-3.5 text-amber-400" />
          Inspect
        </button>

        <button
          onClick={() => setView('perspective')}
          className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800"
          title="Reset camera"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
