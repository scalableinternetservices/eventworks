import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Login } from '../auth/Login'
import { Signup } from '../auth/SignUp'
import { AccountApp, AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { Profile } from './ProfilePage'

interface LoginPageProps extends RouteComponentProps, AppRouteParams {}

export function LoginPage(props: LoginPageProps) {
  return <Page>{getLoginApp(props.form)}</Page>
}

function getLoginApp(form?: AccountApp) {
  if (!form) {
    return <div>choose an app</div>
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
