const express = require('express');
const router = express.Router();
const whoAmIControiller = require("../controller/auth/whoami.controller")
const auth = require('../middleware/authenticate.mw');
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      whoAmI:
 *          type: object
 *          properties:
 *              status:
 *                  type: srting
 *                  description: Status of the response 00 sucessful, 99 faild
 *              data:
 *                  type: array
 *                  items: 
 *                      properties:
 *                          UserId:
 *                              type: int
 *                              description: User ID
 *                          userName:
 *                              type: string
 *                              description: The user name
 *                          userEmail:
 *                              type: string
 *                              description: Email address
 *                          userContactNo:
 *                              type: string
 *                              description: User contact no. 
 *          example:
 *              userName: "indu"
 *              password: "sample1"
 */

/**
 * @swagger
 * tags:
 *  name: whoAmI
 *  description: The Payroll Who Am I endpoint
 */

/**
 * @swagger
 * /api/v1/whoAmI:
 *  get:
 *      summary: User details
 *      tags: [whoAmI]
 *      responses:
 *          200:
 *              description: sucessful
 *              contens:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/whoAmI'
 *          404: 
 *              description: Invalid JWT
 *          500:
 *              description: Error in processing the request
 */

router.get('/', whoAmIControiller.jwtDetails);

module.exports = router;
