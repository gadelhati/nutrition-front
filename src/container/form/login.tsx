import { useState, ChangeEvent } from 'react'
import { User } from "../../component/user/user.interface"
import { initialUser } from '../../component/user/user.initial'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { login, create, retrieve, update, remove, removeAll } from '../../service/crud.service'
import { Tooltip } from '../tootip/Tooltip'
import { ContainerInput } from './generic.field'
import { Button, CenterContainer, CenterItem } from '../template/Flex'
import { logout } from '../../service/service.auth'
import { existsToken, getToken, isValidToken } from '../../service/service.token'

export const UserSignin = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])

    const refresh = () => {
        window.location.reload()
    }
    const resetItem = () => {
        setState(initialUser)
    }
    const validAction = (data: any) => {
        if (data?.id) {
            setState(data)
            setError([initialErrorMessage])
        } else {
            setError(data)
        }
        refresh()
    }
    const loginUser = async () => {
        let data = await login('auth', state)
        validAction(data)
    }
    const logoutUser = async () => {
        logout()
        resetItem()
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    return (
        <CenterContainer>
            <CenterItem>
                <Tooltip data-tip={'user'} hidden={true} >
                    <ContainerInput type={'text'} placeholder={'username'} name={'username'} value={state.username} onChange={handleInputChange} autoComplete='off' />
                </Tooltip>
                <Tooltip data-tip={'password'} hidden={true} >
                    <ContainerInput type={'password'} placeholder={'password'} name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                </Tooltip>
                {!isValidToken() && <Button onClick={loginUser}>Login</Button>}
                {isValidToken() && <Button onClick={logoutUser}>Logout</Button>}
                <Button onClick={resetItem}>Reset{existsToken()}</Button>
                {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
            </CenterItem>
        </CenterContainer>
    );
}