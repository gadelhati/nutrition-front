import { User } from "../user/user.interface";
import { initialAtribute } from "./atribute.initial";

export const AtributeSet = (initial: User) => {
    var atributes: [{ type: string, worth: any }]
    atributes = [initialAtribute]

    let atribute_name: string
    atributes.shift()
    Object.entries(initial).map(([key, value]) => {
        if (key === 'password')
            atribute_name = 'password'
        else if (typeof value === 'boolean')
            atribute_name = 'boolean'
        else if (typeof value === 'number')
            atribute_name = 'number'
        else if (typeof value.getMonth === 'function')
            atribute_name = 'date'
        else if (Array.isArray(value))
            atribute_name = 'array'
        else
            atribute_name = 'text'
        atributes.push({ type: atribute_name, worth: value })
    })
    return atributes
}