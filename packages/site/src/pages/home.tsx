import React, { Suspense, useState, useEffect } from 'react'
import { NavLink, Routes, Outlet, Link, Route } from 'react-router-dom'
import { Space } from 'otaku-ui'
import style from '../App.module.scss'
import routes from '../router/index'
import http from '../api'

export default function Home () {
  const [data, setData] = useState<{
    stargazers_count?: number
  }>({})

  const getData = () => {
    http
      .get('https://api.github.com/repos/diy4869/otaku-ui', {
        headers: {
          Authorization: 'token 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'
        }
      })
      .then(res => {
        console.log(res)
        setData(res.data)
      })
  }

  const processRouter = routes
    .filter(item => item.children)
    .reduce((router, current) => {
      const result = current.children?.map(children => {
        return (
          <Route
            path={children.path}
            key={children.path}
            index={children.path === '/dev/introduce'}
            element={
              <React.Suspense fallback={<>...</>}>
                <children.component></children.component>
              </React.Suspense>
            }
          />
        )
      })

      return router.concat(result)
    }, [])

    console.log(processRouter)
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div className={style['otaku-home']}>
        <header className={style['otaku-header']}>
          <div className={style['otaku-title']}>
            <span>OTAKU-UI</span>
          </div>

          <Space>
            <a href='https://github.com/diy4869/otaku-ui' target='_blank'>
              GitHub
            </a>
            <Link to='/playground'>Playground</Link>
            <span
              className={`iconfont otaku-icon-star-fill ${style['github-star']}`}
            ></span>
            <span className={`${style['github-star']}`}>
              {data.stargazers_count ?? 0}
            </span>
          </Space>
        </header>
        <aside className={style['content']}>
          <aside className={style['sidebar']}>
            {routes.map(item => {
              return (
                <>
                  <h3 className={style['title']}>{item.title}</h3>
                  <div className={style['otaku-menu']}>
                    {item.children?.map(children => {
                      return (
                        <NavLink
                          className={({ isActive }) => {
                            const className = [style['otaku-menu-item']]

                            return isActive
                              ? className.concat(style['active']).join(' ')
                              : className.join(' ')
                          }}
                          to={children.path}
                        >
                          {children.title}
                        </NavLink>
                      )
                    })}
                  </div>
                </>
              )
            })}
          </aside>
          <Suspense fallback={<div></div>}>
            <aside className='main'>
              <Routes>
                {processRouter}
              </Routes>
              {/* <Outlet></Outlet> */}
            </aside>
            <aside className='anchor-container'></aside>
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
