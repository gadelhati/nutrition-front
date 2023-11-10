import { vector } from "./menu"
import { retrieve } from '../service/service.crud'

export const accessList = () => {

    let list: boolean[] = []
    vector.map((element: string[], index: number) => {
        retrieve(element[2], 20, 20, '', '').then((data: any) => {
            list[index]=true
        }).catch((error) => { list[index]=false })
    })
    return list
}