
import prisma from "../config/prisma.js";

// POST: Create and save a Digital Twin

// export const createDigitalTwin = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const {
//       name,
//       farmId,
//       fieldId,
//       geometryType,
//       coordinateSystem,
//       geometryJson,
//       gpsCoordinates,
//       localCoordinates,
//       area,
//       areaUnit,
//       perimeter,
//       season,
//       notes,
//     } = req.body;

//     // 1. Validate required fields
//     if (
//       typeof name !== "string" ||
//       !name.trim() ||
//       !farmId ||
//       !fieldId ||
//       !geometryType ||
//       !geometryJson ||
//       typeof geometryJson !== "object" ||
//       Array.isArray(geometryJson)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Name, farm, field, geometry type and valid geometry are required",
//       });
//     }

//     // 2. Validate measurements
//     if (
//       area !== undefined &&
//       area !== null &&
//       (!Number.isFinite(Number(area)) || Number(area) <= 0)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Area must be a positive number",
//       });
//     }

//     if (
//       perimeter !== undefined &&
//       perimeter !== null &&
//       (!Number.isFinite(Number(perimeter)) ||
//         Number(perimeter) < 0)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Perimeter must be a non-negative number",
//       });
//     }

//     if (
//       (gpsCoordinates != null &&
//         !Array.isArray(gpsCoordinates)) ||
//       (localCoordinates != null &&
//         !Array.isArray(localCoordinates))
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "GPS and local coordinates must be arrays",
//       });
//     }

//     // 3. Verify the selected field belongs to this farm
//     // and the farm belongs to the logged-in user.
//     const field = await prisma.field.findFirst({
//       where: {
//         id: fieldId,
//         farmId,
//         farm: {
//           userId,
//         },
//       },
//       include: {
//         digitalTwin: {
//           select: {
//             id: true,
//           },
//         },
//       },
//     });

//     if (!field) {
//       return res.status(404).json({
//         success: false,
//         message: "Field not found in your selected farm",
//       });
//     }

//     // 4. Prevent duplicate Digital Twins for the same field
//     if (field.digitalTwin) {
//       return res.status(409).json({
//         success: false,
//         message:
//           "A Digital Twin already exists for this field. Select another field or load the existing twin.",
//         digitalTwinId: field.digitalTwin.id,
//       });
//     }

//     // 5. Prepare data
//     // IMPORTANT: crop comes from the Field model, not the frontend.
//     const twinData = {
//       name: name.trim(),
//       geometryType,
//       geometryJson,
//       userId,
//       farmId,
//       fieldId,
//       crop: field.crop || null,
//       coordinateSystem: coordinateSystem || null,
//       area:
//         area !== undefined && area !== null
//           ? Number(area)
//           : null,
//       areaUnit: areaUnit || "sqm",
//       perimeter:
//         perimeter !== undefined && perimeter !== null
//           ? Number(perimeter)
//           : null,
//       season:
//         typeof season === "string" && season.trim()
//           ? season.trim()
//           : null,
//       notes:
//         typeof notes === "string" && notes.trim()
//           ? notes.trim()
//           : null,
//     };

//     // Only add optional JSON properties when supplied as arrays.
//     if (Array.isArray(gpsCoordinates)) {
//       twinData.gpsCoordinates = gpsCoordinates;
//     }

//     if (Array.isArray(localCoordinates)) {
//       twinData.localCoordinates = localCoordinates;
//     }

//     // 6. Save Digital Twin
//     const digitalTwin = await prisma.digitalTwin.create({
//       data: twinData,
//       include: {
//         farm: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         field: {
//           select: {
//             id: true,
//             name: true,
//             crop: true,
//           },
//         },
//       },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Digital Twin saved successfully",
//       digitalTwin,
//     });
//   } catch (error) {
//     console.error("Create Digital Twin Error:", error);

//     if (error.code === "P2002") {
//       return res.status(409).json({
//         success: false,
//         message: "A Digital Twin already exists for this field",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Failed to save Digital Twin",
//     });
//   }
// };


