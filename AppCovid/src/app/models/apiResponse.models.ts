import { Data } from "./data.models";
export interface ApiResponse{
    data: Data;
    success: boolean;
    message: string;
}