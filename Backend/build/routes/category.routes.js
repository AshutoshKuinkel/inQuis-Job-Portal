"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
router.post('/category/create', (0, auth_middleware_1.authenticate)(enum_types_1.admin), category_controller_1.createCategory);
router.get('/categories', category_controller_1.fetchCategories);
exports.default = router;
