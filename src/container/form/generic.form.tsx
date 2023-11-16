import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { getPayload, isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, update, remove, retrieve, removeComposite } from '../../service/service.crud'
import { Container, ContainerInput2 } from './generic.field'
import { AtributeSet } from './generic.atribute'
import { Atribute } from '../../component/atribute/atribute.interface'
import { Table } from '../template/table'
import { Button, ButtonPage, GroupButton } from '../template/button'
import { Pageable } from '../../component/pageable/pageable.interface'
import { initialPageable } from '../../component/pageable/pageable.initial'
import { ErrorBoundary } from 'react-error-boundary'
import { Modal } from '../template/modal'
import { Toast } from '../toast/toast'
import { createToast, toastDetails } from '../toast/toast.message'
import { SubAtributeSet } from '../../component/atribute/subAtribute'
// import { WeatherUpload } from './weather.upload'
import { Header, TitleHeader } from '../template/header'
// import { Load } from '../template/load'
import { UriScreenFormat } from '../../service/uri.format'
// import { ShineButton } from './shine.button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFDocument } from '../../component/pdf/PDFDocument'
import { Input } from './input/Input'
import { InputInterface } from './input/assets/input.interface'
import { Icon } from '../../assets/svg.access'

export const GenericForm = <T extends { id: string, name: string }>(object: any) => {
    const [state, setState] = useState<any>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [subStates, setSubStates] = useState<Object[][]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(false)
    const [key, setKey] = useState<string>('name')
    const [search, setSearch] = useState<string>('')

    const width = object.width ?? 100;

    useEffect(() => {
        JSON.stringify({ispending})
        setAtribute(AtributeSet(object.object))
        retrieveItem()
        loadSubStates()
    }, [page, size])
    useEffect(()=>{
        searchValue()
    }, [key, search])
    const searchValue = async() => {
        await retrieve(object.url, page, size, key, search).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const searchKey = (ikey: string) => {
        setKey(ikey)
    }
    const searchItem = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const resetItem = () => {
        loadSubStates()
        setState(object.object)
        setError([initialErrorMessage])
    }
    const selectItem = async (data: any) => {
        loadSubStates()
        setState(data)
        handleModal()
    }
    const validItem = (data: any) => {
        if (data?.id || data?.ii && data?.iii || data?.ddddddd || data?.name && data?.number) {
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
        await create(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const retrieveItem = async () => {
        await retrieve(object.url, page, size, '', '').then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const loadSubStates = async () => {
        Object.entries(state).map(([key, value], index) => {
            return (
                !(atribute[index]?.type === 'checkbox' || atribute[index]?.type === 'date' || value === null && atribute[index].worth === 0 || value === null && atribute[index].worth === '' || atribute[index]?.type !== 'undefined' && !Array.isArray(atribute[index]?.worth)) &&
                retrieve(key, 0, 1000, '', '').then((data: any) => {
                    startTransition(() => {
                        subStates[index] = data.content
                        setSubStates(subStates)
                    })
                }).catch(() => { networkError() })
            )
        })
    }
    const updateItem = async () => {
        await update(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const deleteItem = async () => {
        if(state.id !== undefined){
            await remove(object.url, state.id).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else {
            await removeComposite(object.url, state?.dateObservation, state?.ddddddd, state?.ii, state?.iii).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        }
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        if(Array.isArray(error)){
            error?.map((element: any) => { if (name == element.field) return vector.push(element?.message+'. ') })
        }
        return vector
    }
    const validationDTO = (): string[] => {
        let vector: string[] = []
        if(Array.isArray(error)){
            error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message+'. ') })
        }
        return vector
    }
    const handleInputChangeFather = (object: InputInterface) => {
        setState({ ...state, [object.name]: object.value })
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState({ ...state, [event.target.name]: value })
    }
    const handleInputChangeSubSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, page, size, event.target.name, event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: data?.content[0] })
        }).catch(() => { networkError() })
    }
    const handleInputChangeSubSelectArray = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, 'id', event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: [data?.content[0]] })
        }).catch(() => { networkError() })
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
        loadSubStates()
    }
    const removeTimeFromDate = (date: any) => {
        let aux = new Date(date)
        return new Date(aux.getFullYear(), aux.getMonth() + 1, aux.getDate()).toLocaleDateString('fr-CA');
    }
    const showObject = (values: any): any => {
        return (
            Object.entries(values).map(([key, value]: any, index) => {
                if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
                    return (<td>
                        {Array.isArray(value) ?
                            <>
                                {value.map((key) => {
                                    return (
                                        typeof value === 'object' ?
                                            <>{showObject(key)}</>
                                            :
                                            <>{value}</>
                                    )
                                })}
                            </> :
                            typeof value === 'object' ?
                                <>{value == null ? '' : value?.name ? value.name : value.id}</>
                                :
                                <>{value}</>
                        }
                    </td>)
                }
            }))
    }
    // const shine = (event: React.MouseEvent<HTMLButtonElement>):void => {
    //     const button = document.querySelector(".shiny") as HTMLInputElement | null
    //     button?.style.setProperty("--x", event.clientX - button?.getBoundingClientRect().x)
    //     button?.style.setProperty("--y", event.clientY - button?.getBoundingClientRect().y)
    // }
    const compositeOrNot = ():boolean => {
        let id: boolean = false
        if (state.hasOwnProperty('name') && state?.name !== '' &&
         state.hasOwnProperty('number') && state?.number !== 0) {
            id = true
            console.log('1')
        }
        if (state.hasOwnProperty('ii') && state?.ii !== '' &&
         state.hasOwnProperty('iii') && state?.iii !== '') {
            id = true
            console.log('2')
        }
        if (state.hasOwnProperty('ddddddd') && state?.ddddddd !== '') {
            id = true
            console.log('3')
        }
        if (state.hasOwnProperty('id') && state?.id !== '') {
            id = true
            console.log('4')
        }
        if (object.url.includes('istoric')) {
            id = true
        }
        return id
    }
    const onClickModal = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).className.includes('modal-div')) {
            setModal(false);
        }
    }

    return (
        <>
            {/* <ShineButton onMouseMove={shine} className='shiny'>Shine Button</ShineButton> */}
            {isValidToken() &&
                <>
                    <Modal show={modal} className='modal-div' onClick={(evt) => {
                        onClickModal(evt)
                    }}>
                        <article>
                            <header><span onClick={handleModal}>&times;</span><h2>{UriScreenFormat(object.url)}</h2></header>
                            {atribute &&
                                <>
                                    <Container align={'inputs'}>
                                        {Object.entries(state).map(([key, value]: any, index) => {
                                            return (
                                                // <Input childToParent={handleInputChangeFather} key={Math.random()} type={atribute[index]?.type} name={key} value={value} readOnly={false} show={modal}></Input>
                                                <div style={atribute[index]?.type === 'hidden' ? { display: 'none' } : { display: 'flex'  }}>
                                                        <ContainerInput2 error={validation(key).length !== 0 ? true : false}>
                                                            <span>
                                                                { Array.isArray(atribute[index]?.worth) ?
                                                                    <select key={key} name={key} onChange={Array.isArray(value) ? handleInputChangeSubSelectArray : handleInputChangeSubSelect }
                                                                        // defaultValue={typeof value[0] === 'boolean' ? undefined : atribute[index]?.type === 'date' ? removeTimeFromDate(value[0]) : value[0]}
                                                                        value={value[0]}>
                                                                        <option selected key={Math.random()} value={value[0]}>{value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id}</option>
                                                                        {subStates[index]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                                                    </select>
                                                                    :
                                                                    <input key={key} name={key} onChange={handleInputChange} autoComplete='off' required type={atribute[index]?.type}
                                                                        // defaultValue={typeof value === 'boolean' ? undefined : atribute[index]?.type === 'date' ? removeTimeFromDate(value) : value}    
                                                                        defaultChecked={typeof value === 'boolean' ? value : undefined}
                                                                        value={typeof value === 'boolean' ? undefined : value} />
                                                                }
                                                                <label className='label' htmlFor={key} hidden={atribute[index]?.type === 'hidden' || atribute[index]?.type === 'checkbox' ? true : false} >{key}</label>
                                                                <label htmlFor={key}>{validation(key)}</label>
                                                            </span>
                                                        </ContainerInput2>
                                                </div>
                                            )
                                        })}
                                    </Container>
                                    <Container align={'response'}>
                                        <div>{validationDTO()}</div>
                                    </Container>
                                    <footer>
                                        {modal &&
                                        <PDFDownloadLink document={<PDFDocument object={state} />} fileName="somename.pdf">
                                                {({ loading }) => loading ? <Button category={'warning'} >Wait</Button> : <Button category={'warning'} >Download</Button> }
                                        </PDFDownloadLink>}
                                        {JSON.stringify(state.number)}
                                        <Button category={'warning'} onClick={resetItem} type='reset' >Reset</Button>
                                        <Button category={'warning'} onClick={createItem} hidden={compositeOrNot()}>Create</Button>
                                        <Button category={'warning'} onClick={updateItem} hidden={!compositeOrNot()}>Update</Button>
                                        <Button category={'danger'} onClick={deleteItem} hidden={!compositeOrNot()}>Delete</Button>
                                        <Button category={'warning'} onClick={handleModal}>Close</Button>
                                    </footer>
                                </>
                            }
                        </article>
                    </Modal>
                    <Header>
                        <TitleHeader>
                            <h1>{UriScreenFormat(object.url)}</h1>
                        </TitleHeader>
                        <a href={`#/${'profile'}`}><Button category={'small'}>{getPayload().sub}</Button></a>
                    </Header>
                    {/* {ispending && <Load></Load>} */}
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan={6}>
                                    <div className='header'>
                                        <div>
                                            {!object.url.includes('istoric') && <Button category={'warning'} onClick={newItem}>New</Button>}
                                            <span>show</span>
                                            <select onChange={handleSize} >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span>search {key}</span>
                                            <input name={search} onChange={searchItem} placeholder={`${key}`} value={search}></input>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                {Object.entries(state).map(([key]: any, index) => {
                                    if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
                                        if(!object.url.includes('weather') || index < 6) {
                                                return (<th onClick={()=>searchKey(key)}>{key}</th>)
                                            }
                                        }
                                    })}
                            </tr>
                        </thead>
                        <ErrorBoundary fallback={<div> Something went wrong </div>} >
                            <tbody>
                                {states.map((element) => {
                                    return (
                                        <tr onClick={() => selectItem(element)}>
                                            <>{showObject(element)}</>
                                        </tr>)
                                })}
                            </tbody>
                        </ErrorBoundary>
                        <tfoot>
                            <tr>
                                <th colSpan={100}>
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
                                </th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Toast className="notifications"></Toast>
                </>
            }
        </>
    )
}