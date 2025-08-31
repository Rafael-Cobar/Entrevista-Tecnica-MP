import type { Response } from "express";

interface Props {
	res: Response;
	data: unknown;
	message?: string;
	statusCode?: number;
}

export const handleSuccess = (props: Props) => {
	const { res, data, message, statusCode = 200 } = props;
	res.status(statusCode).json({ data, message, error: null });
};
