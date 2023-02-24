import { useState, ChangeEvent, useEffect } from 'react';
import { Food } from "../../component/food/food.interface";
import { initialFood } from '../../component/food/food.initial';
import { ErrorMessage } from '../../assets/error/errorMessage';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { login, create, retrieve, retrieveAll, update, remove, removeAll } from '../../component/user/crud.service';
import { Container, ContainerInput, ContainerLabel } from '../field/user.field';
import { api } from '../../assets/api/api';
import { Crud } from '../../component/user/crud.buttons';

export const FoodList = () => {
    const [state, setState] = useState<Food>(initialFood)
    const [states, setStates] = useState<Food[]>([initialFood])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<string[]>([])

    
    // Pendente (Pending).
    // Resolvida (Resolved) (não está na documentação, mas gosto de definir esse estado também).
    // Rejeitada (Rejected).
    // Realizada (Fulfilled).
    // Estabelecida (Settled).

    useEffect(() => {
        setAtributeItem(initialFood)
    }, [])
    const resetItem = () => {
        setState(initialFood)
    }
    const createItem = () => {
        create('food', state)
    }
    const retrieve2 = async<T extends {}>(url: string, search: string): Promise<T> => {
        let errorMessage: ErrorMessage[] = []
        return await api.get(`/${url}/${search}`)
            .then(response => {
                setState(response.data.content[0])
                console.log(response.data.content[0])
                return response.data?.content[0]
            })
            .catch(function (error) {
                error.response.data?.errors?.forEach((element: ErrorMessage) => {
                    errorMessage.push({ field: element.field, defaultMessage: element.defaultMessage })
                })
                return errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
            });
    }
    const updateItem = () => {
        update('food', state)
    }
    const deleteItem = () => {
        remove('food', state.id)
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    const setAtributeItem = (object: Object) => {
        setAtribute([])
        Object.entries(state).map(([key, value]) => {
            setAtribute(atribute => [...atribute, 
                (key === 'password' ? 'password':
                (typeof value === 'boolean' ? 'checkbox':
                // range
                (typeof value === 'number' ? 'number':
                // select_option, radio
                (typeof value === 'object' ? 'string':
                (typeof value === 'string' ? 'text':'date'
            )))))])
        })
    }
    const showShow = () => {
        console.log(atribute)
    }

    return (
        <>
            <Container>
                {Object.entries(state).map(([key, value], index) => {
                    return (
                        <div>
                            <ContainerInput type={atribute[index]} placeholder={key} name={key} value={value} onChange={handleInputChange} autoComplete='off'/>
                        </div>
                    )
                })}
            </Container>
            <button onClick={() => retrieve2('food', state.name)}>Retrieve 2</button>
            <Crud initialObject={initialFood} object={state} name={"food"} error={error}></Crud>
            {JSON.stringify(state)}
        </>
    );
}