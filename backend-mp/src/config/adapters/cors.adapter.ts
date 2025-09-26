import cors from 'cors';

export const corsMiddleware = (acceptedOrigins: string) =>
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);

			const origins = acceptedOrigins.split(/[,;]/).map((o) => o.trim());

			if (origins.includes('*')) return callback(null, true);

			if (origins.includes(origin)) return callback(null, true);

			return callback(new Error('Not allowed by CORS'));
		},
		credentials: true
	});
