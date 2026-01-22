import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerece Store",
      version: "1.0.0",
      description: "All API endpoints for Store project"
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  // 🔹 Absolute path relative to project root
   apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
