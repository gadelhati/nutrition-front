import { ErrorMessage } from "../../assets/error/errorMessage";
import { Auth } from "../../components/auth/auth.interface";

export interface stateAuth {
    loading: boolean,
    error: ErrorMessage[] | null,
    item: Auth,
    itens: Auth[],
    isLoggedIn: boolean,
}