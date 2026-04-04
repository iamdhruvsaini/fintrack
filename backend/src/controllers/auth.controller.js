const { StatusCodes } = require("http-status-codes");
const { sendResponse, sendError } = require("../utils");
const { authService } = require("../services");

const login = async (req, res) => {
	const { email, password } = req.body || {};

	if (!email || !password) {
		throw sendError("Email and password are required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
	}

	const { user, publicUser } = await authService.login({ email, password });

	await new Promise((resolve, reject) => {
		req.login({ id: user.id }, (error) => {
			if (error) {
				reject(sendError("Failed to create login session", StatusCodes.INTERNAL_SERVER_ERROR, "SESSION_LOGIN_FAILED"));
				return;
			}
			resolve();
		});
	});

	sendResponse(res, {
		message: "Login successful",
		data: {
			user: publicUser,
		},
	});
};

const register = async (req, res) => {
	const { name, email, password, roleName } = req.body || {};


	if (!name || !email || !password) {
		throw sendError("Name, email and password are required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
	}

	const { publicUser } = await authService.register({
		name,
		email,
		password,
		roleName,
	});

	sendResponse(res, {
		message: "Registration successful",
		statusCode: StatusCodes.CREATED,
		data: {
			user: publicUser,
		},
	});
};

const getProfile = async (req, res) => {
	const { publicUser } = await authService.getProfile(req.user);
	sendResponse(res, {
		message: "Profile fetched successfully",
		data: {
			user: publicUser,
		},
	});
};

module.exports = {
	login,
	register,
	getProfile,
};