export const createDigitalTwin = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      name,
      farmId,
      fieldId,
      geometryType,
      coordinateSystem,
      geometryJson,
      gpsCoordinates,
      localCoordinates,
      area,
      areaUnit,
      perimeter,
      season,
      notes,
    } = req.body ?? {};

    // 1. Validate basic fields.
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof farmId !== "string" ||
      !farmId.trim() ||
      typeof fieldId !== "string" ||
      !fieldId.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, farmId and fieldId are required.",
      });
    }

    // 2. Parse geometry if an older client sends JSON as a string.
    let parsedGeometry = geometryJson;

    if (typeof parsedGeometry === "string") {
      try {
        parsedGeometry = JSON.parse(parsedGeometry);
      } catch {
        return res.status(400).json({
          success: false,
          message: "geometryJson contains invalid JSON.",
        });
      }
    }

    if (
      !parsedGeometry ||
      typeof parsedGeometry !== "object" ||
      Array.isArray(parsedGeometry)
    ) {
      return res.status(400).json({
        success: false,
        message: "geometryJson must be a geometry object.",
      });
    }

    const validPointArray = (points) =>
      Array.isArray(points) &&
      points.length >= 3 &&
      points.every(
        (point) =>
          Array.isArray(point) &&
          point.length >= 2 &&
          Number.isFinite(Number(point[0])) &&
          Number.isFinite(Number(point[1]))
      );

    // Geometry coordinates in the current builder are local [x, z] meters.
    // GeoJSON-style coordinates may instead be nested as [[[lng, lat], ...]].
    const unwrapRing = (points) => {
      if (!Array.isArray(points)) return null;

      if (
        points.length === 1 &&
        Array.isArray(points[0]) &&
        Array.isArray(points[0][0])
      ) {
        return points[0];
      }

      return points;
    };

    const suppliedLocal =
      localCoordinates ?? parsedGeometry.localCoordinates ?? null;

    const rawGeometryCoordinates = parsedGeometry.coordinates ?? null;

    const geometryCoordinateRing = unwrapRing(rawGeometryCoordinates);

    const localRing = suppliedLocal
      ? unwrapRing(suppliedLocal)
      : geometryCoordinateRing;

    const gpsRing = unwrapRing(
      gpsCoordinates ?? parsedGeometry.gpsCoordinates ?? null
    );

    if (!validPointArray(localRing)) {
      return res.status(400).json({
        success: false,
        message:
          "Valid localCoordinates are required. Supply at least three [x, z] points in meters.",
      });
    }

    if (gpsRing !== null && !validPointArray(gpsRing)) {
      return res.status(400).json({
        success: false,
        message:
          "gpsCoordinates must contain at least three [longitude, latitude] points.",
      });
    }

    // Validate GPS values as longitude, latitude.
    if (
      gpsRing &&
      gpsRing.some(
        ([longitude, latitude]) =>
          Number(longitude) < -180 ||
          Number(longitude) > 180 ||
          Number(latitude) < -90 ||
          Number(latitude) > 90
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "GPS coordinates are outside valid longitude/latitude ranges.",
      });
    }

    // 3. Calculate area and perimeter from local meter coordinates.
    // A repeated closing point is supported.
    const points = localRing.map(([x, z]) => [
      Number(x),
      Number(z),
    ]);

    const first = points[0];
    const last = points[points.length - 1];

    const isClosed =
      first[0] === last[0] && first[1] === last[1];

    const openPoints = isClosed ? points.slice(0, -1) : points;

    if (openPoints.length < 3) {
      return res.status(400).json({
        success: false,
        message: "A polygon requires at least three distinct boundary points.",
      });
    }

    const distinctPoints = new Set(
      openPoints.map(([x, z]) => `${x},${z}`)
    );

    if (distinctPoints.size < 3) {
      return res.status(400).json({
        success: false,
        message: "The polygon must contain at least three distinct points.",
      });
    }

    let twiceArea = 0;
    let calculatedPerimeter = 0;

    for (let i = 0; i < openPoints.length; i += 1) {
      const [x1, z1] = openPoints[i];
      const [x2, z2] = openPoints[(i + 1) % openPoints.length];

      twiceArea += x1 * z2 - x2 * z1;

      calculatedPerimeter += Math.hypot(
        x2 - x1,
        z2 - z1
      );
    }

    const calculatedArea = Math.abs(twiceArea) / 2;

    if (
      !Number.isFinite(calculatedArea) ||
      calculatedArea <= 0 ||
      !Number.isFinite(calculatedPerimeter) ||
      calculatedPerimeter <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "The field boundary has invalid area or perimeter.",
      });
    }

    // 4. Confirm that the field belongs to the selected farm
    // and that the farm belongs to the authenticated user.
    const field = await prisma.field.findFirst({
      where: {
        id: fieldId,
        farmId,
        farm: {
          userId,
        },
      },
      select: {
        id: true,
        name: true,
        crop: true,
        digitalTwin: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!field) {
      return res.status(404).json({
        success: false,
        message: "Field not found in your selected farm.",
      });
    }

    // 5. Prevent duplicate Digital Twins for the same field.
    if (field.digitalTwin) {
      return res.status(409).json({
        success: false,
        message: "A Digital Twin already exists for this field.",
        digitalTwinId: field.digitalTwin.id,
      });
    }

    // 6. Normalize geometry to one consistent format.
    // coordinates are local [x, z] points in meters, not GeoJSON coordinates.
    const normalizedGeometry = {
      type: "Polygon",
      coordinateSystem: "local-meter",
      units: "meters",
      coordinates: openPoints,
      ...(gpsRing
        ? {
            gpsCoordinates: gpsRing.map(([longitude, latitude]) => [
              Number(longitude),
              Number(latitude),
            ]),
          }
        : {}),
    };

    // 7. Validate optional fields.
    if (
      season !== undefined &&
      season !== null &&
      typeof season !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Season must be a string.",
      });
    }

    if (
      notes !== undefined &&
      notes !== null &&
      typeof notes !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Notes must be a string.",
      });
    }

    // Ignore client-supplied area/perimeter for persistence:
    // calculate them from the local meter-based boundary.
    const twinData = {
      name: name.trim(),
      geometryType: "Polygon",
      coordinateSystem: "local-meter",
      geometryJson: normalizedGeometry,
      localCoordinates: openPoints,
      ...(gpsRing
        ? {
            gpsCoordinates: gpsRing.map(([longitude, latitude]) => [
              Number(longitude),
              Number(latitude),
            ]),
          }
        : {}),
      area: calculatedArea,
      areaUnit: "sqm",
      perimeter: calculatedPerimeter,
      crop: field.crop || null,
      season:
        typeof season === "string" && season.trim()
          ? season.trim()
          : null,
      notes:
        typeof notes === "string" && notes.trim()
          ? notes.trim()
          : null,
      userId,
      farmId,
      fieldId,
    };

    // 8. Save the Digital Twin and return its related field/farm.
    const digitalTwin = await prisma.digitalTwin.create({
      data: twinData,
      include: {
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        field: {
          select: {
            id: true,
            name: true,
            crop: true,
            soilType: true,
            irrigationType: true,
            plantingDate: true,
            area: true,
            areaUnit: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Digital Twin saved successfully.",
      digitalTwin,
    });
  } catch (error) {
    console.error("Create Digital Twin Error:", error);

    // A concurrent request might have created the twin after our check.
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A Digital Twin already exists for this field.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to save Digital Twin.",
    });
  }
};

