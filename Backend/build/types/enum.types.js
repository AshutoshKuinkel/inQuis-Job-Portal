"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.everyone = exports.admin = exports.employer = exports.seeker = exports.categories = exports.applicationStatus = exports.job_type = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SEEKER"] = "SEEKER";
    Role["EMPLOYER"] = "EMPLOYER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
var job_type;
(function (job_type) {
    job_type["FULL_TIME"] = "Full-Time";
    job_type["PART_TIME"] = "Part-Time";
    job_type["CASUAL"] = "Casual";
})(job_type || (exports.job_type = job_type = {}));
var applicationStatus;
(function (applicationStatus) {
    applicationStatus["PENDING"] = "PENDING";
    applicationStatus["ACCEPTED"] = "ACCEPTED";
    applicationStatus["REJECTED"] = "REJECTED";
})(applicationStatus || (exports.applicationStatus = applicationStatus = {}));
var categories;
(function (categories) {
    categories["Technology"] = "Technology";
    categories["Design"] = "Design";
    categories["Marketing"] = "Marketing";
    categories["Sales"] = "Sales";
    categories["Mobile"] = "Mobile";
    categories["Security"] = "Security";
    categories["Healthcare"] = "Healthcare";
    categories["Engineering"] = "Engineering";
})(categories || (exports.categories = categories = {}));
exports.seeker = [Role.SEEKER];
exports.employer = [Role.EMPLOYER];
exports.admin = [Role.ADMIN];
exports.everyone = [...exports.seeker, ...exports.employer, ...exports.admin];
