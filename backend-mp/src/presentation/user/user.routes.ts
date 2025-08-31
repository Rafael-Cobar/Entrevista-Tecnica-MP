import { Router } from 'express';
import { UserDB } from '../../data/sqlserver/user/user.db.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

// biome-ignore lint/complexity/noStaticOnlyClass: E
export class UserRoutes {
	static get routes(): Router {
		const router = Router();

		const userDB = new UserDB();
		const userService = new UserService(userDB);
		const userController = new UserController(userService);

		router.post('/', userController.registerUser);

		return router;
	}
}
