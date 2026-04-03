const userToPublic = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role
    ? {
        id: user.role.id,
        name: user.role.name,
      }
    : null,
});

module.exports = userToPublic;