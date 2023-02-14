import { useState, ChangeEvent } from 'react';
import { create } from "../../service/service"
import { User } from "./user.interface";
import { initialUser } from './user.initial';
import { ErrorMessage } from '../../assets/error/errorMessage';

export const UserSignin = () => {
    const [state, setState] = useState<User>(initialUser)
    
    const resetItem = () => {
        setState(initialUser)
    }
    const createUser = async() => {
        try {
            const { data } = await create<User>("/user", state);
        } catch(error: any) {
            var errorMessage: ErrorMessage[] = []
            if (error.response.data.errors != undefined) {
                error.response.data.errors.forEach((element: any) => {
                    errorMessage.push({ field: element.field, defaultMessage: [element.defaultMessage] })
                })
            } else {
                errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
            }
        }
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
                <button onClick={resetItem} className="w-20 btn btn-secondary">Reset</button>
                <button onClick={createUser} className="w-20 btn btn-primary">Signin</button>
                {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
            </article>
        </section>
    );
}