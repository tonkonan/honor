"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
// Перечисление ролей пользователя - должно соответствовать Prisma схеме
var UserRole;
(function (UserRole) {
    UserRole["CITIZEN"] = "CITIZEN";
    UserRole["REPRESENTATIVE"] = "REPRESENTATIVE";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
