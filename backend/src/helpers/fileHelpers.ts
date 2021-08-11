import multer from "multer";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads");
    },
    filename: (_req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") +
                "-" +
                file.originalname
        );
    },
});

const fileFilter = (_req: any, file: any, cb: any) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
