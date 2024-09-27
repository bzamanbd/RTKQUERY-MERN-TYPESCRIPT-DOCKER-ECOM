"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const appErr_1 = __importDefault(require("../utils/appErr"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appRes_1 = __importDefault(require("../utils/appRes"));
const user_1 = require("../models/user");
const adminEmails_1 = __importDefault(require("../utils/adminEmails"));
const isValidEmail_1 = __importDefault(require("../utils/isValidEmail"));
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = require("../utils/imageProcessor");
const tryCatch_1 = __importDefault(require("../middlewares/tryCatch"));
const fs_1 = require("fs");
const signup = async (req, res, next) => {
    const payload = req.body;
    const avatar = req.file;
    if (!payload.name || !payload.email || !payload.password || !payload.phone || !payload.question || !payload.answer) {
        if (avatar)
            (0, fs_1.rm)(avatar.path, () => { console.log('avatar path deleted'); });
        return next((0, appErr_1.default)('name,email,password,phone,question and answer are required', 400));
    }
    if (payload.password.length < 6) {
        if (avatar)
            (0, fs_1.rm)(avatar.path, () => { console.log('avatar path deleted'); });
        return next((0, appErr_1.default)('Password must be at lest 6 characters', 400));
    }
    if (!(0, isValidEmail_1.default)(payload.email)) {
        if (avatar)
            (0, fs_1.rm)(avatar.path, () => { console.log('avatar path deleted'); });
        return next((0, appErr_1.default)('Invalid email format', 400));
    }
    try {
        const emailExists = await user_1.User.findOne({ email: payload.email });
        if (emailExists) {
            if (avatar)
                (0, fs_1.rm)(avatar.path, () => { console.log('avatar path deleted'); });
            return next((0, appErr_1.default)(`${payload.email} email is exists. Try another`, 401));
        }
        if (payload.role === 'admin' && !adminEmails_1.default.includes(payload.email)) {
            if (avatar)
                (0, fs_1.rm)(avatar.path, () => { console.log('avatar path deleted'); });
            return next((0, appErr_1.default)('You are not authorized to create an admin account', 403));
        }
        const hashedPass = await bcryptjs_1.default.hash(payload.password, 10);
        const hashedAnswer = await bcryptjs_1.default.hash(payload.answer, 10);
        const email = payload.email;
        const getRole = (email) => adminEmails_1.default.includes(email) ? 'admin' : payload.role;
        payload.password = hashedPass;
        payload.answer = hashedAnswer;
        payload.role = getRole(email);
        const user = new user_1.User(payload);
        await user.save();
        if (req.file) {
            const filename = await (0, imageProcessor_1.processImage)({
                inputPath: path_1.default.join('./temp', req.file.filename),
                outputDir: './public/avatars',
                imgWidth: 100,
                imgQuality: 80
            });
            user.avatar = path_1.default.join('./public/avatars', filename);
            await user.save();
            // Clean up temporary file after processing
            (0, imageProcessor_1.deleteFile)(path_1.default.join('./temp', req.file.filename));
        }
        user.password = undefined;
        user.answer = undefined;
        (0, appRes_1.default)(res, 201, '', 'Registration success', { user });
    }
    catch (e) {
        if (req.file) {
            (0, imageProcessor_1.deleteFile)(path_1.default.join('./temp', req.file.filename));
        } // Clean up on error
        return next((0, appErr_1.default)(e.message, 500));
    }
};
exports.signup = signup;
exports.login = (0, tryCatch_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next((0, appErr_1.default)('email and password are required', 400));
    if (!(0, isValidEmail_1.default)(email))
        return next((0, appErr_1.default)('Invalid email format', 400));
    const user = await user_1.User.findOne({ email });
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        return next((0, appErr_1.default)('Invalid Credentials', 401));
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey)
        return res.status(500).json({ error: 'Secret key is not defined' });
    const options = { expiresIn: '1h', algorithm: 'HS256' };
    const token = jsonwebtoken_1.default.sign({ id: user._id }, secretKey, options);
    (0, appRes_1.default)(res, 200, '', 'Login success!', {
        user: {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
            avatar: user?.avatar,
            question: user?.question,
            role: user?.role,
            isBanned: user?.isBanned,
            orders: user?.orders
        },
        token,
    });
});
