import { useState, ChangeEvent, useEffect } from 'react';
import { User } from "./user.interface";
import { initialUser } from './user.initial';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { login, create, retrieve, update, remove, removeAll } from './crud.service';
import { Crud } from './crud.buttons';
import { UserContainer, UserField } from '../../container/field/user.field';

export const UserForm = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<string[]>([])
    
    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    useEffect(() => {
        setAtributeItem(initialUser)
    }, [])
    const resetItem = () => {
        setState(initialUser)
    }
    const createItem = () => {
        create('user', state)
    }
    const retrieveItem = () => {
        retrieve('user', state.username)
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
    const setAtributeItem = (object: Object) => {
        setAtribute([])
        Object.entries(state).map(([key, value]) => {
            setAtribute(atribute => [...atribute, 
                (key === 'password' ? 'password':
                (typeof value === 'boolean' ? 'checkbox':
                // range
                (typeof value === 'number' ? 'number':
                // select_option, radio
                (typeof value === 'object' ? 'string':
                (typeof value === 'string' ? 'text':'date'
            )))))])
        })
    }
    const showShow = () => {
        console.log(atribute)
    }

    return (
        <>
            <UserContainer>
                {Object.entries(state).map(([key, value], index) => {
                    return (
                        <>
                            <UserField type={atribute[index]} placeholder={key} name={key} value={value} onChange={handleInputChange} />
                            <br />
                        </>
                    )
                })}
            </UserContainer>
            <button onClick={resetItem}>Reset</button>
            <button onClick={createItem}>Create</button>
            <button onClick={retrieveItem}>Retrieve</button>
            <button onClick={updateItem}>Update</button>
            <button onClick={deleteItem}>Delete</button>
            <button onClick={setAtributeItem}>Set</button>
            <button onClick={showShow}>Show</button>
            {/* <Crud initialObject={initialUser} name={'user'} object={state} error={error}/> */}
            {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
        </>
    );
}