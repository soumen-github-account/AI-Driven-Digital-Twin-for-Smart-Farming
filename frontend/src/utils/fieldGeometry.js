import {
  area as turfArea,
  polygon as turfPolygon,
  lineString,
  length as turfLength,
  kinks,
  point,
  pointToLineDistance,
  booleanPointInPolygon,
} from "@turf/turf";

import {
  gpsToLocal,
} from "./coordinateTransform";

/* ------------------------------------------------ */
/* CONSTANTS */
/* ------------------------------------------------ */

const METERS_PER_ACRE = 4046.8564224;

/* ------------------------------------------------ */
/* UNIT CONVERSION */
/* ------------------------------------------------ */

export const convertAreaToSquareMeters = (
  area,
  unit
) => {
  const value = Number(area);

  if (!Number.isFinite(value)) {
    return 0;
  }

  switch (unit) {
    case "acre":
      return value * METERS_PER_ACRE;

    case "hectare":
      return value * 10000;

    case "sqm":
      return value;

    case "sqft":
      return value * 0.092903;

    default:
      return value;
  }
};

export const squareMetersToAcres = (
  squareMeters
) => {
  return squareMeters / METERS_PER_ACRE;
};

/* ------------------------------------------------ */
/* SIMPLE RECTANGLE */
/* ------------------------------------------------ */

export const createRectangleGeometry = ({
  length,
  width,
  orientation = 0,
}) => {
  const L = Number(length);
  const W = Number(width);

  if (
    !Number.isFinite(L) ||
    !Number.isFinite(W) ||
    L <= 0 ||
    W <= 0
  ) {
    throw new Error(
      "Length and width must be greater than zero."
    );
  }

  const points = [
    [0, 0],
    [L, 0],
    [L, W],
    [0, W],
  ];

  const centerX = L / 2;
  const centerY = W / 2;

  const radians =
    (Number(orientation) * Math.PI) / 180;

  const rotatedPoints = points.map(
    ([x, y]) => {
      const dx = x - centerX;
      const dy = y - centerY;

      return [
        dx * Math.cos(radians) -
          dy * Math.sin(radians) +
          centerX,

        dx * Math.sin(radians) +
          dy * Math.cos(radians) +
          centerY,
      ];
    }
  );

  return {
    type: "rectangle",

    coordinates: rotatedPoints,

    width: W,

    length: L,

    area: L * W,

    orientation: Number(orientation),

    referencePoint: null,

    coordinateSystem: "local-meter",
  };
};

/* ------------------------------------------------ */
/* GPS POLYGON */
/* ------------------------------------------------ */
export const validateGPSCoordinates = (
  gpsCoordinates
) => {
  if (
    !Array.isArray(gpsCoordinates)
  ) {
    return {
      valid: false,
      message:
        "GPS coordinates are required.",
    };
  }

  if (gpsCoordinates.length < 3) {
    return {
      valid: false,
      message:
        "At least 3 points are required to create a field.",
    };
  }

  const cleanedCoordinates =
    gpsCoordinates.map(
      ([longitude, latitude]) => [
        Number(longitude),
        Number(latitude),
      ]
    );

  const invalidCoordinate =
    cleanedCoordinates.some(
      ([longitude, latitude]) =>
        !Number.isFinite(longitude) ||
        !Number.isFinite(latitude) ||
        longitude < -180 ||
        longitude > 180 ||
        latitude < -90 ||
        latitude > 90
    );

  if (invalidCoordinate) {
    return {
      valid: false,
      message:
        "One or more GPS coordinates are invalid.",
    };
  }

  const uniqueCoordinates =
    new Set(
      cleanedCoordinates.map(
        ([longitude, latitude]) =>
          `${longitude.toFixed(7)},${latitude.toFixed(7)}`
      )
    );

  if (uniqueCoordinates.size < 3) {
    return {
      valid: false,
      message:
        "At least 3 different GPS points are required.",
    };
  }

  const closedCoordinates = [
    ...cleanedCoordinates,
    cleanedCoordinates[0],
  ];

  const fieldPolygon =
    turfPolygon([
      closedCoordinates,
    ]);

  const fieldArea =
    turfArea(fieldPolygon);

  if (fieldArea <= 0) {
    return {
      valid: false,
      message:
        "The selected points do not form a valid field.",
    };
  }

  const intersections =
    kinks(fieldPolygon);

  if (
    intersections.features.length > 0
  ) {
    return {
      valid: false,
      message:
        "Field boundary lines are crossing each other. Please select the corners in order.",
    };
  }

  return {
    valid: true,
    message: "Valid field boundary.",
    coordinates:
      cleanedCoordinates,
    area: fieldArea,
  };
};

