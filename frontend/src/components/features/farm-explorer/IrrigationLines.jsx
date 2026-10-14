import { useMemo } from 'react';
import * as THREE from 'three';
import useFarmStore from '../../../store/farmStore';
import { isPointInPolygon, getPolygonBounds } from '../../../utils/geometry';

export default function IrrigationLines() {
  const { fieldBoundary, layers } = useFarmStore();

  const { manifoldLine, lateralLines } = useMemo(() => {
    if (!fieldBoundary || fieldBoundary.length === 0) {
      return { manifoldLine: [], lateralLines: [] };
    }

    const bounds = getPolygonBounds(fieldBoundary);
    const rowSpacing = 3.6;
    const laterals = [];

    // Header manifold line along the southern edge of the field
    const manifoldZ = bounds.minZ + 4;
    let manifoldMinX = Infinity;
    let manifoldMaxX = -Infinity;

    for (let x = bounds.minX + 2; x < bounds.maxX - 2; x += rowSpacing) {
      let lateralStart = null;
      let lateralEnd = null;

      for (let z = bounds.minZ + 5; z < bounds.maxZ - 2; z += 2) {
        if (isPointInPolygon(x, z, fieldBoundary, 2.0)) {
          if (!lateralStart) lateralStart = [x, 0.12, z];
          lateralEnd = [x, 0.12, z];
        }
      }

      if (lateralStart && lateralEnd && Math.abs(lateralEnd[2] - lateralStart[2]) > 6) {
        laterals.push({
          start: lateralStart,
          end: lateralEnd,
          length: lateralEnd[2] - lateralStart[2],
          midZ: (lateralStart[2] + lateralEnd[2]) / 2,
          x,
        });

        if (x < manifoldMinX) manifoldMinX = x;
        if (x > manifoldMaxX) manifoldMaxX = x;
      }
    }

    return {
      manifoldLine: manifoldMinX < manifoldMaxX ? { minX: manifoldMinX, maxX: manifoldMaxX, z: manifoldZ } : null,
      lateralLines: laterals,
    };
  }, [fieldBoundary]);

  if (!layers.irrigation) return null;

  return (
    <group>
      {/* 1. Main Header Supply Manifold Pipe */}
      {manifoldLine && (
        <group position={[(manifoldLine.minX + manifoldLine.maxX) / 2, 0.25, manifoldLine.z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, manifoldLine.maxX - manifoldLine.minX + 2, 12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.4} metalness={0.5} />
          </mesh>
          {/* Pump / Solenoid Valve Control Station */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.2, 0.8, 1.2]} />
            <meshStandardMaterial color="#0369a1" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
      )}

      {/* 2. Lateral Drip Lines running along crop rows */}
      {lateralLines.map((line, idx) => (
        <group key={idx}>
          {/* Black HDPE Drip Tubing */}
          <mesh
            position={[line.x, 0.08, line.midZ]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.04, 0.04, line.length, 6]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>

          {/* Micro-emitter nodes every 10 meters */}
          {Array.from({ length: Math.floor(line.length / 10) }).map((_, eIdx) => (
            <mesh
              key={eIdx}
              position={[line.x, 0.14, line.start[2] + eIdx * 10 + 5]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#0284c7"
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
