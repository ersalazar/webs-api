// custom.d.ts
declare namespace Express {
    export interface Request {
        user?: { id: string; [key: string]: any }; // Extend as needed
    }
}
