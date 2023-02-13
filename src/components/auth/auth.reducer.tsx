import { stateAuth } from "./auth.state"
import { initialState } from "./auth.state.initial"
import { constants } from "../../reducers/constants"
import { Auth } from "./auth.interface"

const user = JSON.parse(`${localStorage.getItem("user")}`)

export const authReducer = (state: stateAuth = initialState, action: any ): stateAuth => {
  switch (action.type) {
    case constants.SIGNIN_START:
      return { ...state, error: null, loading: true, isLoggedIn: true };
    case constants.SIGNIN_SUCCESS:
      return { ...state, error: null, loading: false, isLoggedIn: true, item: action.payload as Auth };
    case constants.SIGNIN_ERROR:
      return { ...state, error: action.payload, loading: false, isLoggedIn: false };

    case constants.LOGOUT:
      return { ...state, isLoggedIn: false };
    case constants.REFRESH_TOKEN:
      return { ...state, /*user: { ...user, accessToken: action.payload },*/ };
    default:
      return state;
  }
}