import { useState } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader } from '../template/flex'
import { Icon } from '../../assets/svg.access' 
import { Tooltip } from '../tooltip/tooltip'
import { UriScreenFormat } from '../../service/uri.format'
import { getPayload } from '../../service/service.token'

export const SideContainer = () => {
  const [show, setShow] = useState(true)
  const changeShow = () => { setShow( !show ) }
  const vector: string[][] = [["tooltip user", "people-circle", "user"], ["tooltip role", "calendar3", "role"],["tooltip food", "toggles2", "food"], ["tooltip food category", "chat-quote-fill", "food_category"]/*, ["tooltip profile", "people-circle", "profile"], ["tooltip preparation", "table", "preparation"], ["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"]*/]

  return (
      <Sidebar sidehide={show}>
        <SidebarHeader>
        <SideTitle key={0} href={`#/`} ><span onClick={changeShow} ><Icon name="collection"/></span><p>Home</p></SideTitle>
        {vector.map((element) => {
          return <SideItem key={element[1]} href={`#/${element[2]}`} ><Tooltip data-tip={element[0]}><Icon name={element[1]} /></Tooltip><p>{UriScreenFormat(element[2])}</p></SideItem>
        })}
        {/* <SideItem ><Tooltip data-tip="collapsible"><Icon name="speedometer" /></Tooltip><p>Collapsible</p></SideItem> */}
        </SidebarHeader>
        {/* <SideItem element={'final'} onClick={changeShow} ><Tooltip data-tip="hide items"><Icon name="grid" /></Tooltip><p>hide</p></SideItem> */}
        <SideItem element={'final'} href={`#/${'profile'}`} ><Tooltip data-tip="tooltip profile"><Icon name="people-circle" /></Tooltip><p>{getPayload().sub}</p></SideItem>
      </Sidebar>
  )
}