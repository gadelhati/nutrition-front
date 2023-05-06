import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, retrieve, update, remove, removeAll } from '../../service/service.crud'
import { Container, ContainerInput } from './generic.field'
import { AtributeSet } from './generic.atribute'
import { Atribute } from '../../component/atribute/atribute.interface'
import { Tooltip } from '../tootip/Tooltip'
import { Table } from '../template/Table'
import { Button, ButtonPage, GroupButton } from '../template/Button'
import { Pageable } from '../../component/Pageable'
import { initialPageable } from '../../component/initialPageable'
import { ErrorBoundary } from 'react-error-boundary'
import { Modal } from '../template/Modal'
import { Toast } from '../toast/Toast'
import { createToast, toastDetails } from '../toast/toast.message'

export const GenericForm = <T extends { id: string, name: string }>(object: any, url: string) => {
    const [state, setState] = useState<T>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(8)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const paginator = 5
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(false)

    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    useEffect(() => {
        retrieveItem()
    }, [page, size])
    const resetItem = () => {
        setState(object.object)
        setError([initialErrorMessage])
    }
    const selectItem = async (data: any) => {
        setState(data)
        handleModal()
    }
    const validItem = (data: any) => {
        if (data?.id) {
            handleModal()
            retrieveItem()
            createToast(toastDetails[0])
        } else {
            startTransition(() => setError(data))
            createToast(toastDetails[1])
        }
    }
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    const createItem = async () => {
        await create(object.url.toLowerCase(), state).then((data) => {
            validItem(data)
        }).catch((error) => { networkError() })
    }
    const retrieveItem = async () => {
        await retrieve(object.url.toLowerCase(), page, size, "name").then((data) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch((error) => { networkError() })
    }
    const updateItem = async () => {
        await update(object.url.toLowerCase(), state).then((data) => {
            validItem(data)
        }).catch((error) => { networkError() })
    }
    const deleteItem = async () => {
        await remove(object.url.toLowerCase(), state.id).then((data) => {
            validItem(data)
        }).catch((error) => { networkError() })
    }
    // const deleteAllItem = async () => {
    //     await removeAll(object.url.toLowerCase()).then((data) => {
    //         handleModal()
    //     }).catch((error) => { networkError() })
    // }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (name == element.field) return vector.push(element?.message) })
        return vector
    }
    const validationDTO = (): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message) })
        return vector
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState({ ...state, [event.target.name]: value })
    }
    const handleInputChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handlePage = (page: number) => {
        setPage(page)
    }
    const handleSize = (event: ChangeEvent<HTMLSelectElement>) => {
        setSize(Number(event.target.value))
    }
    const handleModal = () => {
        setModal(!modal)
        setError([initialErrorMessage])
    }
    const newItem = () => {
        setModal(!modal)
        resetItem()
    }
    return (
        <>
            {/* https://cdpn.io/agrimsrud/fullpage/RwKbwXN?anon=true&view= */}
            {isValidToken() &&
                <>
                    <Modal show={modal}>
                        <article>
                            <header><span onClick={handleModal}>&times;</span><h2>Modal Header</h2></header>
                            {atribute &&
                                <>
                                    <Container>
                                        {Object.entries(state).map(([key, value], index) => {
                                            return (
                                                <div>
                                                    {Array.isArray(atribute[index].worth) ?
                                                        <Tooltip data-tip={validation(key)} hidden={validation(key).length === 0} >
                                                            <ContainerInput>
                                                                <select name={key} onChange={handleInputChangeSelect}>
                                                                    {atribute[index].worth.map((result: any) => <option placeholder={key} data-value={result} >{result}</option>)}
                                                                </select>
                                                            </ContainerInput>
                                                        </Tooltip>
                                                        :
                                                        <Tooltip data-tip={validation(key)} hidden={validation(key).length === 0} >
                                                            <ContainerInput>
                                                                <input type={atribute[index].type} required name={key} value={value} onChange={handleInputChange} autoComplete='off' />
                                                                <label htmlFor={key} hidden={atribute[index].type === 'hidden' ? true : false}>{key}</label>
                                                            </ContainerInput>
                                                        </Tooltip>
                                                    }
                                                </div>
                                            )
                                        })}
                                        <div>{validationDTO()}</div>
                                    </Container>
                                    <Container block={true} >
                                        <Button onClick={resetItem}>Reset</Button>
                                        <Button onClick={createItem} hidden={state.id === "" ? false : true}>Create</Button>
                                        {/* <Button onClick={retrieveItem}>Retrieve</Button> */}
                                        <Button onClick={updateItem} hidden={state.id === "" ? true : false}>Update</Button>
                                        <Button onClick={deleteItem} hidden={state.id === "" ? true : false}>Delete</Button>
                                        {/* <Button onClick={deleteAllItem}>Delete All</Button> */}
                                        <Button onClick={handleModal}>Close</Button>
                                    </Container>
                                </>
                            }
                        </article>
                    </Modal>
                    <Container block={false} >
                        <Button onClick={newItem}>New</Button>
                        Items per page
                        <select onChange={handleSize} >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </Container>
                    <Table>
                        <thead>
                            <tr>
                                {Object.entries(state).map(([key, value], index) => {
                                    return (<th>{key}</th>)
                                })}
                            </tr>
                        </thead>
                        {/* <ErrorBoundary fallback={<div> Algo deu errado </div>} > */}
                        <tbody>
                            {states.map((element) => {
                                return (
                                    <tr onClick={() => selectItem(element)}>
                                        {Object.entries(element).map(([key, value], index) => {
                                            return (Array.isArray(value) ?
                                                Object.entries(value).map(([key, value], index) => {
                                                    return (<td>{JSON.stringify(value)}</td>)
                                                })
                                                :
                                                <td>{value}</td>)
                                        })}
                                    </tr>)
                            })}
                        </tbody>
                        {/* </ErrorBoundary> */}
                        <tfoot>
                            <tr>
                                <td>
                                    <GroupButton>
                                        <ButtonPage onClick={() => handlePage(0)}>{'<<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} disabled={page <= 0 ? true : false}>{'<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} hidden={page <= 0 ? true : false}>{page}</ButtonPage>
                                        <ButtonPage selected={true} disabled  >{page + 1}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} hidden={page >= pageable.totalPages - 1 ? true : false}>{page + 2}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} disabled={page >= pageable.totalPages - 2 ? true : false}>{'>'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(pageable.totalPages - 1)}>{'>>'}</ButtonPage>
                                        Total amount {pageable.totalElements}
                                    </GroupButton>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </>
            }
            <Toast className="notifications"></Toast>
            {/* <GroupButton>
                <ButtonPage onClick={() => numberPage(0)}>{'<<'}</ButtonPage>
                <ButtonPage onClick={() => numberPage(page - 1)} disabled={page >= pageable.totalPages + 2 ? true : false}>{'<'}</ButtonPage>
                {Array(paginator).fill(0).map((p, index) => {
                    return <ButtonPage selected={page === page + index - 2} onClick={() => numberPage(page + index - 2)} 
                    >{page + index - 1}</ButtonPage>
                })}
                <ButtonPage onClick={() => numberPage(page + 1)} disabled={page >= pageable.totalPages - 2 ? true : false}>{'>'}</ButtonPage>
                <ButtonPage onClick={() => numberPage(pageable.totalPages - 1)}>{'>>'}</ButtonPage>
            </GroupButton> */}
            {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
        </>
    )
}