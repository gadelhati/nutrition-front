import { useState, ChangeEvent, useEffect } from 'react';
import { Food } from "../../component/food/food.interface";
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { create, retrieve, retrieveAll, update, remove, removeAll } from '../../component/user/crud.service';
import { Container, ContainerInput, ContainerLabel } from '../field/user.field';
import { AtributeSet } from '../../component/atribute/atribute.set';
import { initialFood } from '../../component/food/food.initial';
import { Atribute } from '../../component/atribute/atribute.interface';

export const FoodList = (initial: Food) => {
    const [state, setState] = useState<Food>(initial)
    const [states, setStates] = useState<Food[]>([initial])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(initialFood))

    const resetItem = () => {
        setState(initial)
    }
    const createItem = async () => {
        await create('food', state)
    }
    const retrieveItem = async() => {
        setState(await retrieve('food', state.id))
    }
    const retrieveAllItem = async() => {
        setState(await retrieveAll('food', state.name))
    }
    const updateItem = async() => {
        await update('food', state)
    }
    const deleteItem = () => {
        remove('food', state.id)
        resetItem()
    }
    const deleteAllItem = () => {
        removeAll('food')
        resetItem()
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    const handleInputChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    return (
        <>
            { atribute &&
            <Container>
                {Object.entries(state).map(([key, value], index) => {
                    return (
                        <div>
                            {Array.isArray(atribute[index].worth) ?
                                <select name={key} onChange={handleInputChangeSelect}>
                                    {atribute[index].worth.map((result: any) => <option placeholder={key} data-value={result} >{result}</option>)}
                                </select> :
                                <ContainerInput type={atribute[index].type} placeholder={key} name={key} value={value} onChange={handleInputChange} autoComplete='off'/>
                            }
                            <ContainerLabel>{atribute[index].type}</ContainerLabel>
                        </div>
                    )
                })}
            </Container>
            }
            <button onClick={resetItem}>Reset</button>
            <button onClick={createItem}>Create</button>
            <button onClick={retrieveItem}>Retrieve</button>
            <button onClick={retrieveAllItem}>Retrieve All</button>
            <button onClick={updateItem}>Update</button>
            <button onClick={deleteItem}>Delete</button>
            <br/>
        </>
    );
}