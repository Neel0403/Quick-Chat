import { Router } from "express"
import AuthController from "../controllers/AuthController.js"
import authMiddleware from "../middlewares/AuthMiddleware.js"
import ChatGroupController from "../controllers/ChatGroupController.js"
import ChatGroupUserController from "../controllers/ChatGroupUserController.js"
import ChatsController from "../controllers/ChatsController.js"

const router = Router()

// Auth Routes
router.post("/auth/login", AuthController.login)

// Chat Group Routes
router.post("/chat-group", authMiddleware, ChatGroupController.store)           // create
router.get("/chat-group", authMiddleware, ChatGroupController.index)            // get all
router.get("/chat-group/:id", ChatGroupController.show)                         // get one
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update)       // update one
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy)   // delete one

// Chat Group Users
router.get("/chat-group-users", ChatGroupUserController.index)   // get all users in that chat group
router.post("/chat-group-users", ChatGroupUserController.store)   // add new user in that chat group

// chat messages
router.get("/chats/:groupId", ChatsController.index)   // get all chats


export default router;