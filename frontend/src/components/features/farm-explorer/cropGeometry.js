import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * Creates procedural 3D crop geometries for different crop types.
 * Returns a single unified BufferGeometry that can be efficiently instanced.
 */
export function createCropGeometry(cropType = 'Corn') {
  switch (cropType) {
    case 'Wheat':
      return createWheatGeometry();
    case 'Soybean':
      return createSoybeanGeometry();
    case 'Corn':
    default:
      return createCornGeometry();
  }
}

/**
 * Procedural Corn Model
 * - Central tapered stalk
 * - 6 alternating arching broad leaves with gravity droop
 * - Top flowering tassel
 */
function createCornGeometry() {
  const parts = [];

  // 1. Central stalk
  const stalkGeo = new THREE.CylinderGeometry(0.04, 0.08, 2.2, 6);
  stalkGeo.translate(0, 1.1, 0); // Base at y=0
  parts.push(stalkGeo);

  // 2. Arching broad leaves (Phyllotaxis angle: 137.5 deg)
  const leafCount = 6;
  const goldenAngle = 137.5 * (Math.PI / 180);

  for (let i = 0; i < leafCount; i++) {
    const angle = i * goldenAngle;
    const attachHeight = 0.5 + i * 0.28;
    const leafLength = 0.85 + (i % 2) * 0.2;
    const leafWidth = 0.16 - i * 0.015;

    // Build curved leaf strip using 4 cross-sections
    const leafGeo = createCurvedLeafRibbon(attachHeight, leafLength, leafWidth, angle);
    parts.push(leafGeo);
  }

  // 3. Top flowering tassel
  const tasselGeo = new THREE.CylinderGeometry(0.01, 0.03, 0.45, 5);
  tasselGeo.translate(0, 2.35, 0);
  parts.push(tasselGeo);

  // Small tassel side spikes
  for (let t = 0; t < 3; t++) {
    const tAngle = (t * 120 * Math.PI) / 180;
    const spike = new THREE.CylinderGeometry(0.008, 0.02, 0.3, 4);
    spike.rotateZ(0.35);
    spike.rotateY(tAngle);
    spike.translate(0, 2.3, 0);
    parts.push(spike);
  }

  // Merge all parts into one compound geometry
  const merged = mergeGeometries(parts, false);
  merged.computeVertexNormals();
  return merged;
}

/**
 * Creates an arching curved leaf strip with realistic droop
 */
function createCurvedLeafRibbon(attachHeight, length, maxWidth, azimuth) {
  const segments = 4;
  const vertices = [];
  const indices = [];
  const uvs = [];

  // Vector outward
  const dirX = Math.cos(azimuth);
  const dirZ = Math.sin(azimuth);
  // Normal in horizontal plane for ribbon width
  const normX = -dirZ;
  const normZ = dirX;

  for (let s = 0; s <= segments; s++) {
    const t = s / segments;
    // Arch curvature: parabolic arch rising slightly then drooping downwards
    const distOut = t * length;
    const drop = 0.35 * Math.sin(t * Math.PI * 0.8) - 0.45 * (t * t);
    const y = attachHeight + drop;

    const currentX = dirX * distOut;
    const currentZ = dirZ * distOut;

    // Width tapers to tip
    const halfW = (maxWidth / 2) * (1 - t * 0.85);

    // Left vertex
    vertices.push(currentX + normX * halfW, y, currentZ + normZ * halfW);
    uvs.push(0, t);

    // Right vertex
    vertices.push(currentX - normX * halfW, y, currentZ - normZ * halfW);
    uvs.push(1, t);
  }

  // Triangle indices
  for (let s = 0; s < segments; s++) {
    const i0 = s * 2;
    const i1 = s * 2 + 1;
    const i2 = (s + 1) * 2;
    const i3 = (s + 1) * 2 + 1;

    indices.push(i0, i1, i2);
    indices.push(i2, i1, i3);
    // Double-sided faces so leaves are visible from all angles
    indices.push(i2, i1, i0);
    indices.push(i3, i1, i2);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Procedural Wheat Model
 * - Slender tall stem
 * - Upright narrow leaves
 * - Awned wheat head/spike
 */
function createWheatGeometry() {
  const parts = [];

  // Slender stem
  const stem = new THREE.CylinderGeometry(0.015, 0.025, 1.0, 5);
  stem.translate(0, 0.5, 0);
  parts.push(stem);

  // 3 narrow upright leaves
  for (let i = 0; i < 3; i++) {
    const angle = (i * 120 * Math.PI) / 180;
    const leaf = createCurvedLeafRibbon(0.3 + i * 0.2, 0.4, 0.04, angle);
    parts.push(leaf);
  }

  // Grain head
  const head = new THREE.CylinderGeometry(0.035, 0.04, 0.22, 6);
  head.translate(0, 1.05, 0);
  parts.push(head);

  // Awns (bristles)
  for (let a = 0; a < 4; a++) {
    const awn = new THREE.CylinderGeometry(0.005, 0.008, 0.18, 4);
    awn.rotateZ(0.25);
    awn.rotateY((a * 90 * Math.PI) / 180);
    awn.translate(0, 1.15, 0);
    parts.push(awn);
  }

  const merged = mergeGeometries(parts, false);
  merged.computeVertexNormals();
  return merged;
}

/**
 * Procedural Soybean Model
 * - Bushy multi-branching stem
 * - Trifoliate leaf clusters
 */
function createSoybeanGeometry() {
  const parts = [];

  // Main bushy stem
  const stem = new THREE.CylinderGeometry(0.02, 0.04, 0.7, 5);
  stem.translate(0, 0.35, 0);
  parts.push(stem);

  // 4 branching leaf nodes
  for (let b = 0; b < 4; b++) {
    const bAngle = (b * 90 + 20) * (Math.PI / 180);
    const bHeight = 0.25 + b * 0.12;

    // Small branch
    const branch = new THREE.CylinderGeometry(0.01, 0.015, 0.35, 4);
    branch.rotateZ(0.6);
    branch.rotateY(bAngle);
    branch.translate(0, bHeight, 0);
    parts.push(branch);

    // Trifoliate leaf cluster at end of branch
    const cluster = createCurvedLeafRibbon(bHeight + 0.15, 0.3, 0.12, bAngle);
    parts.push(cluster);
  }

  const merged = mergeGeometries(parts, false);
  merged.computeVertexNormals();
  return merged;
}
