import { useState, useEffect, useTransition } from 'react'
import { Icon } from '../assets/svg.access';
import { getPayload, getRoles } from '../service/service.token'
import { Card, CardContainer } from './template/card'
import { Header, TitleHeader } from './template/header'
import { vector } from './menu';
import { UriScreenFormat } from '../service/uri.format'
import { retrieve } from '../service/service.crud'
import { accessList } from './access.list'
import { Button } from './template/button'

export const Home = () => {
    const [ispending, startTransition] = useTransition()
    const [list, setList] = useState<boolean[]>([])

    useEffect(()=> {
        startTransition(() => setList(accessList()))
    },[])
    return (
        <>
            <Header>
                <TitleHeader>Home<h1>{getPayload().sub}</h1></TitleHeader>
                <a href={`#/${'profile'}`}><Button category={'small'}>{getPayload().sub}</Button></a>
            </Header>
            <CardContainer>
                {list.map((element, index) => {
                    return element === true && <Card key={vector[index][1]}><a key={vector[index][1]} href={`#/${vector[index][2]}`}><Icon name={vector[index][1]} /><p>{UriScreenFormat(vector[index][2])}</p></a></Card>
                })}
            </CardContainer>
        </>
    );
}