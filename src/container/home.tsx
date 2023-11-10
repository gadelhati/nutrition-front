import { useState, useEffect } from 'react'
import { Icon } from '../assets/svg.access';
import { getPayload, getRoles } from '../service/service.token'
import { Card, CardContainer } from './template/card';
import { Header, TitleHeader } from './template/header'
import { vector } from './menu';
import { UriScreenFormat } from '../service/uri.format';
import { retrieve } from '../service/service.crud';

export const Home = () => {
    const [list, setList] = useState<boolean[]>([])

    useEffect(()=>{
        retrieveItem()
    },[])
    const retrieveItem = async () => {
        let list1: boolean[] = []
        vector.map((element: string[], index: number) => {
            retrieve(element[2], 20, 20, '', '').then((data: any) => {
                list1[index]=true
            }).catch((error) => { list1[index]=false })
        })
        setList(list1)
    }
    return (
        <>
            <Header>
                <TitleHeader>Home<h1>{getPayload().sub}</h1></TitleHeader>
                <p>{getRoles()}</p>
            </Header>
            <CardContainer>
                {list.map((element, index) => {
                    return element === true && <Card><a key={vector[index][1]} href={`#/${vector[index][2]}`}><Icon name={vector[index][1]} /><p>{UriScreenFormat(vector[index][2])}</p></a></Card>
                })}
            </CardContainer>
        </>
    );
}