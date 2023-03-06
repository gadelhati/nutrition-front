import { useState, ChangeEvent, useEffect } from 'react';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { create, retrieve, retrieveAll, update, remove, removeAll } from '../../service/crud.service';
import { Container, ContainerInput, ContainerLabel } from './generic.field';
import { AtributeSet } from './generic.atribute';
import { Atribute } from '../../component/atribute/atribute.interface';
import { Tooltip } from '../tootip/Tooltip';
import { GenericDatatable } from './generic.datatable';
import { Button, Table } from '../template/Flex';

export const GenericForm = <T extends { id: string, name: string }>(object: any, url: string) => {
    const [state, setState] = useState<T>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))

    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    useEffect(() => {
        retrieveAllItem()
    }, [])
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
    const selectItem = async (data: any) => {
        setState(data)
    }
    const createItem = async () => {
        let data = await create(object.url.toLowerCase(), state)
        validAction(data)
    }
    const retrieveItem = async () => {
        await retrieve(object.url.toLowerCase(), state.id)
    }
    const retrieveAllItem = async () => {
        let data = await retrieveAll(object.url.toLowerCase(), state.name)
        setStates(data)
    }
    const updateItem = async () => {
        let data = await update(object.url.toLowerCase(), state)
        validAction(data)
    }
    const deleteItem = async () => {
        await remove(object.url.toLowerCase(), state.id)
    }
    const deleteAllItem = async () => {
        await removeAll(object.url.toLowerCase())
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

            {atribute &&
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

            <Button onClick={resetItem}>Reset</Button>
            <Button onClick={createItem}>Create</Button>
            <Button onClick={retrieveItem}>Retrieve by ID</Button>
            <Button onClick={retrieveAllItem}>Retrieve All by search</Button>
            <Button onClick={updateItem}>Update</Button>
            <Button onClick={deleteItem}>Delete</Button>
            <Button onClick={deleteAllItem}>Delete All</Button>

            <Table>
                <tbody>
                    <thead>
                        <tr><th>ID</th><th>NAME</th></tr>
                    </thead>
                    {states.map((element) => {
                        return <tr><td>{element.id}</td><td>{element.name}</td><td><Button onClick={() => selectItem(element)}>S</Button></td></tr>
                    })}
                    <tfoot>FOOTER</tfoot>
                </tbody>
            </Table>

            {/* <GenericDatatable key='gen' objects={states} url={object.url.toLowerCase()} /> */}

            {/* <Crud initialObject={initialUser} name={url} object={state} error={error}/> */}
            {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
        </>
    );
}