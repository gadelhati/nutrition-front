import { useState, useEffect } from 'react';
import { retrieveAll } from '../../service/crud.service';

export const GenericDatatable = <T extends {id: string, name: string}>(objects: any, url: string) => {
    const [state, setState] = useState<T>(objects.object)
    const [states, setStates] = useState<T[]>([objects.objects])

    useEffect(() => {
        retrieveAllItem()
    }, [])
    const validActions = (data: any) => {
        setStates(data)
        console.log(states)
    }
    const retrieveAllItem = async() => {
        let data = await retrieveAll(objects.url.toLowerCase(), state.name)
        validActions(data)
    }

    return (
        <>
            <table>
                 {states.map((element)=>{
                     return <tr><td>{element.id}</td><td>{element.name}</td></tr>
                 })}
            </table>
            
            <button onClick={retrieveAllItem}>Retrieve All by search M</button>
        </>
    );
}