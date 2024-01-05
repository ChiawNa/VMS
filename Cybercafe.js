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
 * /register/admin:
 *   post:
 *     summary: Create a Admin
 *     tags:
 *       - User Management
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
 *         password: 234@Aaa
 *         email: john@gmail.com
 */


/**
 * @swagger
 * /register/security:
 *   post:
 *     summary: Create a Security
 *     tags:
 *       - User Management
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
 *         - User Management
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successfully retrieved user information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "ayam"
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
 *     summary: Create a Visitor
 *     tags:
 *       - Visitor List
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
 *       summary: View Visitors
 *       tags:
 *         - Visitor List
 *       security:
 *         - bearerAuth: []
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
 * @openapi
 * paths:
 *   /delete/visitor/{idproof}:
 *     delete:
 *       summary: Delete Visitors
 *       tags:
 *         - Visitor List
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
 * /create/visitorlog/admin:
 *   post:
 *     summary: Create a visitorlog
 *     tags:
 *       - Visitor Log
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitorname:
 *                 type: string
 *               idproof:
 *                 type: string
 *               timespend:
 *                 type: string
 *               payment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Visitor Log created successfully
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
 *         idproof: XYZ123
 */


/**
 * @openapi
 * /view/visitorlog/admin:
 *   get:
 *     summary: View all visitor logs on by admin
 *     tags:
 *       - Visitor Log
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               - visitorname: ayam
 *                 idproof: 9999999
 *                 timespend: 2 hours
 *                 payment: $10
 *               - visitorname: Jane Doe
 *       401:
 *         description: Unauthorized
 */



/**
 * @swagger
 * /create/computer:
 *   post:
 *     summary: Create a computer's availability
 *     tags:
 *       - Computer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idproof:
 *                 type: string
 *               lanportno:
 *                 type: string
 *               available:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Computer created successfully
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
 *         idproof: XYZ123
 */


/**
 * @openapi
 * /view/computer/admin:
 *   get:
 *     summary: View all computer's availability by admin
 *     tags:
 *       - Computer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               - idproof: 9999999
 *                 lanportno: 317
 *                 available: yes
 *               - visitorname: Jane Doe
 *       401:
 *         description: Unauthorized
 */