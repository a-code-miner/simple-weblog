import { Router } from "express";
import isAuthenticated from "../middlewares/auth.js";

import { getDashboard, getAddPost } from "../controllers/adminController.js";

const router = new Router()

// @desc    Dashboard Home Page
// @route   GET /dashboard
router.get('/', isAuthenticated, getDashboard)

// @desc    Add post
// @route   GET /dashboard/add-post
router.get('/add-post', isAuthenticated, getAddPost)

export default router