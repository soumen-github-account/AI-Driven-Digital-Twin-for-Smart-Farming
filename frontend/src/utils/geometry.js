/**
 * Spatial and Geometric utilities for field polygon operations.
 * Coordinates are in meters relative to field origin: [x, z].
 */

/**
 * Calculates the 2D polygon area using the Shoelace formula.
 * @param {Array<[number, number]>} polygon - Array of [x, z] vertices
 * @returns {{ squareMeters: number, hectares: number, acres: number }}
 */
export function calculatePolygonArea(polygon) {
  if (!polygon || polygon.length < 3) {
    return { squareMeters: 0, hectares: 0, acres: 0 };
  }

  let area = 0;
  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += polygon[i][0] * polygon[j][1];
    area -= polygon[j][0] * polygon[i][1];
  }
  const squareMeters = Math.abs(area) / 2;
  const hectares = squareMeters / 10000;
  const acres = squareMeters / 4046.8564224;

  return {
    squareMeters: Number(squareMeters.toFixed(1)),
    hectares: Number(hectares.toFixed(2)),
    acres: Number(acres.toFixed(2)),
  };
}

/**
 * Calculates the polygon perimeter in meters.
 * @param {Array<[number, number]>} polygon
 * @returns {number} Perimeter in meters
 */
export function calculatePolygonPerimeter(polygon) {
  if (!polygon || polygon.length < 2) return 0;
  let perimeter = 0;
  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const dx = polygon[j][0] - polygon[i][0];
    const dz = polygon[j][1] - polygon[i][1];
    perimeter += Math.sqrt(dx * dx + dz * dz);
  }
  return Number(perimeter.toFixed(1));
}

/**
 * Checks if a 2D point (x, z) is inside the polygon with an optional inset margin.
 * @param {number} x
 * @param {number} z
 * @param {Array<[number, number]>} polygon
 * @param {number} margin - Safety margin in meters inside boundary
 * @returns {boolean}
 */
export function isPointInPolygon(x, z, polygon, margin = 0) {
  if (!polygon || polygon.length < 3) return false;

  let inside = false;
  const n = polygon.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i][0], zi = polygon[i][1];
    const xj = polygon[j][0], zj = polygon[j][1];

    const intersect = ((zi > z) !== (zj > z))
      && (x < ((xj - xi) * (z - zi)) / (zj - zi) + xi);

    if (intersect) inside = !inside;
  }

  if (!inside) return false;
  if (margin <= 0) return true;

  // Margin check: distance from point to all boundary segments must be >= margin
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const dist = distanceToSegment(x, z, polygon[i][0], polygon[i][1], polygon[j][0], polygon[j][1]);
    if (dist < margin) return false;
  }

  return true;
}

/**
 * Distance from point (px, pz) to segment (ax, az)-(bx, bz)
 */
function distanceToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  if (lenSq === 0) {
    const ex = px - ax;
    const ez = pz - az;
    return Math.sqrt(ex * ex + ez * ez);
  }
  let t = ((px - ax) * dx + (pz - az) * dz) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const projX = ax + t * dx;
  const projZ = az + t * dz;
  const diffX = px - projX;
  const diffZ = pz - projZ;
  return Math.sqrt(diffX * diffX + diffZ * diffZ);
}

/**
 * Gets bounding box of polygon.
 */
export function getPolygonBounds(polygon) {
  if (!polygon || polygon.length === 0) {
    return { minX: 0, maxX: 0, minZ: 0, maxZ: 0, width: 0, depth: 0, centerX: 0, centerZ: 0 };
  }

  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const [x, z] of polygon) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }

  return {
    minX,
    maxX,
    minZ,
    maxZ,
    width: maxX - minX,
    depth: maxZ - minZ,
    centerX: (minX + maxX) / 2,
    centerZ: (minZ + maxZ) / 2,
  };
}

/**
 * Generates regular spatial management zones within the field polygon.
 * @param {Array<[number, number]>} polygon
 * @param {number} gridX - Number of zones horizontally
 * @param {number} gridZ - Number of zones vertically
 */
export function generateFieldZones(polygon, gridX = 4, gridZ = 3) {
  const bounds = getPolygonBounds(polygon);
  const stepX = bounds.width / gridX;
  const stepZ = bounds.depth / gridZ;
  const zones = [];

  const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (let r = 0; r < gridZ; r++) {
    for (let c = 0; c < gridX; c++) {
      const zMin = bounds.minZ + r * stepZ;
      const zMax = zMin + stepZ;
      const xMin = bounds.minX + c * stepX;
      const xMax = xMin + stepX;
      const centerX = xMin + stepX / 2;
      const centerZ = zMin + stepZ / 2;

      // Check if zone center or corners overlap polygon
      const centerInside = isPointInPolygon(centerX, centerZ, polygon, 0);
      const c1 = isPointInPolygon(xMin + stepX * 0.2, zMin + stepZ * 0.2, polygon, 0);
      const c2 = isPointInPolygon(xMax - stepX * 0.2, zMax - stepZ * 0.2, polygon, 0);

      if (centerInside || c1 || c2) {
        const id = `Z-${rowLabels[r] || 'Z'}${c + 1}`;
        zones.push({
          id,
          name: `Sector ${rowLabels[r] || 'Z'}${c + 1}`,
          center: [centerX, centerZ],
          bounds: { minX: xMin, maxX: xMax, minZ: zMin, maxZ: zMax },
          gridCoord: [r, c],
        });
      }
    }
  }

  return zones;
}
