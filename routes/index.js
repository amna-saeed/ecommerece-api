import express from "express";

const router = express.Router();

// login, register
import {validateRegister} from "../validations/userValidation.js";
import {validate} from "../middleware/validation.js";
import {register, login, updateUser, getUserById, changePassword} from "../controllers/userController.js";
import {validationLogin} from "../validations/userValidation.js"
import {validateUpdate} from "../validations/userValidation.js"
import {authorize, proceed} from "../middleware/auth.js"
import {validateUserId} from "../validations/userValidation.js"
import {validateChangePassword} from "../validations/userValidation.js"

// product&detail&update&delete
import {validateProductId, validateCreateProduct, validateUpdateProduct, validateProductQuery} from '../validations/productValidation.js'
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productController.js'


// login, register
router.post("/register", validateRegister, validate, register);
router.post("/login", validationLogin, validate, login );
router.put("/update-user/:id", proceed, validateUpdate, validate, updateUser)
router.get("/user/:id", proceed, validateUserId, validate, getUserById)
router.put("/change-password/id", proceed, validateUserId, validateChangePassword, validate, changePassword)

// product&detail&update&delete

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Stylish Women Watch"
 *         price:
 *           type: number
 *           example: 1200
 *         sku:
 *           type: string
 *           example: "SKU12345"
 *         stock:
 *           type: integer
 *           example: 50
 *         category:
 *           type: string
 *           example: "Watches"
 *         brand:
 *           type: string
 *           example: "Fossil"
 *         status:
 *           type: string
 *           enum: [active, inactive, draft]
 *           example: "active"
 *         featured:
 *           type: boolean
 *           example: false
 */
router.get("/products", validateProductQuery, validate, getProducts )

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Stylish Women Watch"
 *         price:
 *           type: number
 *           example: 1200
 *         sku:
 *           type: string
 *           example: "SKU12345"
 *         stock:
 *           type: integer
 *           example: 50
 *         category:
 *           type: string
 *           example: "Watches"
 *         brand:
 *           type: string
 *           example: "Fossil"
 *         status:
 *           type: string
 *           enum: [active, inactive, draft]
 *           example: "active"
 *         featured:
 *           type: boolean
 *           example: false
 */
router.get("/product/:id", validateProductQuery, validate, getProductById)

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Stylish Women Watch"
 *         price:
 *           type: number
 *           example: 1200
 *         sku:
 *           type: string
 *           example: "SKU12345"
 *         stock:
 *           type: integer
 *           example: 50
 *         category:
 *           type: string
 *           example: "Watches"
 *         brand:
 *           type: string
 *           example: "Fossil"
 *         status:
 *           type: string
 *           enum: [active, inactive, draft]
 *           example: "active"
 *         featured:
 *           type: boolean
 *           example: false
 */
router.post("/create-product", proceed, authorize('admin'), validateCreateProduct, validate, createProduct)

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Stylish Women Watch"
 *         price:
 *           type: number
 *           example: 1200
 *         sku:
 *           type: string
 *           example: "SKU12345"
 *         stock:
 *           type: integer
 *           example: 50
 *         category:
 *           type: string
 *           example: "Watches"
 *         brand:
 *           type: string
 *           example: "Fossil"
 *         status:
 *           type: string
 *           enum: [active, inactive, draft]
 *           example: "active"
 *         featured:
 *           type: boolean
 *           example: false
 */
router.put("/product-update/:id", proceed, authorize('admin'), validateUpdateProduct, validate, updateProduct)

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Stylish Women Watch"
 *         price:
 *           type: number
 *           example: 1200
 *         sku:
 *           type: string
 *           example: "SKU12345"
 *         stock:
 *           type: integer
 *           example: 50
 *         category:
 *           type: string
 *           example: "Watches"
 *         brand:
 *           type: string
 *           example: "Fossil"
 *         status:
 *           type: string
 *           enum: [active, inactive, draft]
 *           example: "active"
 *         featured:
 *           type: boolean
 *           example: false
 */
router.delete("/product/:id", proceed, authorize('admin'), validateProductId, validate, deleteProduct)



