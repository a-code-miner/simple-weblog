import { Router } from "express";

import { login } from "../controllers/userController.js";
import { register } from "../controllers/userController.js";
import { createUser } from "../controllers/userController.js";

const router = Router()



// @desc    Login Page
// @route    GET /users/login
router.get('/login', login)

// @desc    Register Page
// @route    GET /users/register
router.get('/register', register)

// @desc    Handle User Registration
// @route    POST /users/register
router.post('/register', createUser)

export default router
