const { User, Role } = require("../models");

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

module.exports = {
	findUserByEmail,
};