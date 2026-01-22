export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('product_details', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    specifications: {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {},
    },

    additional_info: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    size: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },

    color: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },

    weight: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },

    dimensions: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    warranty: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    return_policy: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  // Indexes (performance)
  await queryInterface.addIndex('product_details', ['product_id']);
}

export async function down(queryInterface) {
  await queryInterface.dropTable('product_details');
}

