const { StatusCodes } = require("http-status-codes");
const { sendResponse, sendError } = require("../utils");
const authService = require("../services/auth.service");

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

module.exports = {
	login,
};