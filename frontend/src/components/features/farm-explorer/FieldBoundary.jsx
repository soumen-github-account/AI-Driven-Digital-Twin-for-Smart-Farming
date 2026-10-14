// import { useMemo } from 'react';
// import * as THREE from 'three';
// import { Line } from '@react-three/drei';
// import useFarmStore from '../../../store/farmStore';

// export default function FieldBoundary() {
//   const { fieldBoundary } = useFarmStore();

//   const points = useMemo(() => {
//     if (!fieldBoundary || fieldBoundary.length === 0) return [];
    
//     // Convert 2D coordinates [x, z] to 3D [x, y, z] and close the loop
//     const pts = fieldBoundary.map(p => new THREE.Vector3(p[0], 0.5, p[1]));
//     pts.push(new THREE.Vector3(fieldBoundary[0][0], 0.5, fieldBoundary[0][1]));
//     return pts;
//   }, [fieldBoundary]);

//   if (points.length === 0) return null;

//   return (
//     <group>
//       <Line 
//         points={points} 
//         color="#34d399" 
//         lineWidth={3} 
//         dashed={true}
//         dashSize={5}
//         gapSize={2}
//       />
//       {/* Semi-transparent field fill */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
//         <shapeGeometry args={[new THREE.Shape(fieldBoundary.map(p => new THREE.Vector2(p[0], -p[1])))]} />
//         <meshBasicMaterial color="#34d399" opacity={0.05} transparent side={THREE.DoubleSide} />
//       </mesh>
//     </group>
//   );
// }


import { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

// Accept JSON strings or already-parsed JSON objects.
function parseJson(value) {
  if (typeof value !== 'string') return value;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

// Supports your stored format:
// [[x, z], [x, z], ...]
// Also supports GeoJSON Polygon coordinates:
// [[[x, y], [x, y], ...]]
export function getLocalPolygonCoordinates(geometryJson, localCoordinates) {
  const geometry = parseJson(geometryJson);
  const fallback = parseJson(localCoordinates);

  let coordinates =
    geometry?.coordinates ??
    geometry?.geometry?.coordinates ??
    fallback;

  if (!Array.isArray(coordinates)) return [];

  // Unwrap standard GeoJSON Polygon's outer ring.
  if (
    Array.isArray(coordinates[0]) &&
    Array.isArray(coordinates[0][0])
  ) {
    coordinates = coordinates[0];
  }

  const points = coordinates
    .filter(
      (point) =>
        Array.isArray(point) &&
        point.length >= 2 &&
        Number.isFinite(Number(point[0])) &&
        Number.isFinite(Number(point[1]))
    )
    .map(([x, z]) => [Number(x), Number(z)]);

  // Remove duplicated closing vertex, if present.
  if (points.length > 3) {
    const first = points[0];
    const last = points[points.length - 1];

    if (first[0] === last[0] && first[1] === last[1]) {
      points.pop();
    }
  }

  return points;
}

export default function FieldBoundary({ coordinates = [] }) {
  const { linePoints, shape } = useMemo(() => {
    if (!Array.isArray(coordinates) || coordinates.length < 3) {
      return { linePoints: [], shape: null };
    }

    const line = coordinates.map(
      ([x, z]) => new THREE.Vector3(x, 0.35, z)
    );

    // Close the boundary line.
    line.push(line[0].clone());

    // ShapeGeometry uses XY coordinates; rotate it onto the XZ ground plane.
    const fieldShape = new THREE.Shape();

    coordinates.forEach(([x, z], index) => {
      if (index === 0) {
        fieldShape.moveTo(x, -z);
      } else {
        fieldShape.lineTo(x, -z);
      }
    });

    fieldShape.closePath();

    return { linePoints: line, shape: fieldShape };
  }, [coordinates]);

  if (!shape || linePoints.length < 4) return null;

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.12, 0]}
      >
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color="#16a34a"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Line
        points={linePoints}
        color="#34d399"
        lineWidth={2.5}
      />
    </group>
  );
}
