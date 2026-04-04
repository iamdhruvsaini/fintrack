const { User, Role } = require("../models");
const CrudRepository = require("./crud.repository");

const userCrudRepository = new CrudRepository(User);

const findUserByEmail = (email) => {
	return User.findOne({
		where: { email },
		include: [
			{
				model: Role,
				as: "role",
			},
		],
	});
};

const findUserById = (id) => {
	return User.findOne({
		where: { id },
		include: [
			{
				model: Role,
				as: "role",
			},
		],
	});
};

const findActiveRoleByName = (name) => {
	return Role.findOne({
		where: {
			name,
			status: "active",
			is_deleted: false,
		},
	});
};

const createUser = (payload) => {
	return userCrudRepository.create(payload);
};

module.exports = {
	findUserByEmail,
	findUserById,
	findActiveRoleByName,
	createUser,
};