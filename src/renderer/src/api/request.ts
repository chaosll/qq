// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {BASE_URL, TIME_OUT} from "./config";

// 统一的接口返回格式
type Result<T> = {
    code: number;
    message: string;
    result: T;
};

// TODO: 添加更多响应状态码的类型定义
type HttpStatusMessages = {
    [key: number]: string;
};

// 预定义的HTTP状态码消息映射
const HTTP_STATUS_MESSAGES: HttpStatusMessages = {
    400: "请求错误(400)",
    401: "未授权，请重新登录(401)",
    403: "拒绝访问(403)",
    404: "请求出错(404)",
    408: "请求超时(408)",
    500: "服务器错误(500)",
    501: "服务未实现(501)",
    502: "网络错误(502)",
    503: "服务不可用(503)",
    504: "网络超时(504)",
    505: "HTTP版本不受支持(505)"
};

/**
 * 封装的Axios请求类
 * @class Request
 */
export class Request {
    private instance: AxiosInstance;
    private readonly baseConfig: AxiosRequestConfig = { 
        baseURL: BASE_URL, 
        timeout: TIME_OUT 
    };

    constructor(config: AxiosRequestConfig = {}) {
        this.instance = axios.create({
            ...this.baseConfig,
            ...config
        });
        
        this.setupInterceptors();
    }

    /**
     * 设置请求和响应拦截器
     * @private
     */
    private setupInterceptors(): void {
        // 请求拦截器
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // TODO: 实现请求重试机制
                // TODO: 添加请求加密功能
                const token = localStorage.getItem("token");
                if (token && config.headers) {
                    config.headers.Authorization = token;
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
                return config;
            },
            (error: any) => {
                // TODO: 添加请求错误日志记录
                return Promise.reject(error);
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // TODO: 添加响应数据解密功能
                return response;
            },
            (error: any) => {
                const status = error.response?.status;
                const message = HTTP_STATUS_MESSAGES[status] || `连接出错(${status})!`;
                
                // TODO: 实现统一的错误通知机制
                // TODO: 添加错误日志上报功能
                
                if (status === 401) {
                    // TODO: 实现统一的登出逻辑
                    console.warn('用户token已过期，需要重新登录');
                }

                return Promise.reject({
                    status,
                    message,
                    error
                });
            }
        );
    }

    /**
     * 通用请求方法
     * @param config 请求配置
     */
    public async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        try {
            return await this.instance.request(config);
        } catch (error) {
            // TODO: 添加请求失败重试机制
            return Promise.reject(error);
        }
    }

    /**
     * GET请求
     * @param url 请求地址
     * @param config 请求配置
     */
    public async get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    /**
     * POST请求
     * @param url 请求地址
     * @param data 请求数据
     * @param config 请求配置
     */
    public async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    /**
     * PUT请求
     * @param url 请求地址
     * @param data 请求数据
     * @param config 请求配置
     */
    public async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    /**
     * DELETE请求
     * @param url 请求地址
     * @param config 请求配置
     */
    public async delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}

// TODO: 添加请求重试配置
// TODO: 添加请求超时自定义处理
// TODO: 实现请求数据缓存机制

// 导出请求实例
export default new Request();
