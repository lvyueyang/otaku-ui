import React, { useState, useContext, useEffect } from 'react'
import './style.scss'

interface TabProps {
  active: 0,
  children: React.ReactElement[]
}

interface TabPaneProps {
  name: string
  id: number | string
  children?: React.ReactNode
}

interface tabContext {
  current: number | string
}

const Context = React.createContext<tabContext>({current: 0})

export function TabPane (props: TabPaneProps) {
  const { id, name } = props
  const { current } = useContext(Context)

  return (
      <li 
        className={`otaku-tab-pane ${current === `${id}` ? 'otaku-tab-pane-active' : ''}`} 
        data-id={id}>
        <span data-id={id}>{name}</span>
      </li>    
  )
}

export function Tab (props: TabProps) {
  const {
    active,
    children
  } = props

  const [current, setCurrent] = useState(`${active}`)
  const [tabData, setTabData] = useState<React.ReactElement>()
 
  useEffect(() => {
    setCurrent(`${active}`)
      const find = children.find(item => item.props.id === active)
      if (find) setTabData(find)
    
  }, [active])

  return (
    <Context.Provider value={{
      current: `${current}`
    }}>
      <ul className="otaku-tab" onClick={(e) => {
          const dataset = e.target.dataset
          const find = children.find(item => `${item.props.id}` === dataset.id)

          if (find) setTabData(find)
          setCurrent(dataset.id)
        }}>
        {children}
      </ul>
      <aside className="otaku-tab-content">{tabData?.props.children}</aside>
    </Context.Provider>
  )
}