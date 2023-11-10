import { Icon } from '../assets/svg.access';
import { getPayload, getRoles } from '../service/service.token'
import { Card, CardContainer } from './template/card';
import { Header, TitleHeader } from './template/header'
import { vector } from './menu';
import { UriScreenFormat } from '../service/uri.format';
import { ROLES } from '../AppRoutes';

export const Home = () => {

    return (
        <>
            <Header>
                <TitleHeader>Home<h1>{getPayload().sub}</h1></TitleHeader>
                <p>{getRoles()}</p>
            </Header>
            <CardContainer>
                <Card>
                    <a href={`#/food`} ><Icon name="toggles2"/><h2><p>Food</p></h2></a>
                </Card>
                <Card>
                    <a href={`#/food_category`} ><Icon name="calendar3"/><h2><p>Food Category</p></h2></a>
                </Card>
                <Card>
                    <a href={`#/user`} ><Icon name="people-circle"/><h2><p>User</p></h2></a>
                </Card>
                <Card>
                    <a href={`#/role`} ><Icon name="chat-quote-fill"/><h2><p>Role</p></h2></a>
                </Card>
                {vector.map((element) => {
                    // getRoles().some((element: string) => element === ROLES.ADMIN || element === ROLES.MODERATOR) 
                    return <Card><a key={element[1]} href={`#/${element[2]}`}><Icon name={element[1]} /><p>{UriScreenFormat(element[2])}</p></a></Card>
                    // :
                    // return null
                })}
            </CardContainer>
        </>
    );
}