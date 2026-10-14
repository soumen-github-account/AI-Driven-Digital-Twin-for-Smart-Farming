import { Html } from '@react-three/drei';
import useFarmStore from '../../../store/farmStore';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function SensorMarkers() {
  const { sensors, selectedSensorId, setSelectedSensorId } = useFarmStore();
  const ringRef = useRef();

  // Subtle floating pulse for selected sensor beacon
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      ringRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
      ringRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group>
      {sensors.map((sensor) => {
        const isSelected = sensor.id === selectedSensorId;
        const isWarning = sensor.status === 'warning';
        const isOffline = sensor.status === 'offline';

        const headColor = isOffline
          ? '#ef4444'
          : isWarning
          ? '#f59e0b'
          : '#14b8a6';

        return (
          <group
            key={sensor.id}
            position={[sensor.position[0], 0, sensor.position[2]]}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSensorId(sensor.id);
            }}
          >
            {/* Ground Anchor Pad */}
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.7, 0.9, 0.1, 16]} />
              <meshStandardMaterial color="#334155" roughness={0.7} metalness={0.4} />
            </mesh>

            {/* Weather Station Mast */}
            <mesh position={[0, 2.8, 0]}>
              <cylinderGeometry args={[0.1, 0.14, 5.5, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Solar panel attachment */}
            <mesh position={[0.4, 4.2, 0]} rotation={[0.4, 0, -0.5]}>
              <boxGeometry args={[0.7, 0.05, 0.5]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Sensor Housing Head */}
            <mesh position={[0, 5.6, 0]}>
              <sphereGeometry args={[0.55, 16, 16]} />
              <meshStandardMaterial
                color={headColor}
                emissive={headColor}
                emissiveIntensity={isSelected ? 0.8 : 0.25}
              />
            </mesh>

            {/* Highlight Reticle / Beacon when sensor is selected */}
            {isSelected && (
              <group position={[0, 0.2, 0]}>
                {/* Expanding ground pulse ring */}
                <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[2.0, 2.5, 32]} />
                  <meshBasicMaterial
                    color="#38bdf8"
                    transparent
                    opacity={0.8}
                    side={2}
                  />
                </mesh>

                {/* Vertical target beam indicator */}
                <mesh position={[0, 3.5, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 7, 8]} />
                  <meshBasicMaterial
                    color="#38bdf8"
                    transparent
                    opacity={0.4}
                  />
                </mesh>
              </group>
            )}

            {/* 3D Floating Telemetry Label */}
            <Html
              position={[0, 6.7, 0]}
              center
              distanceFactor={85}
              zIndexRange={[10, 50]}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSensorId(sensor.id);
                }}
                className={`px-2.5 py-1 rounded-md text-xs cursor-pointer shadow-xl transition-all duration-200 backdrop-blur-md border ${
                  isSelected
                    ? 'bg-sky-950/90 border-sky-400 text-sky-200 ring-2 ring-sky-500/50 scale-105'
                    : isWarning
                    ? 'bg-amber-950/80 border-amber-500/60 text-amber-200 hover:bg-amber-900/90'
                    : 'bg-zinc-900/85 border-zinc-700/60 text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOffline
                        ? 'bg-red-500'
                        : isWarning
                        ? 'bg-amber-400 animate-ping'
                        : 'bg-teal-400'
                    }`}
                  />
                  <span className="font-semibold">{sensor.id}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="font-mono font-medium">
                    {sensor.value.toFixed(1)} {sensor.unit}
                  </span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
