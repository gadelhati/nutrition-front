import { useState, ChangeEvent, useEffect } from 'react';
import { ErrorMessage } from '../assets/error/errorMessage';
import { initialErrorMessage } from '../assets/error/errorMessage.initial';
import { create, retrieve, retrieveAll, update, remove, removeAll } from '../component/user/crud.service';
import { Container, ContainerInput, ContainerLabel } from './field/user.field';
import { AtributeSet } from '../component/atribute/atribute.set';
import { Atribute } from '../component/atribute/atribute.interface';

export const GenericForm = <T extends Object>(object: any, url: string) => {
    const [state, setState] = useState<T>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))

    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    // useEffect(() => {
        
    // }, [])
    const resetItem = () => {
        setState(object)
    }
    const createItem = () => {
        create(object.constructor.name.toLowerCase(), state)
    }
    const retrieveItem = () => {
        // retrieve(object.url.toLowerCase(), state.id)
    }
    const retrieveAllItem = () => {
        // retrieveAll(object.url.toLowerCase(), state.name)
    }
    const updateItem = () => {
        update(object.url.toLowerCase(), state)
    }
    const deleteItem = () => {
        // remove(object.url.toLowerCase(), state.id)
    }
    const deleteAllItem = () => {
        removeAll(object.url.toLowerCase())
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    const handleInputChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    return (
        <>
            {/* <Container>
                <ContainerInput type="text" required/>
                    <ContainerLabel>Username</ContainerLabel>
            </Container> */}
            {/* https://cdpn.io/agrimsrud/fullpage/RwKbwXN?anon=true&view= */}
            
            { atribute &&
            <Container>
                {Object.entries(state).map(([key, value], index) => {
                    return (
                        <div>
                            {Array.isArray(atribute[index].worth) ?
                                <select name={key} onChange={handleInputChangeSelect}>
                                    {atribute[index].worth.map((result: any) => <option placeholder={key} data-value={result} >{result}</option>)}
                                </select> :
                                <ContainerInput type={atribute[index].type} placeholder={key} name={key} value={value} onChange={handleInputChange} autoComplete='off'/>
                            }
                            <ContainerLabel>{atribute[index].type}</ContainerLabel>
                        </div>
                    )
                })}
            </Container>
            }
            
            <button onClick={resetItem}>Reset</button>
            <button onClick={createItem}>Create</button>
            <button onClick={retrieveItem}>Retrieve by ID</button>
            <button onClick={retrieveAllItem}>Retrieve All by search</button>
            <button onClick={updateItem}>Update</button>
            <button onClick={deleteItem}>Delete</button>
            <button onClick={deleteAllItem}>Delete All</button>
            
            {/* <Crud initialObject={initialUser} name={url} object={state} error={error}/> */}
            {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
        </>
    );
}