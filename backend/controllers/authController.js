import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    toast.error(error.response?.data?.message || error.message);
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    toast.error(error.response?.data?.message || error.message);
  }
};

export async function updateUserProfile(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    await UserModel.updateOne(
      { email: req.user.email },
      {
        name: req.body.name,
        avatar: req.body.avatar,
      },
    );
    const user = await UserModel.findOne({ email: req.user.email });
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: req.body.rememberme ? "30d" : "48h" },
    );
    res.json({ message: "Profile updated successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error });
  }
}

export async function changeUserPassword(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    await UserModel.updateOne(
      { email: req.user.email },
      { password: hashedPassword },
    );
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error: error });
  }
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.role == "admin") {
    return true;
  } else {
    return false;
  }
}

export function getUser(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  res.json({
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    avatar: req.user.avatar,
  });
}

export async function getAllUsers(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }
  try {
    const pageSizeInString = req.params.pageSize || "10";

    const pageNumberInString = req.params.pageNumber || "1";

    const pageSize = parseInt(pageSizeInString);

    const pageNumber = parseInt(pageNumberInString);

    const numberOfUsers = await UserModel.countDocuments();

    const numberOfPages = Math.ceil(numberOfUsers / pageSize);

    const users = await UserModel.find({})
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.json({
      users: users,
      totalPages: numberOfPages,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting users", error: error });
  }
}

export async function blockOrUnblockUser(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email: email });

    if (user == null) {
      res.status(404).json({ message: "user with given email not found" });
      return;
    }

    await UserModel.updateOne({ email: email }, { isBlocked: !user.isBlocked });

    res.json({
      message: user.isBlocked
        ? "User unblocked successfully"
        : "User blocked successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error blocking/unblocking user", error: error });
  }
}

export async function changeRole(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  const email = req.body.email;

  if (req.user.email == email) {
    res.status(400).json({
      message: "You cannot change your own role",
    });
    return;
  }
  try {
    const user = await UserModel.findOne({ email: email });

    if (user == null) {
      res.status(404).json({ message: "User with given email not found" });
      return;
    }

    await UserModel.updateOne(
      { email: email },
      { role: user.role == "admin" ? "customer" : "admin" },
    );
    res.json({
      message:
        user.role == "admin"
          ? "User role changed to customer successfully"
          : "User role changed to admin successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error changing user role", error: error });
  }
}
