import { useMemo } from 'react';
import * as THREE from 'three';
import useFarmStore from '../../../store/farmStore';

export default function Ground() {
  const { fieldBoundary, layers } = useFarmStore();

  // Create 2D shape for the agricultural field soil bed
  const fieldSoilShape = useMemo(() => {
    if (!fieldBoundary || fieldBoundary.length < 3) return null;
    const shape = new THREE.Shape();
    // [x, z] in 3D maps to [x, -y] in 2D shape on XZ plane
    shape.moveTo(fieldBoundary[0][0], -fieldBoundary[0][1]);
    for (let i = 1; i < fieldBoundary.length; i++) {
      shape.lineTo(fieldBoundary[i][0], -fieldBoundary[i][1]);
    }
    shape.closePath();
    return shape;
  }, [fieldBoundary]);

  return (
    <group>
      {/* 1. Surrounding Landscape / Pasture */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[1200, 1200, 32, 32]} />
        <meshStandardMaterial
          color="#122015"
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>

      {/* 2. Tilled Agricultural Soil Bed (Inside Field Boundary) */}
      {layers.soil && fieldSoilShape && (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <shapeGeometry args={[fieldSoilShape]} />
          <meshStandardMaterial
            color="#2a1e16" // Rich dark agricultural loam
            roughness={0.94}
            metalness={0.02}
          />
        </mesh>
      )}

      {/* 3. Outer farm access road / border transition ring */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[180, 260, 32]} />
        <meshStandardMaterial
          color="#192419"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}
