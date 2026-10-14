import prisma from "../config/prisma.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";


export const createFarm = async (req, res) => {
  try {
    const {
      name,
      description,
      farmType,
      city,
      state,
      country,
      pincode,
      latitude,
      longitude,
      area,
      areaUnit,
      mainCrop,
      farmStatus,

    } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Farm name is required",
      });
    }

    if (!city || !city.trim()) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    if (!state || !state.trim()) {
      return res.status(400).json({
        success: false,
        message: "State is required",
      });
    }

    const locationParts = [
      city?.trim(),
      state?.trim(),
      country?.trim() || "India",
    ].filter(Boolean);

    let location = locationParts.join(", ");

    if (pincode?.trim()) {
      location += ` - ${pincode.trim()}`;
    }

    let imageUrl = null;

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "farmIntel/farms"
      );

      imageUrl = uploadedImage.secure_url;
    }

    const farm = await prisma.farm.create({
      data: {
        name: name.trim(),

        description: description?.trim() || null,

        location,
        city,
        state,

        latitude:
          latitude !== undefined && latitude !== ""
            ? Number(latitude)
            : null,

        longitude:
          longitude !== undefined && longitude !== ""
            ? Number(longitude)
            : null,

        area:
          area !== undefined && area !== ""
            ? Number(area)
            : null,

        areaUnit: areaUnit || "acre",
        imageUrl,
        farmType,
        mainCrop,
        farmStatus,

        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Farm created successfully",
      farm,
    });
  } catch (error) {
    console.error("CREATE FARM ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create farm",
    });
  }
};

export const getAllFarms = async (req, res) => {
  try {
    const farms = await prisma.farm.findMany({
      where: {
        userId: req.user.id,
      },

      include: {
        fields: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(farms)

    return res.status(200).json({
      success: true,
      count: farms.length,
      farms,
    });
  } catch (error) {
    console.error("GET ALL FARMS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch farms",
    });
  }
};

export const getFarmById = async (req, res) => {
  try {
    const { id } = req.params;

    const farm = await prisma.farm.findFirst({
      where: {
        id,
        userId: req.user.id,
      },

      include: {
        fields: true,
      },
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    return res.status(200).json({
      success: true,
      farm,
    });
  } catch (error) {
    console.error("GET FARM ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch farm",
    });
  }
};

export const updateFarm = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      city,
      state,
      country,
      pincode,
      latitude,
      longitude,
      area,
      areaUnit,
      mainCrop,
      farmStatus,
    } = req.body;

    // -----------------------------------------
    // FIND FARM
    // -----------------------------------------

    const existingFarm = await prisma.farm.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingFarm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    // -----------------------------------------
    // IMAGE
    // -----------------------------------------

    let imageUrl = existingFarm.imageUrl;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "farmIntel/farms",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // -----------------------------------------
    // LOCATION
    // -----------------------------------------

    let location = existingFarm.location;

    if (
      city !== undefined ||
      state !== undefined ||
      country !== undefined ||
      pincode !== undefined
    ) {
      const currentParts = existingFarm.location
        ? existingFarm.location.split(",").map((item) => item.trim())
        : [];

      location = [
        city?.trim() || currentParts[0],
        state?.trim() || currentParts[1],
        country?.trim() || currentParts[2] || "India",
        pincode?.trim() || currentParts[3],
      ]
        .filter(Boolean)
        .join(", ");
    }

    // -----------------------------------------
    // UPDATE DATA
    // -----------------------------------------

    const updateData = {
      ...(name !== undefined && {
        name: name.trim(),
      }),

      ...(description !== undefined && {
        description: description.trim() || null,
      }),

      ...(city !== undefined && {
        city: city.trim() || null,
      }),

      ...(state !== undefined && {
        state: state.trim() || null,
      }),

      ...(country !== undefined && {
        country: country.trim() || null,
      }),

      ...(pincode !== undefined && {
        pincode: pincode.trim() || null,
      }),

      ...(location !== undefined && {
        location,
      }),

      ...(latitude !== undefined && {
        latitude: Number(latitude),
      }),

      ...(longitude !== undefined && {
        longitude: Number(longitude),
      }),

      ...(area !== undefined && {
        area: Number(area),
      }),

      ...(areaUnit !== undefined && {
        areaUnit,
      }),

      ...(imageUrl !== existingFarm.imageUrl && {
        imageUrl,
      }),

      ...(mainCrop !== undefined && {
        mainCrop: mainCrop.trim() || null,
      }),

      ...(farmStatus !== undefined && {
        farmStatus,
      }),
    };

    // -----------------------------------------
    // UPDATE
    // -----------------------------------------

    const farm = await prisma.farm.update({
      where: {
        id,
      },

      data: updateData,
    });

    return res.status(200).json({
      success: true,
      message: "Farm updated successfully",
      farm,
    });
  } catch (error) {
    console.error("UPDATE FARM ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update farm",
    });
  }
};

export const deleteFarm = async (req, res) => {
  try {
    const { id } = req.params;

    // -----------------------------------------
    // FIND FARM
    // -----------------------------------------

    const existingFarm = await prisma.farm.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingFarm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    // -----------------------------------------
    // DELETE FARM
    // -----------------------------------------

    await prisma.farm.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Farm deleted successfully",
    });
  } catch (error) {
    console.error("DELETE FARM ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete farm",
    });
  }
};

