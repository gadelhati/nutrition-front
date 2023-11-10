import { useState, useEffect } from 'react'
import militaries from './militaries.json'

export const Military = () => {
    const [list, setList] = useState<Object[][]>([])
    const [service, setService] = useState<number>(0)

    useEffect(()=> {
        division()
    },[])
    const division = () => {
        list[0]=[]
        list[1]=[]
        militaries.map((military, index)=>{
            if(index < militaries.length/2) list[0].push(military)
            else list[1].push(military)
        })
        console.log("l1: ", list[0])
        console.log("l2: ", list[1])
        setList(list)
        return list
    }
    const supervisor = (index: number) => {
        return militaries.find((military)=> military.order === index)
    }
    const serviceDay = (index: number) => {
        let service1: number = service
        let serve: number|undefined
        serve = militaries.find((military) => military.order > index)?.order
        if(serve !== undefined && serve < militaries.length) {
            setService(service1 + 1)
        }else {
            setService(0)
        }
    }
    const serviceDiv = (lista: Object[], index: number) => {
        let service1: number = service
        // let serve: number|undefined
        // serve = lista[index]?.order
        // console.log(lista.length, lista, service1, lista[index])
        console.log(list[index])
        if(index < lista.length) {
            setService(service1 + 1)
        }else {
            setService(0)
        }
    }
    const day = (lista: Object[], index: number) => {
        if(index >= lista.length) {
            // setService(0)
            index = 0
        }
        console.log(lista.length, lista)
        console.log(lista[index])
        setService(index + 1)
    }
    return(
        <>
            <div>{militaries[0].active}</div>
            <div>s1: {supervisor(3)?.name}</div>
            <div>s2: {supervisor(7)?.name}</div>
            <button onClick={division}>division</button>
            {/* <div>{JSON.stringify(list[0][0])}</div>
            <div>{JSON.stringify(list[1][0])}</div> */}
            <button onClick={()=>serviceDay(service)}>serviceDay{service}</button>
            {/* <div>{JSON.stringify(militaries[service])}</div> */}
            <button onClick={()=>serviceDiv(list[1], service)}>serviceDiv{service}</button>
            {/* <button onClick={()=>day(list[0], service)}>day</button> */}
        </>
    )
}