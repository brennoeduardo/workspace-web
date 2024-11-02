type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
    method: HTTPMethod;
    headers?: HeadersInit;
    body?: string;
}

const { $config } = useNuxtApp();
const callBackURL = $config.public.API_URL || 'http://localhost:8000/api';

const request = async <T>(url: string, options: RequestOptions): Promise<T> => {
    try {
        const fullURL = `${callBackURL}/${url}`;
        const response = await fetch(fullURL, {
            ...options,
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Erro na requisição a ${fullURL}:`, errorData);
            throw new Error(errorData.message || 'Erro na requisição');
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const get = async <T>(url: string, options?: any): Promise<T> => {
    return request<T>(url, { method: 'GET', ...options });
};

export const post = async <T>(url: string, body: unknown): Promise<T> => {
    return request<T>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
};

export const put = async <T>(url: string, body: unknown): Promise<T> => {
    const options: RequestOptions = {
        method: 'PUT',
        body: body ,
    };

    if (!(body instanceof FormData)) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(body);
    }

    return request<T>(url, options);
};

export const remove = async <T>(url: string): Promise<T> => {
    return request<T>(url, { method: 'DELETE' });
};