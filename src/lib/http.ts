// import envConfig from "@/config";
// import { normalizePath } from '@/lib/utils'
import { normalizePath } from "@/lib/utils";
import { LoginResponseDTO } from "@/schemaValidations/auth.schema";
import { redirect } from "next/navigation";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const envConfig = {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
};

type CustomOptions = Omit<RequestInit, "method"> & {
    baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
    message: string;
    errors: {
        field: string;
        message: string;
    }[];
};

export class HttpError extends Error {
    status: number;
    payload: {
        message: string;
        [key: string]: any;
    };
    constructor({ status, payload }: { status: number; payload: any }) {
        super("Http Error");
        this.status = status;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    status: 422;
    payload: EntityErrorPayload;
    constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
        super({ status, payload });
        this.status = status;
        this.payload = payload;
    }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient = () => typeof window !== "undefined";
const request = async <Response>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    options?: CustomOptions | undefined
) => {
    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }
    const baseHeaders: {
        [key: string]: string;
    } =
        body instanceof FormData
            ? {}
            : {
                  "Content-Type": "application/json",
              };
    if (isClient()) {
        const sessionToken = localStorage.getItem("sessionToken");
        if (sessionToken) {
            baseHeaders.Authorization = `Bearer ${sessionToken}`;
        }
    }
    // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
    // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

    const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        } as any,
        body,
        method,
    });
    const payload: Response = await res.json();
    const data = {
        status: res.status,
        payload,
    };
    // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError(
                data as {
                    status: 422;
                    payload: EntityErrorPayload;
                }
            );
        } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
            if (isClient()) {
                if (!clientLogoutRequest) {
                    clientLogoutRequest = fetch("/api/auth/logout", {
                        method: "POST",
                        body: JSON.stringify({ force: true }),
                        headers: {
                            ...baseHeaders,
                        } as any,
                    });
                    try {
                        await clientLogoutRequest;
                    } catch (error) {
                    } finally {
                        localStorage.removeItem("sessionToken");
                        localStorage.removeItem("sessionTokenExpiresAt");
                        clientLogoutRequest = null;
                        location.href = "/login";
                    }
                }
            } else {
                const sessionToken = (options?.headers as any)?.Authorization.split("Bearer ")[1];
                redirect(`/logout?sessionToken=${sessionToken}`);
            }
        } else {
            throw new HttpError(data);
        }
    }
    // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
    if (isClient()) {
        if (["auth/login", "auth/register"].some((item) => item === normalizePath(url))) {
            // const { token, expiresAt } = (payload as LoginResponseDTO).data;
            // localStorage.setItem("sessionToken", token);
            // localStorage.setItem("sessionTokenExpiresAt", expiresAt);
        } else if ("auth/logout" === normalizePath(url)) {
            localStorage.removeItem("sessionToken");
            localStorage.removeItem("sessionTokenExpiresAt");
        }
    }
    return data;
};

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, "body"> | undefined) {
        return request<Response>("GET", url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) {
        return request<Response>("POST", url, { ...options, body });
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) {
        return request<Response>("PUT", url, { ...options, body });
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, "body"> | undefined) {
        return request<Response>("DELETE", url, { ...options });
    },
};

export default http;

class Http {
    instance: AxiosInstance;
    refreshTokenRequest: Promise<string> | null;
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:4000/",
            timeout: 10000,
        });
        this.refreshTokenRequest = null;

        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                console.log(config);
                const access_token = localStorage.getItem("access_token");
                if (access_token) {
                    config.headers.Authorization = `Bearer ${access_token}`;
                }
                return config;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (config: AxiosResponse<any, any>) => config.data,
            (error: any) => {
                console.log("Error: ", error);
                if (error.response.status === 401 && error.response.data.name === "EXPIRED_ACCESS_TOKEN") {
                    this.refreshTokenRequest = this.refreshTokenRequest
                        ? this.refreshTokenRequest
                        : this.refreshToken().finally(() => {
                              this.refreshTokenRequest = null;
                          });

                    return this.refreshTokenRequest
                        .then((access_token) => {
                            error.response.config.Authorization = access_token;
                            return this.instance(error.response.config);
                        })
                        .catch((errorRefreshToken) => {
                            throw errorRefreshToken;
                        });
                }
                return Promise.reject(error);
            }
        );
    }

    get(url: string) {
        return this.instance.get(url);
    }

    post(url: string, body: any) {
        return this.instance.post(url, body);
    }

    postWith(url: string, body: any, options: AxiosRequestConfig<any>) {
        return this.instance.post(url, body, {
            ...options,
        });
    }

    private refreshToken = async () => {
        const refresh_token = localStorage.getItem("refresh_token");
        try {
            const res = await http.post("refresh-token", {
                refresh_token,
            });

            const { access_token } = res.payload as {
                access_token: string;
            };
            localStorage.setItem("access_token", access_token);

            return access_token;
        } catch (error: any) {
            localStorage.clear();
            throw error.response;
        }
    };
}
