const { StatusCodes } = require("http-status-codes");
const { sendResponse, sendError } = require("../utils");
const { authService } = require("../services");
const { validateLoginBody, validateRegisterBody } = require("../validators");

const login = async (req, res) => {
	validateLoginBody(req.body);

	const { email, password } = req.body || {};

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
	validateRegisterBody(req.body);

	const { name, email, password, roleName } = req.body || {};

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

const logout = async (req, res) => {
	await authService.logout(req);

	res.clearCookie("connect.sid", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	});

	sendResponse(res, {
		message: "Logout successful",
	});
};

module.exports = {
	login,
	register,
	getProfile,
	logout,
};