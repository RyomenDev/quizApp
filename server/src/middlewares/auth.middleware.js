import jwt from "jsonwebtoken";
import conf from "../conf/conf.js";

const JWT_SECRET = conf.JWT_SECRET;

export async function verifyToken(req, res, next) {
  //   console.log("req.headers");

  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log({ decoded });

    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
