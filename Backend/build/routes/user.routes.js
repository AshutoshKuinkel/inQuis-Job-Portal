"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
router.get('/profile', (0, auth_middleware_1.authenticate)(), user_controller_1.viewProfile);
router.put('/updateProfile', (0, auth_middleware_1.authenticate)(enum_types_1.seeker), user_controller_1.updateSeekerProfile);
router.put('/updateProfile', (0, auth_middleware_1.authenticate)(enum_types_1.employer), user_controller_1.updateEmployerProfile);
exports.default = router;
