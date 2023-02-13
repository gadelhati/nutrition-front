import { constants } from "../../reducers/constants"
import { stateReducer } from "../../reducers/reducers/reducer.state";
import { Role } from "./role.interface";
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { initialRole } from "./role.initial";

export const initialState: stateReducer<Role> = {
    loading: false,
    error: null,
    item: initialRole,
    itens: [],
}

export const roleReducer = (state: stateReducer<Role> = initialState, action: any ): stateReducer<Role> => {
    switch (action.type) {
        case constants.CREATE_START+"role":
            return { ...state, error: null, loading: true }
        case constants.CREATE_SUCCESS+"role":
            return { ...state, error: [initialErrorMessage], loading: false, itens: [...state.itens as Role[], action.payload as Role], item: action.payload as Role }
        case constants.CREATE_ERROR+"role":
            return { ...state, error: action.payload, loading: false }

        case constants.RETRIEVE_ALL_START+"role":
            return { ...state, error: null, loading: true }
        case constants.RETRIEVE_ALL_SUCCESS+"role":
            return { ...state, error: null, loading: false, itens: action.payload as Role[] }
        case constants.RETRIEVE_ALL_ERROR+"role":
            return { ...state, error: action.payload, loading: false }

        // case constants.RETRIEVE_START+"role":
        //     return { ...state, error: null, loading: true }
        // case constants.RETRIEVE_SUCCESS+"role":
        //     return { ...state, error: null, loading: false, itens: [...state.itens], item: action.payload }
        // case constants.RETRIEVE_ERROR+"role":
        //     return { ...state, error: action.payload, loading: false, itens: [], item: {} }

        case constants.UPDATE_START+"role":
            return { ...state, error: null, loading: true }
        case constants.UPDATE_SUCCESS+"role":
            return { ...state, error: [initialErrorMessage], loading: false, itens: [...state.itens.filter(item => item.id !== action.payload.id), action.payload], item: action.payload }
        case constants.UPDATE_ERROR+"role":
            return { ...state, error: action.payload, loading: false }

        case constants.DELETE_START+"role":
            return { ...state, error: null, loading: true }
        case constants.DELETE_SUCCESS+"role":
            return { ...state, error: [initialErrorMessage], loading: false, itens: state.itens.filter(item => item.id !== action.payload.id) }
        case constants.DELETE_ERROR+"role":
            return { ...state, error: action.payload, loading: false }

        // case constants.DELETE_ALL_START+"role":
        //     return { ...state, error: null, loading: true }
        // case constants.DELETE_ALL_SUCCESS+"role":
        //     return { ...state, error: [initialErrorMessage], loading: false, itens: state.itens }
        // case constants.DELETE_ALL_ERROR+"role":
        //     return { ...state, error: action.payload, loading: false }

        default:
            return state
    }
}