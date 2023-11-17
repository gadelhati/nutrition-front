import { useState, useEffect, useTransition } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader, SidebarCollapsible } from '../template/flex'
import { Icon } from '../../assets/svg.access'
import { Tooltip } from '../tooltip/tooltip'
import { UriScreenFormat } from '../../service/uri.format'
import { logout } from '../../service/service.crud'
import { accessList } from '../access.list'
import { vector } from '../menu'

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
    <Sidebar sidehide={show}>
      <SidebarHeader>
        <SideTitle sidehide={show} key={0} href={`#/`} >
          <span>Home</span>
          <span onClick={changeShow} >
            <Tooltip data-tip={'collapse'}>
              <Icon name="geo2" />
            </Tooltip>
          </span>
        </SideTitle>
        {list.map((element, index) => {
          return element === true && <SideItem key={vector[index][1]} href={`#/${vector[index][2]}`}><Tooltip data-tip={vector[index][0]}><Icon name={vector[index][1]} /><p>{UriScreenFormat(vector[index][2])}</p></Tooltip></SideItem>
        })}
        <SidebarCollapsible collapsible={collapsible}>
            <SideItem key={0} onClick={showCollapsible}><Tooltip data-tip={'historic'}><Icon name="speedometer" /><p>historic</p></Tooltip><Icon name="geo2" /></SideItem>
            {collapse.map((element) => {
              return <SideItem key={element[1]} href={`#/${element[2]}`} ><Tooltip data-tip={element[0].replaceAll('_', ' ')}><Icon name={element[1]} /><p>{UriScreenFormat(element[2])}</p></Tooltip></SideItem>
            })}
        </SidebarCollapsible>
      </SidebarHeader>
      <SideItem key={'logout'} href={`#/${'login'}`} element={'final'} onClick={logout}><Tooltip data-tip={"profile"}><Icon name={'geo-fill'} /></Tooltip><p>logout</p></SideItem>
    </Sidebar>
  )
}