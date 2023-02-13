import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../../assets/hook/useTypeSelector";
import { signinAction, logoutAction, refreshTokenAction } from '../../reducers/actions/action.creator.auth'
import { User } from "./user.interface";
import { Auth } from "../auth/auth.interface";
import { initialUser } from './user.initial';
import { initialAuth } from '../auth/auth.initial';

export const UserSignin = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<User>(initialUser)
    const [stateAuth, setStateAuth] = useState<Auth>(initialAuth)
    const { loading, error, itens, item } = useTypedSelector((state) => state.users);

    useEffect(() => {
        // retrieveItem()
    }, [dispatch])
    const resetItem = () => {
        setState(initialUser)
    }
    const signinItem = () => {
        dispatch(signinAction(stateAuth))
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [name]: value })
    }
    return (
        <section>
            <article>
                <div className="form-floating">
                    <input
                        placeholder="USERNAME"
                        type="text"
                        className="form-control"
                        // className={state.name == "" ? "form-control is-invalid" : "form-control is-valid"}
                        value={state.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                    <label htmlFor="username">Username</label>
                    {/* <div className="valid-feedback">Looks good!</div> */}
                    {/* <div className="invalid-feedback">Looks bad!</div> */}
                </div>
                <div className="form-floating">
                    <input
                        placeholder="PASSWORD"
                        type="password"
                        className="form-control"
                        value={state.password}
                        onChange={handleInputChange}
                        name="password"
                        readOnly={state.id != ""}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button onClick={resetItem} className="w-20 btn btn-secondary">Reset</button>
                <button onClick={signinItem} className="w-20 btn btn-primary">Signin</button>
                {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)}
            </article>
        </section>
    );
}