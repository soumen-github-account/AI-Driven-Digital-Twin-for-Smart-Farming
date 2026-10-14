export const getCurrentUser = async (req, res) => {
  try {
    console.log("called")
    return res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

