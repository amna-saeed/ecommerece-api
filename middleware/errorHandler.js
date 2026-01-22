const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message).join(', ');
    error = {
      statusCode: 400,
      message: 'Validation Error: ' + message
    };
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field';
    const value = err.errors[0]?.value || '';
    let message = `This ${field} already exists`;
    if (field === 'slug') {
      message = `A product with the slug '${value}' already exists. Please use a different slug.`;
    } else if (field === 'sku') {
      message = `A product with the SKU '${value}' already exists. Please use a different SKU.`;
    }
    error = {
      statusCode: 400,
      message: message
    };
  }

  // MySQL duplicate entry error (ER_DUP_ENTRY)
  if (err.code === 'ER_DUP_ENTRY') {
    let message = 'Duplicate entry. This record already exists.';
    if (err.sqlMessage && err.sqlMessage.includes('slug')) {
      const slugMatch = err.sqlMessage.match(/'([^']+)'/);
      const slug = slugMatch ? slugMatch[1] : '';
      message = `A product with the slug '${slug}' already exists. Please use a different slug.`;
    } else if (err.sqlMessage && err.sqlMessage.includes('sku')) {
      const skuMatch = err.sqlMessage.match(/'([^']+)'/);
      const sku = skuMatch ? skuMatch[1] : '';
      message = `A product with the SKU '${sku}' already exists. Please use a different SKU.`;
    }
    error = {
      statusCode: 400,
      message: message
    };
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error = {
      statusCode: 400,
      message: 'Invalid reference: The referenced record does not exist'
    };
  }

  // Sequelize database error
  if (err.name === 'SequelizeDatabaseError') {
    error = {
      statusCode: 500,
      message: 'Database error occurred'
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      statusCode: 401,
      message: 'Invalid token'
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      statusCode: 401,
      message: 'Token expired'
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
