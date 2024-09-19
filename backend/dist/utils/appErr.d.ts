interface HttpError extends Error {
    status?: string;
    statusCode?: number;
}
declare const appErr: (message: string, statusCode: number) => HttpError;
export default appErr;
