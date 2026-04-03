const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const authRepository = require("../repository/auth.repository");
const { sendError, userToPublic } = require("../utils");

const login = async ({ email, password }) => {
	if (!email || !password) {
		throw sendError("Email and password are required", StatusCodes.BAD_REQUEST, "VALIDATION_ERROR", {
			fields: ["email", "password"],
		});
	}

	const user = await authRepository.findUserByEmail(email);

	if (!user) {
		throw sendError("Invalid credentials", StatusCodes.UNAUTHORIZED, "INVALID_CREDENTIALS");
	}

	if (user.status !== "active") {
		throw sendError("User account is inactive", StatusCodes.FORBIDDEN, "USER_INACTIVE");
	}

	if (user.role && user.role.status !== "active") {
		throw sendError("Assigned role is inactive", StatusCodes.FORBIDDEN, "ROLE_INACTIVE");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password_hash);

	if (!isPasswordValid) {
		throw sendError("Invalid credentials", StatusCodes.UNAUTHORIZED, "INVALID_CREDENTIALS");
	}

	return {
		user,
		publicUser: userToPublic(user),
	};
};

module.exports = {
	login,
};