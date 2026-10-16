import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller.js';

import { validate } from '../../../core/middleware/validation.js';
import { isAuthenticated } from '../../../core/middleware/isAuthenticated.js';

const router = Router();

const controller = new ContactController();

router.post('/', controller.create);

router.get('/', isAuthenticated, controller.list);

export default router;
