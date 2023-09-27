const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize Express application
const app = express();

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Botson API',
      version: '1.0.0',
      description: 'Botson API documentation',
    },
  },
  apis: ['./app.js'],
};

// Initialize Swagger JSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Use Swagger UI as middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: query
 *       name: api_key
 *   schemas:
 *     RevenueResponse:
 *       type: object
 *       additionalProperties:
 *         type: object
 *         additionalProperties:
 *           type: object
 *           properties:
 *             Amount:
 *               type: number
 *             Transactions:
 *               type: integer
 *             CPC:
 *               type: number
 *             Currency:
 *               type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 * 
 * /botson-api:
 *   get:
 *     summary: Get revenue data
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [revenue]
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: last_days
 *         schema:
 *           type: integer
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RevenueResponse'
 *       400:
 *         description: Bad request - Missing mandatory fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid API key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.get('/botson-api', (req, res) => {
  // Implement the API logic here
  // For demonstration purposes, we'll just return a sample response
  res.json({
    "#deal-id-1": {
      "2023-09-27": {
        "Amount": 9.25,
        "Transactions": 37,
        "CPC": 0.25,
        "Currency": "GBP"
      },
      "2023-09-26": {
        "Amount": 9.25,
        "Transactions": 37,
        "CPC": 0.25,
        "Currency": "GBP"
      }
    },
    "#deal-id-2": {
      "2023-09-27": {
        "Amount": 9.25,
        "Transactions": 37,
        "CPC": 0.25,
        "Currency": "GBP"
      },
      "2023-09-26": {
        "Amount": 9.25,
        "Transactions": 37,
        "CPC": 0.25,
        "Currency": "GBP"
      }
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