/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: |
 *       This API is used to register a new user in the system.
 *
 *       **Process:**
 *       1. Validates user input (email, password, first name, last name).
 *       2. Checks whether the email already exists.
 *       3. Hashes the password using bcrypt.
 *       4. Saves the user in the database.
 *       5. Generates a JWT token for authentication.
 *
 *       **Password Rules:**
 *       - Minimum 5 characters
 *       - At least one uppercase letter
 *       - At least one lowercase letter
 *       - At least one number
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: amna@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               first_name:
 *                 type: string
 *                 example: Amna
 *               last_name:
 *                 type: string
 *                 example: Saeed
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       400:
 *         description: Validation error or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: Email is already registered
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: |
 *       This API is used to authenticate an existing user.
 *
 *       **Process:**
 *       1. Validates email and password.
 *       2. Checks whether the user exists in the system.
 *       3. Compares the entered password with the hashed password.
 *       4. Verifies whether the user account is active.
 *       5. Updates the user's last login timestamp.
 *       6. Generates a JWT token for authenticated access.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: amna@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         email:
 *                           type: string
 *                           example: amna@example.com
 *                         firstName:
 *                           type: string
 *                           example: Amna
 *                         lastName:
 *                           type: string
 *                           example: Saeed
 *                         role:
 *                           type: string
 *                           example: customer
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       401:
 *         description: Invalid credentials or inactive account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/update-user/{id}:
 *   put:
 *     tags:
 *       - User Management
 *     description: |
 *       This API allows a user to update their profile information.
 *       - **Authentication required** (Bearer token in Authorization header)
 *       - Users can update their **own profile**.
 *       - Admin users can update **any user's profile**.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The ID of the user to update
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Amina
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 example: Saeed
 *                 description: User's last name
 *             required: []
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: Amina
 *                     lastName:
 *                       type: string
 *                       example: Saeed
 *                     email:
 *                       type: string
 *                       example: amna@example.com
 *
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: firstName
 *                       message:
 *                         type: string
 *                         example: First name must be between 2 and 50 characters
 *
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authorized, token missing
 *
 *       403:
 *         description: Forbidden (user not allowed to update this profile)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authorized to update this user
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - User Management
 *     
 *     description: |
 *       This API retrieves a single user by their ID.
 *
 *       **Access rules:**
 *       - Authentication is required (Bearer token).
 *       - Admin can fetch any user.
 *       - Normal users can fetch their own profile.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: User ID
 *
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: Amna
 *                     lastName:
 *                       type: string
 *                       example: Saeed
 *                     email:
 *                       type: string
 *                       example: amna@example.com
 *                     role:
 *                       type: string
 *                       example: customer
 *
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       403:
 *         description: Forbidden (not allowed to access this user)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/change-password/{id}:
 *   put:
 *     tags:
 *       - User Management
 *     description: |
 *       This API allows a user to change their password.
 *
 *       **Rules:**
 *       - User must be authenticated.
 *       - User can change their own password.
 *       - Admin can change any user's password.
 *       - Current password must be provided.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: User ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: OldPassword123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /products:
 *   get:
 *     summary: 
 *     description: |
 *       This API fetches all products from the database with optional filtering, search, sorting, and pagination.
 *
 *       **Process:**
 *       1. Accepts query parameters for pagination (`page`, `limit`), filtering (`category`, `status`, `featured`), search (`search`), and sorting (`sort`, `order`).
 *       2. Queries the database for matching products.
 *       3. Returns the list of products along with pagination info.
 *
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, draft]
 *         description: Filter products by status
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filter featured products
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name or description
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of products with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         pages:
 *                           type: integer
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: 
 *     description: |
 *       This API fetches the details of a single product by its ID, including its associated product details.
 *
 *       **Process:**
 *       1. Accepts the product ID in the path parameter.
 *       2. Queries the database for the product with the given ID.
 *       3. Returns the product information along with its details.
 *       4. Returns 404 if the product is not found.
 *
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to fetch
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /create-product:
 *   post:
 *     summary: 
 *     description: |
 *       This API is used by an admin to create a new product in the system.
 *
 *       **Process:**
 *       1. Validates the request body for required fields (name, price, sku).
 *       2. Generates a unique slug if not provided.
 *       3. Validates all optional fields (description, shortDescription, comparePrice, stock, category, brand, status, featured, images).
 *       4. Saves the product in the database.
 *       5. Returns the newly created product along with its details.
 *
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - sku
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Stylish Women Watch"
 *               slug:
 *                 type: string
 *                 example: "stylish-women-watch"
 *               description:
 *                 type: string
 *                 example: "A beautiful watch for women with stylish design"
 *               shortDescription:
 *                 type: string
 *                 example: "Elegant women's watch"
 *               price:
 *                 type: number
 *                 example: 1200
 *               comparePrice:
 *                 type: number
 *                 example: 1500
 *               sku:
 *                 type: string
 *                 example: "SKU12345"
 *               stock:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: "Watches"
 *               brand:
 *                 type: string
 *                 example: "Fossil"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, draft]
 *                 default: active
 *               featured:
 *                 type: boolean
 *                 default: false
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       path:
 *                         type: string
 *                       location:
 *                         type: string
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /product-update/{id}:
 *   put:
 *     summary: 
 *     description: |
 *       This API is used by an admin to update an existing product's information in the system.
 *
 *       **Process:**
 *       1. Validates the product ID in the path.
 *       2. Validates the input fields in the request body.
 *       3. Checks if the product exists in the database.
 *       4. Updates the product fields (name, price, comparePrice, stock, category, brand, status, featured, images).
 *       5. Returns the updated product along with details.
 *
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Watch Name"
 *               price:
 *                 type: number
 *                 example: 1300
 *               comparePrice:
 *                 type: number
 *                 example: 1500
 *               stock:
 *                 type: integer
 *                 example: 30
 *               category:
 *                 type: string
 *                 example: "Watches"
 *               brand:
 *                 type: string
 *                 example: "Fossil"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, draft]
 *               featured:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: 
 *     description: |
 *       This API allows an admin to delete a product from the system permanently.
 *
 *       **Process:**
 *       1. Validates the product ID in the path.
 *       2. Checks if the product exists in the database.
 *       3. Deletes the product and associated details (cascade delete).
 *       4. Returns a success message on completion.
 *
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Product not found
 */


export default router;
