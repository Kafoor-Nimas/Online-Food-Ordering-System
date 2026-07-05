import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader =
      req.get?.("authorization") ||
      req.get?.("x-access-token") ||
      req.headers.authorization ||
      req.headers["x-access-token"];
    let token = "";

    if (typeof authHeader === "string") {
      token = authHeader.replace(/^\s*Bearer\s*/i, "");
    } else if (Array.isArray(authHeader) && authHeader.length > 0) {
      token = authHeader[0].replace(/^\s*Bearer\s*/i, "");
    }

    if (!token && typeof req.body?.token === "string") {
      token = req.body.token;
    }
    if (!token && typeof req.query?.token === "string") {
      token = req.query.token;
    }
    if (!token && typeof req.cookies?.token === "string") {
      token = req.cookies.token;
    }

    if (typeof token === "string") {
      token = token.trim().replace(/^"|"$/g, "");
      if (
        token.toLowerCase() === "null" ||
        token.toLowerCase() === "undefined"
      ) {
        token = "";
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", {
      message: error.message,
      name: error.name,
      authorization: req.headers.authorization,
    });

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
