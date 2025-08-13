import { Router } from "express";
import isAuthenticated from "../middlewares/auth.js";

import { getDashboard } from "../controllers/adminController.js";

const router = new Router()

// @desc    Dashboard Home Page
// @route   GET /dashboard
router.get('/', isAuthenticated, getDashboard)

export default router