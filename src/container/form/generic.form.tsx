import { useState, ChangeEvent, useEffect } from 'react';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { create, retrieve, retrieveAll, update, remove, removeAll } from '../../service/crud.service';
import { Container, ContainerInput, ContainerLabel } from './generic.field';
import { AtributeSet } from './generic.atribute';
import { Atribute } from '../../component/atribute/atribute.interface';
import { Tooltip } from '../tootip/Tooltip';

export const GenericForm = <T extends {id: string, name: string}>(object: any, url: string) => {
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
        setState(object.object)
    }
    const validAction = (data: any) => {
        if (data?.id) {
            setState(data)
            setError([initialErrorMessage])
        } else {
            setError(data)
        }
    }
    const createItem = async() => {
        let data = await create(object.url.toLowerCase(), state)
        validAction(data)
    }
    const retrieveItem = () => {
        retrieve(object.url.toLowerCase(), state.id)
    }
    const retrieveAllItem = () => {
        retrieveAll(object.url.toLowerCase(), state.name)
    }
    const updateItem = () => {
        update(object.url.toLowerCase(), state)
    }
    const deleteItem = () => {
        remove(object.url.toLowerCase(), state.id)
    }
    const deleteAllItem = () => {
        removeAll(object.url.toLowerCase())
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        error?.map(element => { if (name == element.field) return vector.push(element?.message) })
        return vector
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
                                <Tooltip data-tip={validation(key)} hidden={validation(key).length === 0} ><ContainerInput type={atribute[index].type} placeholder={key} name={key} value={value} onChange={handleInputChange} autoComplete='off' /></Tooltip>
                            }
                            {/* <ContainerLabel>{key}</ContainerLabel> */}
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