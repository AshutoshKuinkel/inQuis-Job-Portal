"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_config_1 = require("./config/db.config");
const error_handler_middleware_1 = __importStar(require("./middlewares/error-handler.middleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI ?? '';
(0, db_config_1.ConnectDatabase)(DB_URI);
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONT_END_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json()); // for JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // for form-urlencoded bodies
//serving uploads as static files:
app.use('/uploads', express_1.default.static('uploads/'));
//importing routes:
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const List_jobs_routes_1 = __importDefault(require("./routes/List-jobs.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const featured_job_routes_1 = __importDefault(require("./routes/featured-job.routes"));
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'InQuis Job Portal'
    });
});
//using routes:
app.use('', auth_routes_1.default);
app.use('/user', user_routes_1.default);
app.use('/employer', job_routes_1.default);
app.use('', List_jobs_routes_1.default);
app.use('/jobs', application_routes_1.default);
app.use('', category_routes_1.default);
app.use('', featured_job_routes_1.default);
app.all('/{*all}', (req, res) => {
    const message = `Cannot ${req.method} @ ${req.originalUrl}`;
    throw new error_handler_middleware_1.default(message, 404);
});
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});
//using our middleware function:
app.use(error_handler_middleware_1.errorHandler);
