export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cart_items", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "carts",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      sub_total: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: "0.00"
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
    await queryInterface.dropTable("cart_items");
  }
};
