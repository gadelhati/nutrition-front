import { useState, useEffect, useTransition } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader, SidebarCollapsible } from '../template/flex'
import { Icon } from '../../assets/svg.access'
import { UriScreenFormat } from '../../service/uri.format'
import { logout } from '../../service/service.crud'
import { accessList } from '../access.list'
import { vector } from '../menu'
import logo from '../../assets/image/coffee2.png'

export const SideContainer = () => {
  // const [ispending, startTransition] = useTransition()
  const [collapsible, setCollapsible] = useState(false)
  const [list, setList] = useState<boolean[]>(accessList())
  const [show, setShow] = useState(true)
  const showCollapsible = () => { setCollapsible(!collapsible) }
  const changeShow = () => { setShow(!show) }

  const collapse: string[][] = [
    ["weather_historic", "bootstrap", "weather/historic"],
    ["weather_historic_off_hore", "table", "weatherOffShore/historic"],
    ["weather_historic_on_hore", "geo-fill", "weatherOnShore/historic"],
    ["station_historic", "cpu-fill", "station/historic"]]

  // useEffect(()=> {
  //   startTransition(() => setList(accessList()))
  // },[])
  return (
    <Sidebar>
      <SidebarHeader>
        <SideTitle sidehide={show} key={0} href={`#/`} >
          <p>Home</p><img src={logo} />
        </SideTitle>
        {list.map((element, index) => {
          return element === true && <SideItem key={vector[index][1]} href={`#/${vector[index][0]}`}><Icon name={vector[index][1]} /><p>{UriScreenFormat(vector[index][0])}</p></SideItem>
        })}
        <SidebarCollapsible collapsible={collapsible}>
            <SideItem key={0} onClick={showCollapsible}>
              <div><span>historic</span><Icon name="geo2" /></div></SideItem>
            {collapse.map((element) => {
              return <SideItem key={element[1]} href={`#/${element[0]}`} ><Icon name={element[1]} /><p>{UriScreenFormat(element[0])}</p></SideItem>
            })}
        </SidebarCollapsible>
      </SidebarHeader>
      <SideItem key={'logout'} href={`#/${'login'}`} element={'final'} onClick={logout}><Icon name={'geo-fill'} /><p>logout</p></SideItem>
    </Sidebar>
  )
}