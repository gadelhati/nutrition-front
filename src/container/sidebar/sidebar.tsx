import { useState, useEffect, useTransition } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader } from '../template/flex'
import { Icon } from '../../assets/svg.access' 
import { Tooltip } from '../tooltip/tooltip'
import { UriScreenFormat } from '../../service/uri.format'
import { logout } from '../../service/service.crud'
import { accessList } from '../access.list'
import { vector } from '../menu'

export const SideContainer = () => {
  // const [ispending, startTransition] = useTransition()
  const [list, setList] = useState<boolean[]>(accessList())
  const [show, setShow] = useState(true)
  const changeShow = () => { setShow( !show ) }

  // useEffect(()=> {
  //   startTransition(() => setList(accessList()))
  // },[])
  return (
      <Sidebar sidehide={show}>
        <SidebarHeader>
        <SideTitle sidehide={show} key={0} href={`#/`} >
            <span>Home</span>
            <span onClick={changeShow} >
              <Tooltip data-tip={'collapse'}>
                <Icon name="geo2"/>
              </Tooltip>
            </span>
        </SideTitle>
        {list.map((element, index) => {
          return element === true && <SideItem key={vector[index][1]} href={`#/${vector[index][2]}`}><Tooltip data-tip={vector[index][0]}><Icon name={vector[index][1]} /></Tooltip><p>{UriScreenFormat(vector[index][2])}</p></SideItem>
        })}
        </SidebarHeader>
        <SideItem key={'logout'} href={`#/${'login'}`} element={'final'} onClick={logout}><Tooltip data-tip={"profile"}><Icon name={'geo-fill'} /></Tooltip><p>logout</p></SideItem>
      </Sidebar>
  )
}