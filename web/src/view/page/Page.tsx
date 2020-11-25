import * as React from 'react'
import { NavBar } from '../nav/NavBar'

export function Page(props: React.PropsWithChildren<JSX.IntrinsicElements['div']>) {
  return (
    <div className="mw8" style={{overflow:"auto"}}>
      <NavBar />
      {props.children}
    </div>
  )
}