export const createGPSGeometry = (
  gpsCoordinates
) => {
  const validation =
    validateGPSCoordinates(
      gpsCoordinates
    );

  if (!validation.valid) {
    throw new Error(
      validation.message
    );
  }

  const cleanedCoordinates =
    validation.coordinates;

  const referencePoint =
    cleanedCoordinates[0];

  const localCoordinates =
    gpsToLocal(
      cleanedCoordinates,
      referencePoint
    );

  const closedCoordinates = [
    ...cleanedCoordinates,
    cleanedCoordinates[0],
  ];

  const polygon =
    turfPolygon([
      closedCoordinates,
    ]);

  const calculatedArea =
    turfArea(polygon);

  const perimeter =
    turfLength(
      lineString(
        closedCoordinates
      ),
      {
        units: "meters",
      }
    );

  return {
    type: "polygon",

    coordinates:
      localCoordinates,

    gpsCoordinates:
      cleanedCoordinates,

    area: calculatedArea,

    perimeter,

    referencePoint,

    coordinateSystem:
      "utm-local-meter",
  };
};

/* ------------------------------------------------ */
/* BOUNDS */
/* ------------------------------------------------ */

export const getGeometryBounds = (
  coordinates
) => {
  if (
    !coordinates ||
    coordinates.length === 0
  ) {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      width: 0,
      height: 0,
    };
  }

  const xs = coordinates.map(
    ([x]) => x
  );

  const ys = coordinates.map(
    ([, y]) => y
  );

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    minX,
    maxX,
    minY,
    maxY,

    width: maxX - minX,

    height: maxY - minY,
  };
};

/* ------------------------------------------------ */
/* NORMALIZE GEOMETRY */
/* ------------------------------------------------ */

export const normalizeGeometry = (
  coordinates
) => {
  const bounds =
    getGeometryBounds(coordinates);

  return coordinates.map(
    ([x, y]) => [
      x - bounds.minX,
      y - bounds.minY,
    ]
  );
};

/* ------------------------------------------------ */
/* FIELD CENTER */
/* ------------------------------------------------ */

export const getGeometryCenter = (
  coordinates
) => {
  const bounds =
    getGeometryBounds(coordinates);

  return [
    (bounds.minX + bounds.maxX) / 2,
    (bounds.minY + bounds.maxY) / 2,
  ];
};

/* ------------------------------------------------ */
/* LONGEST SIDE */
/* ------------------------------------------------ */

export const getLongestEdge = (
  coordinates
) => {
  if (coordinates.length < 2) {
    return 0;
  }

  let maxDistance = 0;

  for (
    let i = 0;
    i < coordinates.length;
    i++
  ) {
    const current =
      coordinates[i];

    const next =
      coordinates[
        (i + 1) % coordinates.length
      ];

    const dx =
      next[0] - current[0];

    const dy =
      next[1] - current[1];

    const length =
      Math.sqrt(
        dx * dx + dy * dy
      );

    maxDistance =
      Math.max(
        maxDistance,
        length
      );
  }

  return maxDistance;
};

/* ------------------------------------------------ */
/* FIELD METADATA */
/* ------------------------------------------------ */

export const buildFieldGeometry = (
  config
) => {
  if (config.mode === "rectangle") {
    return createRectangleGeometry({
      length: config.length,
      width: config.width,
      orientation:
        config.orientation || 0,
    });
  }

  if (config.mode === "gps") {
    return createGPSGeometry(
      config.coordinates
    );
  }

  throw new Error(
    "Unsupported field geometry mode."
  );
};

/* ------------------------------------------------ */
/* SENSOR POSITION CHECK */
/* ------------------------------------------------ */

/**
 * For future sensor system.
 *
 * Sensor:
 * {
 *   lat,
 *   lng
 * }
 *
 * Field:
 * {
 *   gpsCoordinates
 * }
 */

export const getSensorDistanceToField = (
  sensorPoint,
  fieldGPSCoordinates
) => {
  if (
    !sensorPoint ||
    !Array.isArray(
      fieldGPSCoordinates
    ) ||
    fieldGPSCoordinates.length < 3
  ) {
    return null;
  }

  const sensor = point([
    Number(sensorPoint.lng),
    Number(sensorPoint.lat),
  ]);

  const closedCoordinates = [
    ...fieldGPSCoordinates,
    fieldGPSCoordinates[0],
  ];

  const boundary = lineString(
    closedCoordinates
  );

  const fieldPolygon =
    turfPolygon([
      closedCoordinates,
    ]);

  const inside =
    booleanPointInPolygon(
      sensor,
      fieldPolygon
    );

  const distanceToBoundary =
    pointToLineDistance(
      sensor,
      boundary,
      {
        units: "meters",
      }
    );

  return {
    inside,
    distanceToBoundary,
  };
};

