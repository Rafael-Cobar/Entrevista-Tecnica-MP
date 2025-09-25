export const ROUTES = Object.freeze({
	login: "/",
	home: "/home",
	case_management: {
		create_case: "/cases/create",
		cases: "/cases",
		case: "/case",
		assign_user: {
			path: "/cases/update-user/:idCase",
			path_navigate: "/cases/update-user",
		},
	},
});
