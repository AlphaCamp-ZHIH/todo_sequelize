"use strict";
const bcrypt = require("bcryptjs");
const SEED_USER = {
  name: "user1",
  email: "user1@example.com",
  password: "12345678",
};
const { name, email, password } = SEED_USER;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert(
        "Users",
        [
          {
            name,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      )
      .then((userId) =>
        queryInterface.bulkInsert(
          "Todos",
          Array.from({ length: 9 }).map((_, i) => ({
            name: `name-${i}`,
            UserId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
          {}
        )
      );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface
      .bulkDelete("Todos", null, {})
      .then(() => queryInterface.bulkDelete("Users", null, {}));
  },
};
