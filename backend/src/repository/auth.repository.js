const models = require("../models");
const CrudRepository = require("./crud.repository");

const userCrudRepository = new CrudRepository(models.User);
const roleInclude = [
	{
		model: models.Role,
		as: "role",
	},
];

const findUserByEmail = (email) => {
	return userCrudRepository.getOne(
		{ email },
		{
			include: roleInclude,
		}
	);
};

const findUserById = (id) => {
	return userCrudRepository.getById(id, {
		include: roleInclude,
	});
};

const findActiveRoleByName = (name) => {
	return models.Role.findOne({
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