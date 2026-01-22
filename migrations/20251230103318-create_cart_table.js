export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("carts", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

      session_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      total: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: "0.00"
      },

      status: {
        type: Sequelize.ENUM("active", "abandoned", "completed"),
        defaultValue: "active"
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("carts");
  }
};
