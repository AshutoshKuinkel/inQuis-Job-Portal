"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = exports.uploadFile = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const fs_1 = __importDefault(require("fs"));
const uploadFile = async (path, dir = "/") => {
    try {
        const { public_id, secure_url } = await cloudinary_config_1.default.uploader.upload(path, {
            unique_filename: true,
            folder: "inQuis-Job-Portal" + dir,
        });
        //delete image from uploads
        if (fs_1.default.existsSync(path)) {
            fs_1.default.unlinkSync(path);
        }
        console.log({ public_id, secure_url });
        return {
            public_id,
            path: secure_url,
        };
    }
    catch (err) {
        console.error("Cloudinary upload error", err);
        throw new error_handler_middleware_1.default(`Error uploading file.`, 500);
    }
};
exports.uploadFile = uploadFile;
const deleteFiles = async (public_ids) => {
    try {
        //Promise.all(arr_of_promises)
        const promiseRes = public_ids.map(async (public_id) => {
            return await cloudinary_config_1.default.uploader.destroy(public_id);
        });
        const res = await Promise.all(promiseRes);
        return true;
    }
    catch {
        throw new error_handler_middleware_1.default(`File delete error`, 500);
    }
};
exports.deleteFiles = deleteFiles;
