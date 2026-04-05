const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { authRepository } = require("../repository");
const { sendError, userToPublic } = require("../utils");

const DEFAULT_REGISTER_ROLE = "viewer";

const login = async ({ email, password }) => {
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

const register = async ({ name, email, password, roleName = DEFAULT_REGISTER_ROLE }) => {
	const normalizedEmail = email.trim().toLowerCase();
	const normalizedRoleName = (roleName || DEFAULT_REGISTER_ROLE).trim().toLowerCase();

	const existingUser = await authRepository.findUserByEmail(normalizedEmail);

	if (existingUser) {
		throw sendError("Email already registered", StatusCodes.CONFLICT, "EMAIL_ALREADY_EXISTS");
	}

	const role = await authRepository.findActiveRoleByName(normalizedRoleName);

	if (!role) {
		throw sendError("Invalid or inactive role", StatusCodes.BAD_REQUEST, "INVALID_ROLE");
	}

	const password_hash = await bcrypt.hash(password, 10);

	const createdUser = await authRepository.createUser({
		name: name.trim(),
		email: normalizedEmail,
		password_hash,
		role_id: role.id,
		status: "active",
		is_deleted: false,
	});

	const user = await authRepository.findUserById(createdUser.id);
	

	return {
		user,
		publicUser: userToPublic(user),
	};
};

const getProfile = async (user) => {
	if (user.status !== "active") {
		throw sendError("User account is inactive", StatusCodes.FORBIDDEN, "USER_INACTIVE");
	}

	if (user.role && user.role.status !== "active") {
		throw sendError("Assigned role is inactive", StatusCodes.FORBIDDEN, "ROLE_INACTIVE");
	}

	return {
		user,
		publicUser: userToPublic(user),
	};
};

const logout = async (req) => {
	await new Promise((resolve, reject) => {
		req.logout((error) => {
			if (error) {
				reject(sendError("Failed to logout user", StatusCodes.INTERNAL_SERVER_ERROR, "LOGOUT_FAILED"));
				return;
			}
			resolve();
		});
	});

	if (req.session) {
		await new Promise((resolve, reject) => {
			req.session.destroy((error) => {
				if (error) {
					reject(sendError("Failed to destroy session", StatusCodes.INTERNAL_SERVER_ERROR, "SESSION_DESTROY_FAILED"));
					return;
				}
				resolve();
			});
		});
	}
};

module.exports = {
	login,
	register,
	getProfile,
	logout,
};