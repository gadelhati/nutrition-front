import { ErrorMessage } from "../../assets/error/errorMessage";
import { Auth } from "../../component/auth/auth.interface";

export interface stateAuth {
    loading: boolean,
    error: ErrorMessage[] | null,
    item: Auth,
    itens: Auth[],
    isLoggedIn: boolean,
}