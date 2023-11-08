import { Icon } from '../assets/svg.access';
import { getPayload, getRoles } from '../service/service.token'
import { Card, CardContainer } from './template/card';
import { SideTitle } from './template/flex';
import { Header, TitleHeader } from './template/header'
import { Tooltip } from './tooltip/tooltip';

export const Home = () => {

    return (
        <>
            <Header>
                <TitleHeader>Home<h1>{getPayload().sub}</h1></TitleHeader>
                <p>{getRoles()}</p>
            </Header>
            <CardContainer>
                <Card>
                    <h2><a href={`#/food`} ><Icon name="collection"/><p>Food</p></a></h2>
                </Card>
                <Card>
                    <h2><a href={`#/food_category`} ><Icon name="collection"/><p>Food Category</p></a></h2>
                </Card>
                <Card>
                    <h2><a href={`#/user`} ><Icon name="collection"/><p>User</p></a></h2>
                </Card>
                <Card>
                    <h2><a href={`#/role`} ><Icon name="collection"/><p>Role</p></a></h2>
                </Card>
            </CardContainer>
        </>
    );
}