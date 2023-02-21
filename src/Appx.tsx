import { ChangeEvent, useState } from 'react'
import { GameList } from './component/game.list'
import { FlexCointainer, SideItem, Sidebar } from './container/template/Flex'
import { Icon } from './assets/svg.access' 
// import image from './assets/image/hamburger2.png'
import hamburger from './assets/hamburger-list.svg'
import { Tooltip } from './container/tootip/Tooltip'
import { UserForm } from './component/user/user.form'

const Appx = () => {
  const [show, setShow] = useState(true)
  const changeShow = () => { setShow( !show ) }
  const vector: string[][] = [["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"]/*, ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"],["tooltip a", "chat-quote-fill", "item a"], ["tooltip b", "people-circle", "item b"], ["tooltip c", "table", "item c"]*/]

  return (
    <FlexCointainer element='all'>
      <Sidebar sidehide={show}>
        <>{vector.map((element) => {
          return <SideItem ><Tooltip data-tip={element[0]}><Icon name={element[1]} /></Tooltip><p>{element[2]}</p></SideItem>
        })}</>
        <SideItem ><Tooltip data-tip="collapsible"><Icon name="grid" /></Tooltip><p>Collapsible</p></SideItem>
        <SideItem onClick={changeShow}><Tooltip data-tip="hide items"><Icon name="grid" /></Tooltip><p>hide</p></SideItem>
      </Sidebar>
      <FlexCointainer element='main'>
        <FlexCointainer element='nav'>
          <SideItem>Sistema1</SideItem>
          {/* <FlexItem>2</FlexItem> */}
          <SideItem>3</SideItem>
        </FlexCointainer>
        <FlexCointainer element='content'>
          <UserForm />
          {/* <GameList></GameList> */}
        </FlexCointainer>
        {/* <FlexCointainer element='nav'>
          <div>Desenvolvido por <a href='https://www.chm.mb/'>CHM</a></div>
        </FlexCointainer> */}
      </FlexCointainer>
    </FlexCointainer>
  )
}

export default Appx