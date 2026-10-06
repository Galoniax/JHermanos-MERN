import { Router } from "express";
import { getStorage } from "../../../core/config/cloudinary.js";

const upload = multer({
  storage: getStorage("products/temp"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Tipo de archivo no permitido. Solo se aceptan imágenes y videos.",
        ),
      );
    }
  },
});

const router = Router();

export default router;
