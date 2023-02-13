import { constants } from "../../reducers/constants"
import { stateReducer } from "../../reducers/reducers/reducer.state";
import { User } from "./user.interface";
import { initialErrorMessage } from "../../assets/error/errorMessage.initial";
import { initialUser } from "./user.initial";

export const initialState: stateReducer<User> = {
    loading: false,
    error: null,
    item: initialUser,
    itens: [],
}

export const userReducer = (state: stateReducer<User> = initialState, action: any ): stateReducer<User> => {
    switch (action.type) {
        case constants.CREATE_START+"user":
            return { ...state, error: null, loading: true }
        case constants.CREATE_SUCCESS+"user":
            return { ...state, error: [initialErrorMessage], loading: false, itens: [...state.itens as User[], action.payload as User], item: action.payload as User }
        case constants.CREATE_ERROR+"user":
            return { ...state, error: action.payload, loading: false }

        case constants.RETRIEVE_ALL_START+"user":
            return { ...state, error: null, loading: true }
        case constants.RETRIEVE_ALL_SUCCESS+"user":
            return { ...state, error: null, loading: false, itens: action.payload as User[] }
        case constants.RETRIEVE_ALL_ERROR+"user":
            return { ...state, error: action.payload, loading: false }

        // case constants.RETRIEVE_START+"user":
        //     return { ...state, error: null, loading: true }
        // case constants.RETRIEVE_SUCCESS+"user":
        //     return { ...state, error: null, loading: false, itens: [...state.itens], item: action.payload }
        // case constants.RETRIEVE_ERROR+"user":
        //     return { ...state, error: action.payload, loading: false, itens: [], item: {} }

        case constants.UPDATE_START+"user":
            return { ...state, error: null, loading: true }
        case constants.UPDATE_SUCCESS+"user":
            return { ...state, error: [initialErrorMessage], loading: false, itens: [...state.itens.filter(item => item.id !== action.payload.id), action.payload], item: action.payload }
        case constants.UPDATE_ERROR+"user":
            return { ...state, error: action.payload, loading: false }

        case constants.DELETE_START+"user":
            return { ...state, error: null, loading: true }
        case constants.DELETE_SUCCESS+"user":
            return { ...state, error: [initialErrorMessage], loading: false, itens: state.itens.filter(item => item.id !== action.payload.id) }
        case constants.DELETE_ERROR+"user":
            return { ...state, error: action.payload, loading: false }

        // case constants.DELETE_ALL_START+"user":
        //     return { ...state, error: null, loading: true }
        // case constants.DELETE_ALL_SUCCESS+"user":
        //     return { ...state, error: [initialErrorMessage], loading: false, itens: state.itens }
        // case constants.DELETE_ALL_ERROR+"user":
        //     return { ...state, error: action.payload, loading: false }

        case constants.CHANGE_PASSWORD_START:
            return { ...state, error: null, loading: true }
        case constants.CHANGE_PASSWORD_SUCCESS:
            return { ...state, error: [initialErrorMessage], loading: false, itens: [...state.itens.filter(item => item.id !== action.payload.id), action.payload], item: action.payload }
        case constants.CHANGE_PASSWORD_ERROR:
            return { ...state, error: action.payload, loading: false }

        default:
            return state
    }
}