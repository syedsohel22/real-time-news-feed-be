/**
 * @swagger
 * tags:
 *   name: WebSocket
 *   description: Real-time events using Socket.io
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SocketConnection:
 *       type: object
 *       properties:
 *         event:
 *           type: string
 *           example: "connection"
 *         description:
 *           type: string
 *           example: "Triggered when a new client connects"
 *     SocketDisconnect:
 *       type: object
 *       properties:
 *         event:
 *           type: string
 *           example: "disconnect"
 *         description:
 *           type: string
 *           example: "Triggered when a client disconnects"
 */

/**
 * @swagger
 * /socket:
 *   get:
 *     summary: WebSocket Events
 *     description: List of WebSocket events used in the application.
 *     responses:
 *       200:
 *         description: WebSocket event documentation.
 */
