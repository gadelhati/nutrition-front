import { useState, ChangeEvent, useEffect } from 'react';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { create, retrieve, retrieveAll, update, remove, removeAll } from '../../service/crud.service';
import { Container, ContainerInput, ContainerLabel } from '../../container/form/generic.field';
import { AtributeSet } from '../../container/form/generic.atribute';
import { Atribute } from '../../component/atribute/atribute.interface';
import { Role } from './role.interface';
import { initialRole } from './role.initial';

export const RoleForm = () => {
    const [state, setState] = useState<Role>(initialRole)
    const [states, setStates] = useState<Role[]>([initialRole])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(initialRole))

    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    // useEffect(() => {
    //     refresh
    // }, [])
    // const refresh = () => {
    //     window.location.reload()
    // }
    const resetItem = () => {
        setState(initialRole)
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
        let data = await create('role', state)
        validAction(data)
    }
    const retrieveItem = () => {
        retrieve('role', state.id)
    }
    const retrieveAllItem = () => {
        retrieveAll('role', state.name)
    }
    const updateItem = () => {
        update('role', state)
    }
    const deleteItem = () => {
        remove('role', state.id)
    }
    const deleteAllItem = () => {
        removeAll('role')
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
            {JSON.stringify(error)}
            {validation('DTORequestRole')}
            { atribute &&
            <Container>
                {Object.entries(state).map(([key, value], index) => {
                    return (
                        <div>
                            {Array.isArray(atribute[index].worth) ?
                                <select name={key} onChange={handleInputChangeSelect}>
                                    {atribute[index].worth.map((result: any) => <option placeholder={key} data-value={result} >{result}</option>)}
                                </select> :
                                <ContainerInput type={atribute[index].type} placeholder={key} name={key} value={value} onChange={handleInputChange} autoComplete='off' />
                            }
                            <ContainerLabel>{key}</ContainerLabel>
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

            <button onClick={() => validation('name')}>Validation</button>
            
            {/* <button onClick={refresh}>Refresh</button> */}
            
            {/* <Crud initialObject={initialUser} name={url} object={state} error={error}/> */}
            {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
        </>
    );
}