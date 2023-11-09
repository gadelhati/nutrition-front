import { useState } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader } from '../template/flex'
import { Icon } from '../../assets/svg.access' 
import { Tooltip } from '../tooltip/tooltip'
import { UriScreenFormat } from '../../service/uri.format'
import { getPayload, getRoles } from '../../service/service.token'
import { ROLES } from '../../AppRoutes'

export const SideContainer = () => {
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
        {/* {vector.map((element) => {
          return <SideItem key={element[1]} href={`#/${element[2]}`} ><Tooltip data-tip={element[0]}><Icon name={element[1]} /></Tooltip><p>{UriScreenFormat(element[2])}</p></SideItem>
        })} */}
        {/* <SideItem ><Tooltip data-tip="collapsible"><Icon name="speedometer" /></Tooltip><p>Collapsible</p></SideItem> */}
          {getRoles().some((element: string) => element === ROLES.ADMIN || element === ROLES.MODERATOR) &&
            <SideItem key={'user'} href={`#/user`} ><Tooltip data-tip={'user'}><Icon name={'people-circle'} /></Tooltip><p>{UriScreenFormat('user')}</p></SideItem>
          }
          {getRoles().some((element: string) => element === ROLES.ADMIN) &&
            <SideItem key={'role'} href={`#/role`} ><Tooltip data-tip={'role'}><Icon name={'calendar3'} /></Tooltip><p>{UriScreenFormat('role')}</p></SideItem>
          }
          <SideItem key={'food'} href={`#/food`} ><Tooltip data-tip={'food'}><Icon name={'toggles2'} /></Tooltip><p>{UriScreenFormat('food')}</p></SideItem>
          <SideItem key={'food category'} href={`#/food_category`} ><Tooltip data-tip={'food category'}><Icon name={'chat-quote-fill'} /></Tooltip><p>{UriScreenFormat('food_category')}</p></SideItem>
        </SidebarHeader>
        <SideItem element={'final'} href={`#/${'profile'}`} ><Tooltip data-tip="profile"><Icon name="profile-circle" /></Tooltip><p>{getPayload().sub}</p></SideItem>
      </Sidebar>
  )
}