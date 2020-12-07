import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H2 } from '../../style/header'
import { style } from '../../style/styled'
import { Login } from '../auth/Login'
import { Signup } from '../auth/SignUp'
import { UserContext } from '../auth/user'
import { AccountApp, AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { Profile } from './ProfilePage'

interface LoginPageProps extends RouteComponentProps, AppRouteParams {}

export function LoginPage(props: LoginPageProps) {
  return <Page>{getLoginApp(props.form)}</Page>
}

function getLoginApp(form?: AccountApp) {
  const user = React.useContext(UserContext)
  if (!form) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
        <div style={{ marginRight: 60 }}>
          <H2>Account</H2>
          <Login />
        </div>
        {!user.user ? (
          <CenterLine>
            <H2>Sign Up</H2>
            <Signup />
          </CenterLine>
        ) : null}
      </div>
    )
  }
  switch (form) {
    case AccountApp.PROFILE:
      return <Profile />
    case AccountApp.SIGNUP:
      return <Signup />
    case AccountApp.LOGIN:
      return <Login />
    default:
      throw new Error('no app found')
  }
}

const CenterLine = style('div', 'pl5 bl b--silver')