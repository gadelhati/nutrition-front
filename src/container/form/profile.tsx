import { getPayload, getRoles, isValidToken } from '../../service/service.token'
import { ErrorBoundary } from 'react-error-boundary'

export const Profile = () => {
    
    return (
        <ErrorBoundary fallback={<div> Something went wrong </div>} >
            { isValidToken() && <>{getPayload().sub}{getRoles()}</> }
        </ErrorBoundary>
    )
}