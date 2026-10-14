import prisma from "../config/prisma.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// Create Field
export const createField = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      farmId,
      area,
      areaUnit,
      crop,
      soilType,
      irrigationType,
      plantingDate,
      notes,
    } = req.body;


    console.log("========== CREATE FIELD ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("=================================");

    // 1. Required fields validation
    if (!name || !farmId || !area) {
      return res.status(400).json({
        success: false,
        message: "Field name, farm and area are required",
      });
    }

    // 2. Check farm exists
    const farm = await prisma.farm.findUnique({
      where: {
        id: farmId,
      },
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    // 3. Check farm belongs to logged-in user
    if (farm.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add a field to this farm",
      });
    }

    // 4. Validate planting date
    let parsedPlantingDate = null;

    if (plantingDate) {
      parsedPlantingDate = new Date(plantingDate);

      if (isNaN(parsedPlantingDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid planting date",
        });
      }
    }

    let imageUrl = null;

    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      console.log("File name:", req.file.originalname);
      console.log("File type:", req.file.mimetype);
      console.log("File size:", req.file.size);

      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "farmIntel/field"
      );

      console.log("Cloudinary response:", uploadedImage);

      imageUrl = uploadedImage?.secure_url || null;

      console.log("IMAGE URL:", imageUrl);
    } else {
      console.log("No image received");
    }

    // 5. Create field
    const field = await prisma.field.create({
      data: {
        name: name.trim(),
        imageUrl,

        area: Number(area),

        areaUnit: areaUnit || "acre",

        crop: crop || null,

        soilType: soilType || null,

        irrigationType: irrigationType || null,

        plantingDate: parsedPlantingDate,

        notes: notes?.trim() || null,

        farmId,
      },
    });

    // 6. Success response
    return res.status(201).json({
      success: true,
      message: "Field created successfully",
      field,
    });
  } catch (error) {
    console.error("Create Field Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create field",
      error: error.message,
    });
  }
};

export const getMyFields = async (req, res) => {
  try {
    const userId = req.user.id;

    const fields = await prisma.field.findMany({
      where: {
        farm: {
          userId,
        },
      },
      include: {
        farm: {
          select: {
            id: true,
            name: true,
            location: true,
            city: true,
            state: true,
            country: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fields fetched successfully",
      fields,
    });
  } catch (error) {
    console.error("Get My Fields Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch fields",
      error: error.message,
    });
  }
};

// Get Fields By Farm ID
export const getFieldsByFarmId = async (req, res) => {
  try {
    const userId = req.user.id;
    const { farmId } = req.params;

    // 1. Validate farmId
    if (!farmId) {
      return res.status(400).json({
        success: false,
        message: "Farm ID is required",
      });
    }

    // 2. Verify farm belongs to logged-in user
    const farm = await prisma.farm.findFirst({
      where: {
        id: farmId,
        userId,
      },
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found or you are not authorized",
      });
    }

    // 3. Fetch fields belonging to this farm
    const fields = await prisma.field.findMany({
      where: {
        farmId,
      },
      include: {
        digitalTwin: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 4. Send response
    return res.status(200).json({
      success: true,
      message: "Fields fetched successfully",
      farm: {
        id: farm.id,
        name: farm.name,
      },
      fields,
    });
  } catch (error) {
    console.error("Get Fields By Farm ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch fields",
      error: error.message,
    });
  }
};