// GET /api/v1/digital-twins
// Return the logged-in user's Digital Twins for the selector.
export const getMyDigitalTwins = async (req, res) => {
  try {
    const userId = req.user.id;

    const digitalTwins = await prisma.digitalTwin.findMany({
      where: {
        userId,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        geometryType: true,
        coordinateSystem: true,
        geometryJson: true,
        gpsCoordinates: true,
        localCoordinates: true,
        area: true,
        areaUnit: true,
        perimeter: true,
        crop: true,
        season: true,
        status: true,
        farmId: true,
        fieldId: true,
        updatedAt: true,
        farm: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
        field: {
          select: {
            id: true,
            name: true,
            crop: true,
            area: true,
            areaUnit: true,
            soilType: true,
            irrigationType: true,
            plantingDate: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: digitalTwins.length,
      digitalTwins,
    });
  } catch (error) {
    console.error("Get Digital Twins Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Digital Twins",
    });
  }
};

// GET /api/v1/digital-twins/field/:fieldId
// Return the selected field's Digital Twin.
export const getDigitalTwinByField = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fieldId } = req.params;

    if (!fieldId) {
      return res.status(400).json({
        success: false,
        message: "Field ID is required",
      });
    }

    const digitalTwin = await prisma.digitalTwin.findFirst({
      where: {
        fieldId,
        userId,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        geometryType: true,
        coordinateSystem: true,
        geometryJson: true,
        gpsCoordinates: true,
        localCoordinates: true,
        area: true,
        areaUnit: true,
        perimeter: true,
        crop: true,
        season: true,
        notes: true,
        status: true,
        farmId: true,
        fieldId: true,
        createdAt: true,
        updatedAt: true,
        farm: {
          select: {
            id: true,
            name: true,
            location: true,
            latitude: true,
            longitude: true,
          },
        },
        field: {
          select: {
            id: true,
            name: true,
            crop: true,
            area: true,
            areaUnit: true,
            soilType: true,
            irrigationType: true,
            plantingDate: true,
            notes: true,
          },
        },
      },
    });

    if (!digitalTwin) {
      return res.status(404).json({
        success: false,
        message: "No active Digital Twin found for this field",
      });
    }

    return res.status(200).json({
      success: true,
      digitalTwin,
    });
  } catch (error) {
    console.error("Get Digital Twin By Field Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Digital Twin",
    });
  }
};


