import axios, { type AxiosResponse, type Method } from "axios";

const API = import.meta.env.VITE_API;

const instanceAxios = axios.create({
	withCredentials: true,
	baseURL: API,
});

export interface ResponseApi<T> {
	error: string;
	data: T;
	message: string;
}

export interface CustomError {
	error: string;
	data: unknown;
	message: string;
}

interface RequestOptions {
	method: Method;
	url: string;
	body?: Record<string, unknown>;
	params?: Record<string, unknown>;
	headersExtras?: Record<string, string>;
}

const getHeaders = (
	headersExtras: Record<string, string> = {},
): Record<string, string> => ({
	"Content-Type": "application/json",
	...headersExtras,
});

// Request principal
// biome-ignore lint/suspicious/noExplicitAny: es necesario el any
const request = async <T = any>({
	method,
	url,
	body = {},
	params = {},
	headersExtras = {},
}: RequestOptions): Promise<T> => {
	try {
		const response: AxiosResponse<ResponseApi<T>> = await instanceAxios({
			method,
			url,
			data: body,
			params,
			headers: getHeaders(headersExtras),
		});

		return response.data.data as T;
		// biome-ignore lint/suspicious/noExplicitAny: es necesario el any
	} catch (error: any) {
		if (error?.response?.data?.error) throw error.response.data as CustomError;
		throw {
			error: "Servicio no disponible",
			message: "Servicio no disponible",
			data: null,
		} as CustomError;
	}
};

// Factory para crear métodos HTTP
const createRequestMethod =
	(method: Method) =>
	// biome-ignore lint/suspicious/noExplicitAny: es necesario el any
	<T = any>(options: Omit<RequestOptions, "method">): Promise<T> =>
		request<T>({ ...options, method });

// Export de helpers con factory
export const getAxios = createRequestMethod("GET");
export const postAxios = createRequestMethod("POST");
export const putAxios = createRequestMethod("PUT");
export const deleteAxios = createRequestMethod("DELETE");
export const patchAxios = createRequestMethod("PATCH");
