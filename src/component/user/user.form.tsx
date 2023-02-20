import { useState, ChangeEvent } from 'react';
import { User } from "./user.interface";
import { initialUser } from './user.initial';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { login, create, retrieve, update, remove, removeAll } from './crud.service';
import { Crud } from './crud.buttons';

export const UserForm = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    let response
    
    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    const resetItem = () => {
        setState(initialUser)
    }
    const createItem = () => {
        create('user', state)
    }
    const retrieveItem = () => {
        response = retrieve('user', state.username)
    }
    const updateItem = () => {
        update('user', state)
    }
    const deleteItem = () => {
        remove('user', state.id)
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    const ar = (ss: any) => {
        console.log(typeof ss)
        switch (ss) {
            case "loading":
              return "loading request";
            // case "failed":
            //   return `failed with code ${s.code}`;
            case "success":
              return "got response";
          }
    }

    return (
        <>
            <>
                {Object.entries(state).map(([key, value]) => {
                    return (
                        <>
                            <input 
                                type={
                                    (key === 'password' ? 'password':
                                    (typeof value === 'boolean' ? 'checkbox':
                                    // range
                                    (typeof value === 'number' ? 'number':
                                    // (typeof value === [] ? 'string':
                                    // select_option, radio
                                    (typeof value === 'string' ? 'text':'date'))))} 
                                placeholder={key} key={key} name={key} value={value} onChange={handleInputChange} />
                            <br />
                        </>
                    )
                })}
            </>
            <button onClick={resetItem}>Reset</button>
            <button onClick={createItem}>Create</button>
            <button onClick={retrieveItem}>Retrieve</button>
            <button onClick={updateItem}>Update</button>
            <button onClick={deleteItem}>Delete</button>
            {response}

            {/* <Crud initialObject={initialUser} name={'user'} object={state} error={error}/> */}
            {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
        </>
    );
}