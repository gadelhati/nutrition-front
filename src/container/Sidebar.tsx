import { useState } from 'react'
import { SideTitle, SideItem, Sidebar } from './template/Flex'
import { Icon } from '../assets/svg.access' 
import { Tooltip } from './tootip/Tooltip'

export const SideContainer = () => {
  const [show, setShow] = useState(true)
  const changeShow = () => { setShow( !show ) }
  const vector: string[][] = [["tooltip auth", "collection", "auth"], ["tooltip user", "people-circle", "user"], ["tooltip role", "calendar3", "role"],["tooltip food", "toggles2", "food"], ["tooltip food category", "chat-quote-fill", "food_category"], ["tooltip preparation", "table", "preparation"]/*,["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"]*/]

  return (
      <Sidebar sidehide={show}>
        <SideTitle key={0} href={`#/`} ><Icon name="speedometer" /><p>Title</p></SideTitle>
        {vector.map((element) => {
          return <SideItem key={element[1]} href={`#/${element[2]}`} ><Tooltip data-tip={element[0]}><Icon name={element[1]} /></Tooltip><p>{element[2]}</p></SideItem>
        })}
        {/* <SideItem ><Tooltip data-tip="collapsible"><Icon name="speedometer" /></Tooltip><p>Collapsible</p></SideItem> */}
        <SideItem onClick={changeShow}><Tooltip data-tip="hide items"><Icon name="grid" /></Tooltip><p>hide</p></SideItem>
      </Sidebar>
  )
}