import { ErrorMessage } from "../../assets/error/errorMessage";

export interface crudInterface {
    createItem?: any,
    retrieveItem?: any,
    updateItem?: any,
    deleteItem?: any,
    
    resetItem?: any,
    object?: any,
    initialObject?: any,
    type?: any,
    name: string,
    error: ErrorMessage[] | null,
}