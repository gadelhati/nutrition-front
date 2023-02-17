import { useState, ChangeEvent } from 'react';
import { create } from "../../service/service"
import { User } from "./user.interface";
import { initialUser } from './user.initial';
import { ErrorMessage } from '../../assets/error/errorMessage';
import axios from 'axios';
import { api } from '../../assets/api/api';

export const UserSignin = () => {
    const [state, setState] = useState<User>(initialUser)
    
    const resetItem = () => {
        setState(initialUser)
    }
    const zero = async() => {
        let res = await api.post('/auth/login', state)
        .then(response => {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
        // https://axios-http.com/ptbr/docs/req_config
        // https://zetcode.com/javascript/axios/
        // https://www.atatus.com/blog/how-to-perform-http-requests-with-axios-a-complete-guide/
        // https://blog.logrocket.com/using-axios-set-request-headers/
    }
    const login = async() => {
        // try {
            let response = await create<User>("/auth/login", state);
        // } catch(error: any) {
        //     var errorMessage: ErrorMessage[] = []
        //     if (error.response.data.errors != undefined) {
        //         error.response.data.errors.forEach((element: any) => {
        //             errorMessage.push({ field: element.field, defaultMessage: [element.defaultMessage] })
        //         })
        //     } else {
        //         errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
        //     }
        // }
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
                <button onClick={zero}>zero</button>
                <button onClick={login}>login</button>
                {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
            </article>
        </section>
    );
}