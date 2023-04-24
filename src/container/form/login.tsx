import { useState, ChangeEvent } from 'react'
import { User } from "../../component/user/user.interface"
import { initialUser } from '../../component/user/user.initial'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { login } from '../../service/service.crud'
import { Tooltip } from '../tootip/Tooltip'
import { ContainerInput } from './generic.field'
import { CenterContainer, CenterItem } from '../template/Flex'
import { Button } from '../template/Button';
import { logout } from '../../service/service.auth'
import { existsToken, isValidToken } from '../../service/service.token'
import logo from '../../assets/image/marinha.png'
import { Rotate } from '../template/Rotate'

export const UserSignin = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])

    const refresh = () => {
        window.location.reload()
    }
    const resetItem = () => {
        setState(initialUser)
        setError([initialErrorMessage])
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        error?.map(element => { if (name == element.field) return vector.push(element?.message) })
        return vector
    }
    const validationConnection = (): string[] => {
        let vector: string[] = []
        error?.map(element => { if (element.field?.startsWith("conection")) return vector.push(element?.message) })
        return vector
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
        await login('auth', state)
        .then((data)=>{
            if(data[0]?.field === undefined) {
                validAction(data)
            } else {
                setError(data)
            }
        })
        .catch((error) => {
            setError([{ field: 'conection', message: 'API error' }])
        })
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
                <Rotate src={logo} alt="" width="120" height="128"></Rotate>
                <Tooltip data-tip={validation('username')} hidden={validation('username').length === 0} >
                    <ContainerInput>
                        <input type={'text'} required name={'username'} value={state.username} onChange={handleInputChange} autoComplete='off' />
                        <label htmlFor="name">Name</label>
                    </ContainerInput>
                </Tooltip>
                <Tooltip data-tip={validation('password')} hidden={validation('password').length === 0} >
                    <ContainerInput>
                        <input type={'password'} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                        <label htmlFor="password">Password</label>
                    </ContainerInput>
                </Tooltip>
                <CenterItem direction={'row'}>
                    {!isValidToken() && <Button onClick={loginUser}>Login</Button>}
                    {isValidToken() && <Button onClick={logoutUser}>Logout</Button>}
                    <Button onClick={resetItem}>Reset{existsToken()}</Button>
                </CenterItem>
                {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
                <div>{validationConnection()}</div>
            </CenterItem>
        </CenterContainer>
    );
}