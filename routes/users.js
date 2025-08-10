import { Router } from "express";

import { login, logout, rememberMe } from "../controllers/userController.js";
import { handleLogin } from "../controllers/userController.js";
import { register } from "../controllers/userController.js";
import { createUser } from "../controllers/userController.js";
import authenticated from "../middlewares/auth.js";

const router = Router()



// @desc    Login Page
// @route    GET /users/login
router.get('/login', login)

// @desc    Login Handler
// @route    POST /users/login
router.post('/login', handleLogin, rememberMe)

// @desc    Logout Handler
// @route    GET /users/logout
router.get('/logout', authenticated, logout)

// @desc    Register Page
// @route    GET /users/register
router.get('/register', register)

// @desc    Handle User Registration
// @route    POST /users/register
router.post('/register', createUser)

export default router
