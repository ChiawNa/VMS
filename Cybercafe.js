/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     tags:
 *       - Login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: User is created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         password: Xyz_123
 */

/**
 * @swagger
 * /create/security:
 *   post:
 *     summary: Create a Security
 *     tags:
 *       - Security
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         password: 567abc
 *         email: John@gmail.com
 */


/**
 * @swagger
 * /create/test/admin:
 *   post:
 *     summary: Testing
 *     tags:
 *       - Admin Management
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         password: 234@Aaa
 *         email: john@gmail.com
 */


/**
 * @swagger
 * /create/admin:
 *   post:
 *     summary: Create a Admin
 *     tags:
 *       - Admin Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         password: 234aaa
 *         email: chiawna@gmail.com
 */



/**
 * @openapi
 * paths:
 *   /view/user/admin:
 *     get:
 *       summary: View Users
 *       tags:
 *         - Admin Management
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successfully retrieved user information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "abu"
 *                     id: "999999999"
 *         '401':
 *           description: Unauthorized. Only admin can view
 *           content:
 *             application/json:
 *               example:
 *                 error: "Unauthorized"
 *         '500':
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               example:
 *                 error: "Internal Server Error"
 */
/**



/**
 * @swagger
 * /create/visitor/admin:
 *   post:
 *     summary: Admin create a Visitor
 *     tags:
 *       - Visitor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               timespend:
 *                 type: string
 *               age:
 *                 type: string
 *               phone number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Visitor created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         name: JohnDoe
 *         password: XYZ123
 *         timespend: 1
 *         phone number: 011234567
 */


/**
 * @openapi
 * paths:
 *   /view/visitor/admin:
 *     get:
 *       summary: Admin view visitors
 *       tags:
 *         - Visitor
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successfully retrieved visitor information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "abu"
 *                     timespend: "2"
 *                     age: "14"
 *                     phone number: "0124567890"
 *         '401':
 *           description: Unauthorized. Only admin can view
 *           content:
 *             application/json:
 *               example:
 *                 error: "Unauthorized"
 *         '500':
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               example:
 *                 error: "Internal Server Error"
 */

/**
 * @openapi
 * paths:
 *   /delete/visitor/{idproof}:
 *     delete:
 *       summary: Delete Visitors
 *       tags:
 *         - Visitor
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: idproof
 *           required: true
 *       responses:
 *         '200':
 *           description: Successfully retrieved visitor information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "ayam"
 *                     idproof: "999999999"
 *                     entrytime: "1530"
 *         '401':
 *           description: Unauthorized. Only admin can view
 *           content:
 *             application/json:
 *               example:
 *                 error: "Unauthorized"
 *         '500':
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               example:
 *                 error: "Internal Server Error"
 */


/** 
* @swagger
* /issue/visitorpass:
*   post:
*     summary: Issue a Visitor Pass
*     tags:
*       - Visitor Pass
*     security:
*       - bearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
 *               name:
 *                 type: string
 *               timespend:
 *                 type: string
 *               age:
 *                 type: string
 *               phonenumber:
 *                 type: string
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             example:
*               message: Visitor Pass issued successfully
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             example:
*               error: Invalid input data
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             example:
*               error: Unauthorized
*/


/**
 * @openapi
 * /view/visitorpass/admin:
 *   get:
 *     summary: View Visitor Passes
 *     tags:
 *       - Visitor Pass
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               - visitorname: Dr Lim
 *                 idproof: B0987
 *                 timespend: 2 hours 30 minutes
 *                 payment: $10
 *               - visitorname: Jane Doe
 *                 idproof: J12345
 *                 timespend: 1 hour
 *                 payment: $5
 *       401:
 *         description: Unauthorized
 */