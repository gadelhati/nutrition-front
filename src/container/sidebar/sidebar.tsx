import { useState } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader } from '../template/flex'
import { Icon } from '../../assets/svg.access' 
import { Tooltip } from '../tooltip/tooltip'
import { UriScreenFormat } from '../../service/uri.format'
import { logout } from '../../service/service.crud'
import { accessList } from '../access.list'

export const SideContainer = () => {
  const [list, setList] = useState<boolean[]>(accessList())
  const [show, setShow] = useState(true)
  const changeShow = () => { setShow( !show ) }
  const vector: string[][] = [["user", "people-circle", "user"], ["role", "calendar3", "role"],["food", "toggles2", "food"], ["food category", "chat-quote-fill", "food_category"]/*, ["profile", "people-circle", "profile"], ["preparation", "table", "preparation"], ["a", "chat-quote-fill", "item a"], ["b", "people-circle", "item b"], ["c", "table", "item c"],["a", "chat-quote-fill", "item a"], ["b", "people-circle", "item b"], ["c", "table", "item c"],["a", "chat-quote-fill", "item a"], ["b", "people-circle", "item b"], ["c", "table", "item c"],["a", "chat-quote-fill", "item a"], ["b", "people-circle", "item b"], ["c", "table", "item c"]*/]

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
        <SideItem key={'logout'} href={`#/${'login'}`} element={'final'} onClick={logout}><Tooltip data-tip="profile"><Icon name={'profile-circle'} /></Tooltip><p>logout</p></SideItem>
      </Sidebar>
  )
}