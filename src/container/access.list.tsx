import { useTransition } from 'react'
import { vector } from "./menu"
import { retrieve } from '../service/service.crud'

export const accessList = () => {

    // const [ispending, startTransition] = useTransition()
    // const setList = (index: number) => {
    //     list[index]=true
    // }
    let list: boolean[] = []
    vector.map((element: string[], index: number) => {
        retrieve(element[2], 20, 20, '', '').then((data: any) => {
            list[index]=true
            // startTransition(() => setList(index))
        }).catch((error) => { list[index]=false })
    })
    return list
}