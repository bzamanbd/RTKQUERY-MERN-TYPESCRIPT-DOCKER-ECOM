"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOwnAccount = exports.updatePassword = exports.resetPassword = exports.fetchQuestion = exports.updateProfile = exports.fetchProfile = exports.fetchUsers = void 0;
const appErr_1 = __importDefault(require("../utils/appErr"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const appRes_1 = __importDefault(require("../utils/appRes"));
const user_model_1 = __importDefault(require("../models/user_model"));
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = require("../utils/imageProcessor");
const oldImageRemover_1 = require("../utils/oldImageRemover");
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
exports.fetchUsers = (0, tryCatch_1.default)(async (req, res, next) => {
    const search = req.query.search || "";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 5);
    const searchRexExp = new RegExp('.*' + search + '.*', 'i');
    const filter = {
        $or: [
            { name: { $regex: searchRexExp } },
            { email: { $regex: searchRexExp } },
            { phone: { $regex: searchRexExp } }
        ]
    };
    const option = { password: 0 };
    const users = await user_model_1.default.find(filter, option).limit(limit).skip((page - 1) * 5);
    const count = await user_model_1.default.find(filter).countDocuments();
    if (users.length < 1)
        return (0, appRes_1.default)(res, 200, '', `${users.length} user found!`, { users });
    // users.forEach(user =>user.password = undefined)    
    (0, appRes_1.default)(res, 200, '', `${users.length} users found!`, {
        users,
        pagination: {
            totalUsers: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            prevPage: (page - 1) > 0 ? (page - 1) : null,
            nextPage: (page + 1) <= Math.ceil(count / limit) ? page + 1 : null,
        }
    });
});
exports.fetchProfile = (0, tryCatch_1.default)(async (req, res, next) => {
    const _id = req.user?.id;
    if (!_id)
        return next((0, appErr_1.default)('_id is required', 400));
    const user = await user_model_1.default.findById(_id);
    if (!user)
        return next((0, appErr_1.default)('User not found!', 404));
    user.password = undefined;
    (0, appRes_1.default)(res, 200, '', `${user.name}'s profile`, { user });
});
const updateProfile = async (req, res, next) => {
    const _id = req.user?.id;
    const payload = req.body;
    if (!_id)
        return next((0, appErr_1.default)('_id is required', 400));
    try {
        // Validate the request body (additional validation can be added as needed)
        if (!payload)
            return next((0, appErr_1.default)('No data provided for update', 400));
        const existUser = await user_model_1.default.findById(_id);
        if (!existUser)
            return next((0, appErr_1.default)('User not found!', 404));
        // No one can change the predefined admin emails
        if (existUser.role === 'admin' && payload.email)
            return next((0, appErr_1.default)(`You don't have permission to change the admin email`, 400));
        if (req.file) {
            // Get && delete the old avatar from db
            (0, oldImageRemover_1.oldImageRemover)({ existImage: existUser.avatar });
            const filename = await (0, imageProcessor_1.processImage)({
                inputPath: path_1.default.join('./temp', req.file.filename),
                outputDir: './public/avatars',
                imgWidth: 100,
                imgQuality: 80
            });
            payload.avatar = path_1.default.join('./public/avatars', filename);
            // Clean up temporary file after processing
            (0, imageProcessor_1.deleteFile)(path_1.default.join('./temp', req.file.filename));
        }
        const user = await user_model_1.default.findByIdAndUpdate(_id, { $set: payload }, { new: true, runValidators: true });
        if (!user)
            return next((0, appErr_1.default)('Profile is not updated', 400));
        (0, appRes_1.default)(res, 200, '', 'Profile update success!', { user });
    }
    catch (e) {
        if (req.file) {
            (0, imageProcessor_1.deleteFile)(path_1.default.join('./temp', req.file.filename)); // Clean up on error
        }
        return next((0, appErr_1.default)(e.message, 500));
    }
};
exports.updateProfile = updateProfile;
exports.fetchQuestion = (0, tryCatch_1.default)(async (req, res, next) => {
    const { email } = req.body;
    if (!email)
        return next((0, appErr_1.default)('email is required', 400));
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        return next((0, appErr_1.default)('User not found!', 404));
    const question = user.question;
    (0, appRes_1.default)(res, 200, '', `${user.name}'s question`, { question });
});
exports.resetPassword = (0, tryCatch_1.default)(async (req, res, next) => {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer)
        return next((0, appErr_1.default)('email,newPassword and answer are required', 400));
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        return next((0, appErr_1.default)('User not found!', 404));
    const isMatchAnswer = await bcryptjs_1.default.compare(answer, user.answer);
    if (!isMatchAnswer)
        return next((0, appErr_1.default)('Invalid answer', 400));
    const hashedAnswer = await bcryptjs_1.default.hash(answer, 10);
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    user.answer = hashedAnswer;
    user.password = hashedPassword;
    await user.save();
    user.password = undefined;
    (0, appRes_1.default)(res, 200, '', 'Password reset success!', { user });
});
exports.updatePassword = (0, tryCatch_1.default)(async (req, res, next) => {
    const _id = req.user?.id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
        return next((0, appErr_1.default)('oldPassword and newPassword are required', 400));
    const user = await user_model_1.default.findById({ _id });
    if (!user)
        return next((0, appErr_1.default)('User not found!', 404));
    const isMatchOldPassword = await bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isMatchOldPassword)
        return next((0, appErr_1.default)('Invalid old password', 400));
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    user.password = undefined;
    (0, appRes_1.default)(res, 200, '', 'Password update success!', { user });
});
exports.deleteOwnAccount = (0, tryCatch_1.default)(async (req, res, next) => {
    const _id = req.user?.id;
    if (!_id)
        return next((0, appErr_1.default)('_id is required', 400));
    const user = await user_model_1.default.findById({ _id });
    if (!user)
        return next((0, appErr_1.default)('User not found!', 404));
    await user_model_1.default.findByIdAndDelete({ _id });
    (0, appRes_1.default)(res, 200, '', 'Your account is deleted successfully!', {});
});