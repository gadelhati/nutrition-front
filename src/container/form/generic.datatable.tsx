import { useState, useEffect } from 'react';
import { retrieve } from '../../service/crud.service';
import { Pageable } from '../../component/Pageable';
import { initialPageable } from '../../component/initialPageable';

export const GenericDatatable = <T extends {id: string, name: string}>(objects: any, url: string) => {
    const [state, setState] = useState<T>(objects.object)
    const [states, setStates] = useState<T[]>(objects.objects)
    const [page, setPage] = useState<number>(0)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const paginator = 5;

    useEffect(() => {
        retrieveItem()
    }, [])
    const validActions = async (data: any) => {
        setStates(data)
    }
    const retrieveItem = async() => {
        let data = await retrieve(objects.url.toLowerCase(), page, 8, "name")
        setPageable(data)
        setStates(data.content)
        validActions(data)
    }

    return (
        <>
            {JSON.stringify(states)}
            <table>
                 {states.map((element)=>{
                     return <tr><td>{element.id}</td><td>{element.name}</td></tr>
                 })}
            </table>
            
            <button onClick={retrieveItem}>Retrieve All by search M</button>
        </>
    );
}