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
// import { WeatherUpload } from './state.upload'
import { Header, TitleHeader } from '../template/header'
// import { Load } from '../template/load'
import { UriScreenFormat } from '../../service/uri.format'
// import { ShineButton } from './shine.button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFDocument } from '../../component/pdf/PDFDocument'
// import { Input } from './input/Input'
// import { InputInterface } from './input/assets/input.interface'
import { Icon } from '../../assets/svg.access'

export const WeatherForm = <T extends { id: string, name: string }>(object: any) => {
    const [state, setState] = useState<any>(object.object)
    const [composite, setComposite] = useState<any>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [subStates, setSubStates] = useState<Object[][]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<{message: '', show: boolean, action: string}>({message: '', show: false, action: ''})
    const [key, setKey] = useState<string>('name')
    const [search, setSearch] = useState<string>('')
    const [tab, setTab] = useState<number>(0)

    const width = object.width ?? 100;

    useEffect(() => {
        JSON.stringify({ ispending })
        setAtribute(AtributeSet(object.object))
        retrieveItem()
        loadSubStates()
    }, [page, size])
    useEffect(() => {
        searchValue()
        setPage(0)
    }, [key, search])
    const changeTab = (index:any) => {
        setTab(index)
    } 
    const searchValue = async () => {
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
        setComposite(object.object)
        loadSubStates()
        setState(object.object)
        setError([initialErrorMessage])
    }
    const selectItem = async (data: any) => {
        loadSubStates()
        setComposite(data)
        setState(data)
        handleModal()
    }
    const validItem = (data: any) => {
        if (data?.hasOwnProperty('id') || data?.hasOwnProperty('ii') && data?.hasOwnProperty('iii') || data?.hasOwnProperty('ddddddd') || data?.hasOwnProperty('name') && data?.hasOwnProperty('number')) {
            setConfirm({...confirm, show:!confirm.show})
            retrieveItem()
            createToast(toastDetails[0])
        } else {
            handleConfirm('')
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
        await retrieve(object.url, page, size, key, search).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const loadSubStates = async () => {
        Object.entries(state).map(([key, value], index) => {
            return (
                !(atribute[index]?.type === 'checkbox' || atribute[index]?.type === 'date' || value === null && atribute[index].worth === 0 || value === null && atribute[index].worth === '' || atribute[index]?.type !== 'undefined' && !Array.isArray(atribute[index]?.worth)) || atribute[index]?.type === 'object' ?
                retrieve(key, 0, 1000, '', '').then((data: any) => {
                    startTransition(() => {
                        subStates[index] = data.content
                        setSubStates(subStates)
                    })
                }).catch(() => { networkError() })
                :{}
            )
        })
    }
    const updateItem = async () => {
        await update(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const deleteItem = async () => {
        if (state.id !== undefined) {
            await remove(object.url, state.id).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else if (composite.hasOwnProperty('dateObservation') || composite.hasOwnProperty('ii') && composite.hasOwnProperty('iii')) {
            await removeComposite(object.url, state?.dateObservation, state?.ddddddd, state?.ii, state?.iii).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else if (composite.hasOwnProperty('name') && composite.hasOwnProperty('number')) {
            await removeComposite(object.url, state?.name, state?.number, '', '').then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        }
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            error?.map((element: any) => { if (name == element.field) return vector.push(element?.message + '. ') })
        }
        return vector
    }
    const validationDTO = (): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message + '. ') })
        }
        return vector
    }
    // const handleInputChangeFather = (object: InputInterface) => {
    //     setState({ ...state, [object.name]: object.value })
    // }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState({ ...state, [event.target.name]: value })
    }
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({...state, [event.target.name]: event.target.value})   
    }
    const handleInputChangeSubSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, 'id', event.target.value).then((data: any) => {
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
    const handleConfirm = (action: string) => {
        setConfirm({...confirm, show:!confirm.show, action: action})
        handleModal()
    }
    const handleConfirmYes = () => {
        switch (confirm.action) {
            case 'create': createItem(); break
            case 'retrieve': retrieveItem(); break
            case 'update': updateItem(); break
            case 'delete': deleteItem(); break
        }
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
                                <>{value === null ? '' : value?.name ? value.name : value.id}</>
                                :
                                <>{typeof value === 'boolean' ? JSON.stringify(value) : value}</>
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
    const compositeOrNot = (): boolean => {
        let id: boolean = false
        if (composite.hasOwnProperty('name') && composite?.name !== '' &&
            composite.hasOwnProperty('number') && composite?.number !== 0) {
            id = true
        }
        if (composite.hasOwnProperty('ii') && composite?.ii !== '' &&
            composite.hasOwnProperty('iii') && composite?.iii !== '') {
            id = true
        }
        if (composite.hasOwnProperty('ddddddd') && composite?.ddddddd !== '') {
            id = true
        }
        if (state.hasOwnProperty('id') && state?.id !== '') {
            id = true
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
    const onConfirmModal = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).className.includes('modal-confirm')) {
            setConfirm({...confirm, show: false});
        }
    }
    return (
        <>
            {/* <ShineButton onMouseMove={shine} className='shiny'>Shine Button</ShineButton> */}
            {isValidToken() &&
                <>
                    <Modal confirm={true} show={confirm.show} className='modal-confirm' onClick={(evt) => {
                        onConfirmModal(evt)
                    }}>
                        <article>
                            <header><span onClick={()=>handleConfirm('')}>&times;</span><h2>{UriScreenFormat('Confirm')}</h2></header>
                            <footer>
                                <Button category={'danger'} onClick={handleConfirmYes} >{UriScreenFormat(confirm.action)}</Button>
                                <Button category={'secondary'} onClick={()=>handleConfirm('')} type='reset' >Reset</Button>
                            </footer>
                        </article>
                    </Modal>
                    <Modal weather={true} show={modal} className='modal-div' onClick={(evt) => {
                        onClickModal(evt)
                    }}>
                        <article>
                            <header><span onClick={handleModal}>&times;</span><h2>{UriScreenFormat(object.url)}</h2></header>
                            {atribute &&
                                <>
                                    <div className='tabs'>
                                <button className={tab === 0 ? 'show' : 'inative'} onClick={()=>changeTab(0)}>Seção 0</button>
                                <button className={tab === 1 ? 'show' : 'inative'} onClick={()=>changeTab(1)}>Seção 1</button>
                                <button className={tab === 2 ? 'show' : 'inative'} onClick={()=>changeTab(2)}>Seção 2</button>
                                <button className={tab === 3 ? 'show' : 'inative'} onClick={()=>changeTab(3)}>Seção 3</button>
                                <button className={tab === 5 ? 'show' : 'inative'} onClick={()=>changeTab(5)}>Seção 5</button>
                                </div>
                                    <Container align={'line'} style={{ flex: '1', overflow: 'auto'}}>

                                                    <div className={tab === 0 ? 'tab' : 'hide'}>
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                                        <>
                                                                            <select name={"mimi"} required value={state.mimi} onChange={handleSelectChange}>
                                                                             <option value={'AA'}>AA</option>
                                                                             <option value={'BB'}>BB</option>   
                                                                            </select>
                                                                            <label htmlFor={"mimi"} >{"mimi"}</label>
                                                                            <label htmlFor={"mimi"}>{validation("mimi")}</label>
                                                                        </>
                                                                        
                                                            </span>
                                                        </ContainerInput2>

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"mjmj"} required value={state.mjmj} placeholder='XX' readOnly= {true} onChange={handleInputChange}/>
                                                            <label htmlFor={"mjmj"}>{"mjmj"}</label>
                                                            <label htmlFor={"mjmj"}>{validation("mjmj")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false} 
                                                            type="text" name={"ddddddd"} value={state.ddddddd} onChange={handleInputChange}/>
                                                            
                                                            <label htmlFor={"ddddddd"}>{"ddddddd"}</label>
                                                            <label htmlFor={"ddddddd"}>{validation("ddddddd")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'AA'? true : false}
                                                             type="text" name={"ii"} value={state.ii} onChange={handleInputChange}/>
                                                            <label htmlFor={"ii"}>{"ii"}</label>
                                                            <label htmlFor={"ii"}>{validation("ii")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'AA'? true : false}type="text" name={"iii"} value={state.iii} onChange={handleInputChange}/>
                                                            <label htmlFor={"iii"}>{"iii"}</label>
                                                            <label htmlFor={"iii"}>{validation("iii")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"nbnbnb"} value={state.nbnbnb} onChange={handleInputChange}/>
                                                            <label htmlFor={"nbnbnb"}>{"nbnbnb"}</label>
                                                            <label htmlFor={"nbnbnb"}>{validation("nbnbnb")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"yy"} required value={state.yy} onChange={handleInputChange}/>
                                                            <label htmlFor={"yy"}>{"yy"}</label>
                                                            <label htmlFor={"yy"}>{validation("yy")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"gg"} required value={state.gg} onChange={handleInputChange}/>
                                                            <label htmlFor={"gg"}>{"gg"}</label>
                                                            <label htmlFor={"gg"}>{validation("gg")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"iw"} required value={state.iw} onChange={handleInputChange}/>
                                                            <label htmlFor={"iw"}>{"iw"}</label>
                                                            <label htmlFor={"iw"}>{validation("iw")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"lalala"} value={state.lalala} onChange={handleInputChange}/>
                                                            <label htmlFor={"lalala"}>{"lalala"}</label>
                                                            <label htmlFor={"lalala"}>{validation("lalala")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"qc"} value={state.qc} onChange={handleInputChange}/>
                                                            <label htmlFor={"qc"}>{"qc"}</label>
                                                            <label htmlFor={"qc"}>{validation("qc")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"lolololo"} value={state.lolololo} onChange={handleInputChange}/>
                                                            <label htmlFor={"lolololo"}>{"lolololo"}</label>
                                                            <label htmlFor={"lolololo"}>{validation("lolololo")}</label>
                                                            </span>
                                                        </ContainerInput2>
                                                        </div>
                                                        {/*begining of section 1*/}
                                                        <div className={tab === 1 ? 'tab' : 'hide'}>
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"ir"} value={state.ir} onChange={handleInputChange}/>
                                                            <label htmlFor={"ir"}>{"ir"}</label>
                                                            <label htmlFor={"ir"}>{validation("ir")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"ix"} value={state.ix} onChange={handleInputChange}/>
                                                            <label htmlFor={"ix"}>{"ix"}</label>
                                                            <label htmlFor={"ix"}>{validation("ix")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"h"} value={state.h} onChange={handleInputChange}/>
                                                            <label htmlFor={"h"}>{"h"}</label>
                                                            <label htmlFor={"h"}>{validation("h")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"vv"} value={state.vv} onChange={handleInputChange}/>
                                                            <label htmlFor={"vv"}>{"vv"}</label>
                                                            <label htmlFor={"vv"}>{validation("vv")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"n"} value={state.n} onChange={handleInputChange}/>
                                                            <label htmlFor={"n"}>{"n"}</label>
                                                            <label htmlFor={"n"}>{validation("n")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"dd"} value={state.dd} onChange={handleInputChange}/>
                                                            <label htmlFor={"dd"}>{"dd"}</label>
                                                            <label htmlFor={"dd"}>{validation("dd")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"ff"} value={state.ff} onChange={handleInputChange}/>
                                                            <label htmlFor={"ff"}>{"ff"}</label>
                                                            <label htmlFor={"ff"}>{validation("ff")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"fff"} value={state.fff} onChange={handleInputChange}/>
                                                            <label htmlFor={"fff"}>{"fff"}</label>
                                                            <label htmlFor={"fff"}>{validation("fff")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn1_1"} value={state.sn1_1} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn1_1"}>{"sn1_1"}</label>
                                                            <label htmlFor={"sn1_1"}>{validation("sn1_1")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"ttt"} value={state.ttt} onChange={handleInputChange}/>
                                                            <label htmlFor={"ttt"}>{"ttt"}</label>
                                                            <label htmlFor={"ttt"}>{validation("ttt")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn2_1"} value={state.sn2_1} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn2_1"}>{"sn2_1"}</label>
                                                            <label htmlFor={"sn2_1"}>{validation("sn2_1")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"tdtdtd"} value={state.tdtdtd} onChange={handleInputChange}/>
                                                            <label htmlFor={"tdtdtd"}>{"tdtdtd"}</label>
                                                            <label htmlFor={"tdtdtd"}>{validation("tdtdtd")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"p0p0p0p0"} value={state.p0p0p0p0} onChange={handleInputChange}/>
                                                            <label htmlFor={"p0p0p0p0"}>{"p0p0p0p0"}</label>
                                                            <label htmlFor={"p0p0p0p0"}>{validation("p0p0p0p0")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"pppp"} value={state.pppp} onChange={handleInputChange}/>
                                                            <label htmlFor={"pppp"}>{"pppp"}</label>
                                                            <label htmlFor={"pppp"}>{validation("pppp")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"a3"} value={state.a3} onChange={handleInputChange}/>
                                                            <label htmlFor={"a3"}>{"a3"}</label>
                                                            <label htmlFor={"a3"}>{validation("a3")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"hhh"} value={state.hhh} onChange={handleInputChange}/>
                                                            <label htmlFor={"hhh"}>{"hhh"}</label>
                                                            <label htmlFor={"hhh"}>{validation("hhh")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"a"} value={state.a} onChange={handleInputChange}/>
                                                            <label htmlFor={"a"}>{"a"}</label>
                                                            <label htmlFor={"a"}>{validation("a")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"ppp"} value={state.ppp} onChange={handleInputChange}/>
                                                            <label htmlFor={"ppp"}>{"ppp"}</label>
                                                            <label htmlFor={"ppp"}>{validation("ppp")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"rrr"} value={state.rrr} onChange={handleInputChange}/>
                                                            <label htmlFor={"rrr"}>{"rrr"}</label>
                                                            <label htmlFor={"rrr"}>{validation("rrr")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"tr"} value={state.tr} onChange={handleInputChange}/>
                                                            <label htmlFor={"tr"}>{"tr"}</label>
                                                            <label htmlFor={"tr"}>{validation("tr")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"ww"} value={state.ww} onChange={handleInputChange}/>
                                                            <label htmlFor={"ww"}>{"ww"}</label>
                                                            <label htmlFor={"ww"}>{validation("ww")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"w1w2"} value={state.w1w2} onChange={handleInputChange}/>
                                                            <label htmlFor={"w1w2"}>{"w1w2"}</label>
                                                            <label htmlFor={"w1w2"}>{validation("w1w2")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"wawa"} value={state.wawa} onChange={handleInputChange}/>
                                                            <label htmlFor={"wawa"}>{"wawa"}</label>
                                                            <label htmlFor={"wawa"}>{validation("wawa")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"wa1"} value={state.wa1} onChange={handleInputChange}/>
                                                            <label htmlFor={"wa1"}>{"wa1"}</label>
                                                            <label htmlFor={"wa1"}>{validation("wa1")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"wa2"} value={state.wa2} onChange={handleInputChange}/>
                                                            <label htmlFor={"wa2"}>{"wa2"}</label>
                                                            <label htmlFor={"wa2"}>{validation("wa2")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"nh"} value={state.nh} onChange={handleInputChange}/>
                                                            <label htmlFor={"nh"}>{"nh"}</label>
                                                            <label htmlFor={"nh"}>{validation("nh")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"cl"} value={state.cl} onChange={handleInputChange}/>
                                                            <label htmlFor={"cl"}>{"cl"}</label>
                                                            <label htmlFor={"cl"}>{validation("cl")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"cm"} value={state.cm} onChange={handleInputChange}/>
                                                            <label htmlFor={"cm"}>{"cm"}</label>
                                                            <label htmlFor={"cm"}>{validation("cm")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"ch"} value={state.ch} onChange={handleInputChange}/>
                                                            <label htmlFor={"ch"}>{"ch"}</label>
                                                            <label htmlFor={"ch"}>{validation("ch")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"gggg"} value={state.gggg} onChange={handleInputChange}/>
                                                            <label htmlFor={"gggg"}>{"gggg"}</label>
                                                            <label htmlFor={"gggg"}>{validation("gggg")}</label>
                                                            </span>
                                                        </ContainerInput2> */}
                                                        </div>
                                                        {/* begining of section 2 */}
                                                        <div className={tab === 2 ? 'tab' : 'hide'}>
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"ds"} value={state.ds} onChange={handleInputChange}/>
                                                            <label htmlFor={"ds"}>{"ds"}</label>
                                                            <label htmlFor={"ds"}>{validation("ds")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"vs"} value={state.vs} onChange={handleInputChange}/>
                                                            <label htmlFor={"vs"}>{"vs"}</label>
                                                            <label htmlFor={"vs"}>{validation("vs")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"ss"} value={state.ss} onChange={handleInputChange}/>
                                                            <label htmlFor={"ss"}>{"ss"}</label>
                                                            <label htmlFor={"ss"}>{validation("ss")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"twtwtw"} value={state.twtwtw} onChange={handleInputChange}/>
                                                            <label htmlFor={"twtwtw"}>{"twtwtw"}</label>
                                                            <label htmlFor={"twtwtw"}>{validation("twtwtw")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"pwapwa"} value={state.pwapwa} onChange={handleInputChange}/>
                                                            <label htmlFor={"pwapwa"}>{"pwapwa"}</label>
                                                            <label htmlFor={"pwapwa"}>{validation("pwapwa")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"hwahwa"} value={state.hwahwa} onChange={handleInputChange}/>
                                                            <label htmlFor={"hwahwa"}>{"hwahwa"}</label>
                                                            <label htmlFor={"hwahwa"}>{validation("hwahwa")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"pwpw"} value={state.pwpw} onChange={handleInputChange}/>
                                                            <label htmlFor={"pwpw"}>{"pwpw"}</label>
                                                            <label htmlFor={"pwpw"}>{validation("pwpw")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"hwhw"} value={state.hwhw} onChange={handleInputChange}/>
                                                            <label htmlFor={"hwhw"}>{"hwhw"}</label>
                                                            <label htmlFor={"hwhw"}>{validation("hwhw")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"dw1dw1"} value={state.dw1dw1} onChange={handleInputChange}/>
                                                            <label htmlFor={"dw1dw1"}>{"dw1dw1"}</label>
                                                            <label htmlFor={"dw1dw1"}>{validation("dw1dw1")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"dw2dw2"} value={state.dw2dw2} onChange={handleInputChange}/>
                                                            <label htmlFor={"dw2dw2"}>{"dw2dw2"}</label>
                                                            <label htmlFor={"dw2dw2"}>{validation("dw2dw2")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"pw1pw1"} value={state.pw1pw1} onChange={handleInputChange}/>
                                                            <label htmlFor={"pw1pw1"}>{"pw1pw1"}</label>
                                                            <label htmlFor={"pw1pw1"}>{validation("pw1pw1")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"hw1hw1"} value={state.hw1hw1} onChange={handleInputChange}/>
                                                            <label htmlFor={"hw1hw1"}>{"hw1hw1"}</label>
                                                            <label htmlFor={"hw1hw1"}>{validation("hw1hw1")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"pw2pw2"} value={state.pw2pw2} onChange={handleInputChange}/>
                                                            <label htmlFor={"pw2pw2"}>{"pw2pw2"}</label>
                                                            <label htmlFor={"pw2pw2"}>{validation("pw2pw2")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"hw2hw2"} value={state.hw2hw2} onChange={handleInputChange}/>
                                                            <label htmlFor={"hw2hw2"}>{"hw2hw2"}</label>
                                                            <label htmlFor={"hw2hw2"}>{validation("hw2hw2")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"hwahwahwa"} value={state.hwahwahwa} onChange={handleInputChange}/>
                                                            <label htmlFor={"hwahwahwa"}>{"hwahwahwa"}</label>
                                                            <label htmlFor={"hwahwahwa"}>{validation("hwahwahwa")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"sw"} value={state.sw} onChange={handleInputChange}/>
                                                            <label htmlFor={"sw"}>{"sw"}</label>
                                                            <label htmlFor={"sw"}>{validation("sw")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"tbtbtb"} value={state.tbtbtb} onChange={handleInputChange}/>
                                                            <label htmlFor={"tbtbtb"}>{"tbtbtb"}</label>
                                                            <label htmlFor={"tbtbtb"}>{validation("tbtbtb")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"is_ice"} value={state.is_ice} onChange={handleInputChange}/>
                                                            <label htmlFor={"is_ice"}>{"is_ice"}</label>
                                                            <label htmlFor={"is_ice"}>{validation("is_ice")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"ci"} value={state.ci} onChange={handleInputChange}/>
                                                            <label htmlFor={"ci"}>{"ci"}</label>
                                                            <label htmlFor={"ci"}>{validation("ci")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"si"} value={state.si} onChange={handleInputChange}/>
                                                            <label htmlFor={"si"}>{"si"}</label>
                                                            <label htmlFor={"si"}>{validation("si")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"bi"} value={state.bi} onChange={handleInputChange}/>
                                                            <label htmlFor={"bi"}>{"bi"}</label>
                                                            <label htmlFor={"bi"}>{validation("bi")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"di"} value={state.di} onChange={handleInputChange}/>
                                                            <label htmlFor={"di"}>{"di"}</label>
                                                            <label htmlFor={"di"}>{validation("di")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false}type="text" name={"zi"} value={state.zi} onChange={handleInputChange}/>
                                                            <label htmlFor={"zi"}>{"zi"}</label>
                                                            <label htmlFor={"zi"}>{validation("zi")}</label>
                                                            </span>
                                                        </ContainerInput2>
{/* 
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"eses"} value={state.eses} onChange={handleInputChange}/>
                                                            <label htmlFor={"eses"}>{"eses"}</label>
                                                            <label htmlFor={"eses"}>{validation("eses")}</label>
                                                            </span>
                                                        </ContainerInput2> */}

                                                        {/* <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"rs"} value={state.rs} onChange={handleInputChange}/>
                                                            <label htmlFor={"rs"}>{"rs"}</label>
                                                            <label htmlFor={"rs"}>{validation("rs")}</label>
                                                            </span>
                                                        </ContainerInput2> */}
                                                        </div>
                                                        {/*begining of section 3*/}
                                                        <div className={tab === 3 ? 'tab' : 'hide'}>
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn1_3"} value={state.sn1_3} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn1_3"}>{"sn1_3"}</label>
                                                            <label htmlFor={"sn1_3"}>{validation("sn1_3")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"txtxtx"} value={state.txtxtx} onChange={handleInputChange}/>
                                                            <label htmlFor={"txtxtx"}>{"txtxtx"}</label>
                                                            <label htmlFor={"txtxtx"}>{validation("txtxtx")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn2_3"} value={state.sn2_3} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn2_3"}>{"sn2_3"}</label>
                                                            <label htmlFor={"sn2_3"}>{validation("sn2_3")}</label>
                                                            </span>
                                                        </ContainerInput2>
                                                        
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"tntntn"} value={state.tntntn} onChange={handleInputChange}/>
                                                            <label htmlFor={"tntntn"}>{"tntntn"}</label>
                                                            <label htmlFor={"tntntn"}>{validation("tntntn")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"ind89"} value={state.ind89} onChange={handleInputChange}/>
                                                            <label htmlFor={"ind89"}>{"ind89"}</label>
                                                            <label htmlFor={"ind89"}>{validation("ind89")}</label>
                                                            </span>
                                                        </ContainerInput2>
                                                        
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input type="text" name={"p24p24p24"} value={state.p24p24p24} onChange={handleInputChange}/>
                                                            <label htmlFor={"p24p24p24"}>{"p24p24p24"}</label>
                                                            <label htmlFor={"p24p24p24"}>{validation("p24p24p24")}</label>
                                                            </span>
                                                        </ContainerInput2>
                                                        </div>
                                                        {/*begning of section 5*/}
                                                        <div className={tab === 5 ? 'tab' : 'hide'}>
                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false} type="text" name={"ichw"} value={state.ichw} onChange={handleInputChange}/>
                                                            <label htmlFor={"ichw"}>{"ichw"}</label>
                                                            <label htmlFor={"ichw"}>{validation("ichw")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false} type="text" name={"icm"} value={state.icm} onChange={handleInputChange}/>
                                                            <label htmlFor={"icm"}>{"icm"}</label>
                                                            <label htmlFor={"icm"}>{validation("icm")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false} type="text" name={"cs"} value={state.cs} onChange={handleInputChange}/>
                                                            <label htmlFor={"cs"}>{"cs"}</label>
                                                            <label htmlFor={"cs"}>{validation("cs")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false} type="text" name={"icf"} value={state.icf} onChange={handleInputChange}/>
                                                            <label htmlFor={"icf"}>{"icf"}</label>
                                                            <label htmlFor={"icf"}>{validation("icf")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false} type="text" name={"icp"} value={state.icp} onChange={handleInputChange}/>
                                                            <label htmlFor={"icp"}>{"icp"}</label>
                                                            <label htmlFor={"icp"}>{validation("icp")}</label>
                                                            </span>
                                                        </ContainerInput2>

                                                        <ContainerInput2 historic={true}>
                                                            <span>
                                                            <input disabled={state.mimi === 'BB'? true : false} type="text" name={"icq"} value={state.icq} onChange={handleInputChange}/>
                                                            <label htmlFor={"icq"}>{"icq"}</label>
                                                            <label htmlFor={"icq"}>{validation("icq")}</label>
                                                            </span>
                                                        </ContainerInput2>
                                                        </div>
                    
                                    </Container>
                                    <Container align={'response'}>
                                        <div>{validationDTO()}</div>
                                    </Container>
                                    <footer>
                                        {/* {modal &&
                                            <PDFDownloadLink document={<PDFDocument object={state} />} fileName="somename.pdf">
                                                {({ loading }) => loading ? <Button disabled={true} category={'secondary'} >Wait</Button> : <Button category={'secondary'} >Download</Button>}
                                            </PDFDownloadLink>}
                                        <Button category={'primary'} onClick={resetItem} type='reset' >Reset</Button> */}
                                        <Button category={'primary'} onClick={()=>handleConfirm('create')} hidden={compositeOrNot()}>Create</Button>
                                        <Button category={'warning'} onClick={()=>handleConfirm('update')} hidden={!compositeOrNot()}>Update</Button>
                                        <Button category={'danger'} onClick={()=>handleConfirm('delete')} hidden={!compositeOrNot()}>Delete</Button>
                                        <Button category={'secondary'} onClick={handleModal}>Close</Button>
                                    </footer>
                                </>
                            }
                        </article>
                    </Modal>
                    <Header>
                        <span>
                            {!object.url.includes('istoric') && <Button category={'primary'} onClick={newItem}>New</Button>}
                            <TitleHeader>
                                <h1>{UriScreenFormat(object.url)}</h1>
                            </TitleHeader>
                        </span>
                        <a href={`#/${'profile'}`}><Button category={'secondary'}>{getPayload().sub}</Button></a>
                    </Header>
                    {/* {ispending && <Load></Load>} */}
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan={6}>
                                    <div className='header'>
                                        <div>
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
                                        if (!object.url.includes('weather') || index < 6) {
                                            return (<th onClick={() => searchKey(key)}>{key}</th>)
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
                                <th>
                                    <GroupButton>
                                        <ButtonPage onClick={() => handlePage(0)}>{'<<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} disabled={page <= 0 ? true : false}>{'<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} hidden={page <= 0 ? true : false}>{page}</ButtonPage>
                                        <ButtonPage selected={true} disabled  >{page + 1}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} hidden={page >= pageable.totalPages - 1 ? true : false}>{page + 2}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} disabled={page >= pageable.totalPages - 2 ? true : false}>{'>'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(pageable.totalPages - 1)}>{'>>'}</ButtonPage>
                                    </GroupButton>
                                </th>
                            </tr>
                            <tr><th>Total amount {pageable.totalElements}</th></tr>
                        </tfoot>
                    </Table>
                    <Toast className="notifications"></Toast>
                </>
            }
        </>
    )
}