import proj4 from "proj4";

/**
 * Convert longitude/latitude to UTM coordinates.
 *
 * GeoJSON coordinate order:
 * [longitude, latitude]
 */

export const getUTMZone = (longitude) => {
  return Math.floor((longitude + 180) / 6) + 1;
};

export const getUTMProjection = (longitude, latitude) => {
  const zone = getUTMZone(longitude);

  const hemisphere = latitude >= 0 ? "north" : "south";

  const epsg =
    hemisphere === "north"
      ? `EPSG:${32600 + zone}`
      : `EPSG:${32700 + zone}`;

  return epsg;
};

export const createCoordinateTransform = (referencePoint) => {
  const [longitude, latitude] = referencePoint;

  const projection = getUTMProjection(
    longitude,
    latitude
  );

  const forward = (lngLat) => {
    return proj4(
      "EPSG:4326",
      projection,
      lngLat
    );
  };

  const inverse = (xy) => {
    return proj4(
      projection,
      "EPSG:4326",
      xy
    );
  };

  return {
    projection,
    forward,
    inverse,
  };
};

/**
 * Convert geographic coordinates into local field coordinates.
 *
 * Local field origin is the first/reference point.
 */
export const gpsToLocal = (
  coordinates,
  referencePoint
) => {
  const transform =
    createCoordinateTransform(referencePoint);

  const referenceXY =
    transform.forward(referencePoint);

  return coordinates.map((point) => {
    const xy = transform.forward(point);

    return [
      xy[0] - referenceXY[0],
      xy[1] - referenceXY[1],
    ];
  });
};

/**
 * Convert local field coordinates back to GPS.
 */
export const localToGps = (
  localCoordinates,
  referencePoint
) => {
  const transform =
    createCoordinateTransform(referencePoint);

  const referenceXY =
    transform.forward(referencePoint);

  return localCoordinates.map((point) => {
    const absoluteXY = [
      point[0] + referenceXY[0],
      point[1] + referenceXY[1],
    ];

    return transform.inverse(absoluteXY);
  });
};