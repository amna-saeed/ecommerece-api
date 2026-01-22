export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },

    slug: {
      type: Sequelize.STRING(250),
      allowNull: false,
      unique: true,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    short_description: {
      type: Sequelize.STRING(250),
      allowNull: true,
    },

    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },

    compare_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },

    sku: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },

    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    category: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    brand: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    images: {
      type: Sequelize.JSON,
      allowNull: true,
    },

    status: {
      type: Sequelize.ENUM('active', 'inactive', 'draft'),
      defaultValue: 'active',
    },

    featured: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    rating: {
      type: Sequelize.DECIMAL(3, 2),
      defaultValue: 0,
    },

    review_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  // Indexes (performance)
  await queryInterface.addIndex('products', ['slug']);
  await queryInterface.addIndex('products', ['category']);
  await queryInterface.addIndex('products', ['status']);
}

export async function down(queryInterface) {
  await queryInterface.dropTable('products');
}
