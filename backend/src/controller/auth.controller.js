import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    console.log("auth callback req.body", req.body);

    const { id, firstName, lastName, imageUrl } = req.body;

    // check if user already existrs
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // means that they are signing up
      await User.create({
        fullName: `${firstName} ${lastName}`,
        imageUrl: imageUrl,
        clerkId: id,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback in controller", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
