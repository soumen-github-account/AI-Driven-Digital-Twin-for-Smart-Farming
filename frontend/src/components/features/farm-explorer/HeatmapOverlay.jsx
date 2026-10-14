import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import useFarmStore from '../../../store/farmStore';
import useSimulationStore from '../../../store/simulationStore';
import { isPointInPolygon, getPolygonBounds } from '../../../utils/geometry';
import { evaluateSpatialMetric } from '../../../simulation/simulationEngine';
import { Html } from '@react-three/drei';

export default function HeatmapOverlay() {
  const { activeHeatmap, fieldBoundary, selectedZoneId, setSelectedZoneId, sensors } = useFarmStore();
  const { simulationTime } = useSimulationStore();
  const meshRef = useRef();

  const [hoveredCell, setHoveredCell] = useState(null);

  // Extract current environmental values from store
  const simState = useMemo(() => {
    const moistureSensors = sensors.filter(s => s.type === 'soil-moisture');
    const avgMoisture = moistureSensors.length > 0
      ? moistureSensors.reduce((acc, s) => acc + s.value, 0) / moistureSensors.length
      : 42;

    const tempSensors = sensors.filter(s => s.type === 'air-temp' || s.type === 'soil-temperature');
    const currentTemp = tempSensors.length > 0 ? tempSensors[0].value : 23;

    return {
      currentAirTemp: currentTemp,
      avgSoilMoisture: avgMoisture,
      activeIrrigationZones: [],
      simulationTime,
    };
  }, [sensors, simulationTime]);

  // Generate grid cells clipped strictly to polygon
  const { cells, cellSize } = useMemo(() => {
    if (activeHeatmap === 'none' || !fieldBoundary || fieldBoundary.length === 0) {
      return { cells: [], cellSize: 8 };
    }

    const bounds = getPolygonBounds(fieldBoundary);
    const size = 8; // 8m x 8m cells for sharp spatial resolution
    const list = [];

    for (let x = bounds.minX; x < bounds.maxX; x += size) {
      for (let z = bounds.minZ; z < bounds.maxZ; z += size) {
        const cx = x + size / 2;
        const cz = z + size / 2;

        if (isPointInPolygon(cx, cz, fieldBoundary, 0.5)) {
          list.push({
            id: `cell_${Math.round(cx)}_${Math.round(cz)}`,
            x: cx,
            z: cz,
          });
        }
      }
    }

    return { cells: list, cellSize: size };
  }, [activeHeatmap, fieldBoundary]);

  // Color ramp interpolator based on metric and normalized value [0, 1]
  const getColorForMetric = useMemo(() => {
    const c1 = new THREE.Color();
    const c2 = new THREE.Color();
    const result = new THREE.Color();

    return (metric, norm) => {
      const t = Math.max(0, Math.min(1, norm));

      if (metric === 'moisture') {
        // Red-orange (dry) -> Yellow -> Cyan -> Deep Blue (saturated)
        if (t < 0.33) {
          c1.set('#ea580c');
          c2.set('#eab308');
          return result.lerpColors(c1, c2, t / 0.33);
        } else if (t < 0.66) {
          c1.set('#eab308');
          c2.set('#06b6d4');
          return result.lerpColors(c1, c2, (t - 0.33) / 0.33);
        } else {
          c1.set('#06b6d4');
          c2.set('#1d4ed8');
          return result.lerpColors(c1, c2, (t - 0.66) / 0.34);
        }
      } else if (metric === 'temperature') {
        // Cyan (cool) -> Green -> Amber -> Red (hot)
        if (t < 0.33) {
          c1.set('#06b6d4');
          c2.set('#22c55e');
          return result.lerpColors(c1, c2, t / 0.33);
        } else if (t < 0.66) {
          c1.set('#22c55e');
          c2.set('#f59e0b');
          return result.lerpColors(c1, c2, (t - 0.33) / 0.33);
        } else {
          c1.set('#f59e0b');
          c2.set('#ef4444');
          return result.lerpColors(c1, c2, (t - 0.66) / 0.34);
        }
      } else if (metric === 'health') {
        // Brown/bronze (stressed) -> Yellow -> Emerald Green (vigorous)
        if (t < 0.5) {
          c1.set('#b45309');
          c2.set('#eab308');
          return result.lerpColors(c1, c2, t / 0.5);
        } else {
          c1.set('#eab308');
          c2.set('#10b981');
          return result.lerpColors(c1, c2, (t - 0.5) / 0.5);
        }
      } else if (metric === 'yield') {
        // Ochre -> Amber -> Chartreuse -> Emerald
        if (t < 0.5) {
          c1.set('#d97706');
          c2.set('#eab308');
          return result.lerpColors(c1, c2, t / 0.5);
        } else {
          c1.set('#eab308');
          c2.set('#10b981');
          return result.lerpColors(c1, c2, (t - 0.5) / 0.5);
        }
      }

      return result.set('#10b981');
    };
  }, []);

  // Update instanced mesh positions and colors deterministically
  useEffect(() => {
    if (!meshRef.current || cells.length === 0 || activeHeatmap === 'none') return;

    const dummy = new THREE.Object3D();

    cells.forEach((cell, i) => {
      // Hover slightly above soil bed
      dummy.position.set(cell.x, 0.18, cell.z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Evaluate metric strictly deterministically without Math.random()
      const metricResult = evaluateSpatialMetric(activeHeatmap, cell.x, cell.z, simState);
      const color = getColorForMetric(activeHeatmap, metricResult.normalized);
      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [cells, activeHeatmap, simState, getColorForMetric]);

  if (activeHeatmap === 'none' || cells.length === 0) return null;

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[null, null, cells.length]}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.instanceId !== undefined && cells[e.instanceId]) {
            const cell = cells[e.instanceId];
            const data = evaluateSpatialMetric(activeHeatmap, cell.x, cell.z, simState);
            setHoveredCell({ ...cell, ...data });
          }
        }}
        onPointerOut={() => setHoveredCell(null)}
        onClick={(e) => {
          e.stopPropagation();
          if (e.instanceId !== undefined && cells[e.instanceId]) {
            const cell = cells[e.instanceId];
            setSelectedZoneId(cell.id);
          }
        }}
      >
        <planeGeometry args={[cellSize * 0.94, cellSize * 0.94]} />
        <meshBasicMaterial
          transparent
          opacity={0.68}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Floating 3D Hover Tooltip */}
      {hoveredCell && (
        <Html
          position={[hoveredCell.x, 2.5, hoveredCell.z]}
          center
          distanceFactor={90}
        >
          <div className="bg-zinc-950/95 border border-emerald-500/60 rounded-md px-3 py-1.5 shadow-2xl backdrop-blur-md pointer-events-none text-xs whitespace-nowrap">
            <div className="text-zinc-400 font-mono text-[10px]">
              Coord: ({Math.round(hoveredCell.x)}m, {Math.round(hoveredCell.z)}m)
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-semibold text-zinc-100 uppercase tracking-wide text-[11px]">
                {activeHeatmap}:
              </span>
              <span className="font-bold text-emerald-400 text-sm">
                {hoveredCell.display}
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
