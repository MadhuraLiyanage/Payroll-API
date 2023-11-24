const express = require('express');
const router = express.Router();
const util = require("../util/common.util")
const authController = require('../controller/auth/auth.controller');
/**
 * @swagger
 * components:
 *  schemas:
 *      Auth:
 *          type: object
 *          required:
 *              - userName
 *              - password         
 *          properties:
 *              status:
 *                  type: srting
 *                  description: Status of the response 00 sucessful, 99 faild
 *              message:
 *                  type: string
 *                  description: response message
 *              tockenStatus:
 *                  type: string
 *                  description: Status of the tocken
 *              userID: 
 *                  type: string
 *                  description: Requested user ID
 *              data:
 *                  type: array
 *                  items: 
 *                      properties:
 *                          token:
 *                              type: string
 *                              description: JWT token after validation the user
 *                          id:
 *                              type: int
 *                              description: The auto-generated id of the user
 *                          userName:
 *                              type: string
 *                              description: The user name
 *                          userEmail:
 *                              type: string
 *                              description: Email address
 *                          isUserActive:
 *                              type: bool
 *                              description: User active/inactive 
 *          example:
 *              userName: "indu"
 *              password: "sample1"
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Payroll autherization API
 */

/**
 * @swagger
 * /api/v1/auth:
 *  post:
 *      summary: User validation and returns JWT token
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Auth'
 *      responses:
 *          200:
 *              description: User authenticated sucessfully
 *              contens:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Auth'
 *          404: 
 *              description: User not found
 *          500:
 *              description: Error in processing the request
 */
router.post('/', authController.user_login);

module.exports = router;
