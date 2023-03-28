import { useState, ChangeEvent, useEffect } from 'react';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { create, retrieve, retrieveAll, update, remove, removeAll, retrieveAllPage } from '../../service/crud.service';
import { Container, ContainerInput, ContainerLabel } from './generic.field';
import { AtributeSet } from './generic.atribute';
import { Atribute } from '../../component/atribute/atribute.interface';
import { Tooltip } from '../tootip/Tooltip';
import { GenericDatatable } from './generic.datatable';
import { Button, Table } from '../template/Flex';
import { Pageable } from '../../component/Pageable';
import { initialPageable } from '../../component/initialPageable';
import { ErrorBoundary } from 'react-error-boundary';

export const GenericForm = <T extends { id: string, name: string }>(object: any, url: string) => {
    const [state, setState] = useState<T>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)

    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    useEffect(() => {
        retrieveAllItemPage()
    }, [page])
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
    const retrieveAllItemPage = async () => {
        let data = await retrieveAllPage(object.url.toLowerCase(), page, 20, "name")
        setPageable(data)
        setStates(data.content)
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
    const previousPage = () => {
        setPage(page - 1)
    }
    const nextPage = () => {
        setPage(page + 1)
    }
    const numberPage = (page: number) => {
        setPage(page)
    }

    return (
        <>
            {/* <Container>
                <ContainerInput type="text" required/>
                    <ContainerLabel>Username</ContainerLabel>
            </Container> */}
            {/* https://cdpn.io/agrimsrud/fullpage/RwKbwXN?anon=true&view= */}
            
            {/* {atribute &&
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
                                
                            </div>
                        )
                    })}
                </Container>
            } */}
            <div>
                <Button onClick={resetItem}>Reset</Button>
                <Button onClick={createItem}>Create</Button>
                <Button onClick={retrieveItem}>Retrieve by ID</Button>
                <Button onClick={retrieveAllItem}>Retrieve All by search</Button>
                <Button onClick={updateItem}>Update</Button>
                <Button onClick={deleteItem}>Delete</Button>
                <Button onClick={deleteAllItem}>Delete All</Button>
            </div>

            <Table>
                <tbody>
                    <thead>
                        <tr><th>ID</th><th>NAME</th></tr>
                    </thead>
                    <ErrorBoundary fallback = { <div> Algo deu errado </div> } >
                    {states.map((element) => {
                        return <tr><td>{element.id}</td><td>{element.name}</td><td><Button onClick={() => selectItem(element)}>Select</Button></td></tr>
                    })}
                    </ErrorBoundary>
                    <tfoot >
                        <button onClick={()=>numberPage(0)}>Primeira</button>
                        <button onClick={()=>numberPage(page - 2)} disabled={page <= 0 ? true : false}>{page -1}</button>
                        <button onClick={()=>numberPage(page - 1)} disabled={page <= 0 ? true : false}>{page}</button>
                        <button disabled  >{page + 1}</button>
                        <button onClick={()=>numberPage(page + 1)} disabled={page >= pageable.totalPages - 1 ? true : false}>{page + 2}</button>
                        <button onClick={()=>numberPage(page + 2)} disabled={page >= pageable.totalPages - 2 ? true : false}>{page + 3}</button>
                        <button onClick={()=>numberPage(pageable.totalPages - 1)}>Última</button>
                    </tfoot>
                </tbody>
            </Table>
            
            {/* <GenericDatatable key='gen' objects={states} url={object.url.toLowerCase()} /> */}

            {/* <Crud initialObject={initialUser} name={url} object={state} error={error}/> */}
            {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
        </>
    );
}