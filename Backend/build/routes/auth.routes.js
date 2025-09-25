"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
router.post('/signup', auth_controller_1.registerUser);
router.post('/signup/employer', auth_controller_1.registerEmployer);
router.post('/login', auth_controller_1.login);
router.post('/logout', auth_controller_1.logout);
router.get('/me', (0, auth_middleware_1.authenticate)(enum_types_1.everyone), auth_controller_1.profile);
exports.default = router;
