import { useState, ChangeEvent } from 'react';
import { User } from "../../component/user/user.interface";
import { initialUser } from '../../component/user/user.initial';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { login, create, retrieve, update, remove, removeAll } from '../../service/crud.service';
import { Crud } from './crud.buttons';

export const UserSignin = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    
    const loginUser = () => {
        let resposta = login('auth/login', state);
    }
    const resetItem = () => {
        setState(initialUser)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
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
                <button onClick={resetItem}>Reset</button>
                <button onClick={loginUser}>Login</button>
                {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
            </article>
        </section>
    );
}