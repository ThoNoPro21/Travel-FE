export type ApiResponse<T> = {
    success: boolean;
    code: number;
    message: string;
    data: T;
};
export type PaginationApiResponseData<T> = {
    current_page: number;
    data: T[];
    from: number;
    links:any[];
    to: number;
    last_page: number;
    per_page: number;
    total: number;
    [field: string]: unknown;
};
