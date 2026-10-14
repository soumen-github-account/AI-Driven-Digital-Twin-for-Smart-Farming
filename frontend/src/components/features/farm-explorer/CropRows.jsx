import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import useFarmStore from '../../../store/farmStore';
import { isPointInPolygon, getPolygonBounds } from '../../../utils/geometry';
import { pseudoNoise2D } from '../../../simulation/simulationEngine';
import { createCropGeometry } from './cropGeometry';

export default function CropRows() {
  const { fieldBoundary, cropType, layers } = useFarmStore();
  const plantsMeshRef = useRef();

  // Procedural crop geometry matching cropType
  const cropGeometry = useMemo(() => {
    return createCropGeometry(cropType);
  }, [cropType]);

  // Layout crop rows and plants clipped strictly to polygon boundary
  const { plantData, rowLines } = useMemo(() => {
    if (!fieldBoundary || fieldBoundary.length === 0) {
      return { plantData: { count: 0, positions: [], scales: [], rotations: [] }, rowLines: [] };
    }

    const bounds = getPolygonBounds(fieldBoundary);
    const rowSpacing = cropType === 'Wheat' ? 2.5 : 3.6; // Row spacing in meters
    const plantSpacing = cropType === 'Wheat' ? 1.2 : cropType === 'Soybean' ? 1.4 : 1.8; // In-row spacing
    const boundarySafetyMargin = 2.5; // Clip plants strictly inside polygon

    const positions = [];
    const scales = [];
    const rotations = [];
    const rows = [];

    for (let x = bounds.minX + 2; x < bounds.maxX - 2; x += rowSpacing) {
      let rowStart = null;
      let rowEnd = null;

      for (let z = bounds.minZ + 2; z < bounds.maxZ - 2; z += plantSpacing) {
        // Strict polygon containment with margin
        if (isPointInPolygon(x, z, fieldBoundary, boundarySafetyMargin)) {
          // Terrain surface elevation at (x, z)
          const terrainY = 0.05 + Math.sin(x * 0.02) * Math.cos(z * 0.02) * 0.3;

          positions.push([x, terrainY, z]);

          // Deterministic organic variation per plant (NO Math.random)
          const heightVariance = 0.88 + pseudoNoise2D(x, z, 77) * 0.28;
          const girthVariance = 0.92 + pseudoNoise2D(x, z, 99) * 0.16;
          scales.push([girthVariance, heightVariance, girthVariance]);

          const yaw = pseudoNoise2D(x, z, 33) * Math.PI * 2;
          const tiltX = (pseudoNoise2D(x, z, 44) - 0.5) * 0.08;
          const tiltZ = (pseudoNoise2D(x, z, 55) - 0.5) * 0.08;
          rotations.push([tiltX, yaw, tiltZ]);

          if (!rowStart) rowStart = [x, terrainY, z];
          rowEnd = [x, terrainY, z];
        }
      }

      if (rowStart && rowEnd && Math.abs(rowEnd[2] - rowStart[2]) > 5) {
        rows.push([rowStart, rowEnd]);
      }
    }

    return {
      plantData: {
        count: positions.length,
        positions,
        scales,
        rotations,
      },
      rowLines: rows,
    };
  }, [fieldBoundary, cropType]);

  // Update instanced matrices and natural coloring
  useEffect(() => {
    if (!plantsMeshRef.current || plantData.count === 0) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    plantData.positions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      const s = plantData.scales[i];
      dummy.scale.set(s[0], s[1], s[2]);
      const r = plantData.rotations[i];
      dummy.rotation.set(r[0], r[1], r[2]);
      dummy.updateMatrix();

      plantsMeshRef.current.setMatrixAt(i, dummy.matrix);

      // Natural deterministic color tinting
      const colorNoise = pseudoNoise2D(pos[0], pos[2], 123);
      if (cropType === 'Wheat') {
        // Golden ripe hues with subtle greener patches
        color.setHSL(0.12 + colorNoise * 0.03, 0.65, 0.42 + colorNoise * 0.1);
      } else if (cropType === 'Soybean') {
        // Bushy vibrant green
        color.setHSL(0.33 + colorNoise * 0.04, 0.72, 0.32 + colorNoise * 0.08);
      } else {
        // Corn: lush agricultural deep green with slight healthy variation
        color.setHSL(0.32 + colorNoise * 0.035, 0.74, 0.34 + colorNoise * 0.08);
      }
      plantsMeshRef.current.setColorAt(i, color);
    });

    plantsMeshRef.current.instanceMatrix.needsUpdate = true;
    if (plantsMeshRef.current.instanceColor) {
      plantsMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [plantData, cropType]);

  return (
    <group>
      {/* 1. Crop Plants Layer */}
      {layers.plants && plantData.count > 0 && (
        <instancedMesh
          ref={plantsMeshRef}
          args={[cropGeometry, null, plantData.count]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            roughness={0.65}
            metalness={0.08}
            side={THREE.DoubleSide}
          />
        </instancedMesh>
      )}

      {/* 2. Crop Row Furrows / Soil Beds Layer */}
      {layers.rows && rowLines.length > 0 && (
        <group>
          {rowLines.map(([start, end], idx) => {
            const length = end[2] - start[2];
            const midZ = (start[2] + end[2]) / 2;
            const x = start[0];
            const y = 0.03;

            return (
              <mesh
                key={idx}
                position={[x, y, midZ]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
              >
                {/* Thin furrow soil ridge along each crop row */}
                <planeGeometry args={[1.2, length]} />
                <meshStandardMaterial
                  color="#261b13"
                  roughness={0.92}
                  depthWrite={false}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
}
