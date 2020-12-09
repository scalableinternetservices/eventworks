import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H2, H3 } from '../../style/header'
import { style } from '../../style/styled'
import { Login } from '../auth/Login'
import { Signup } from '../auth/SignUp'
import { UserContext } from '../auth/user'
import { AccountApp, AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { Profile } from './ProfilePage'
import { UserEvents } from './UserEvents'

interface LoginPageProps extends RouteComponentProps, AppRouteParams {}

export function LoginPage(props: LoginPageProps) {
  return <Page>{getLoginApp(props.form)}</Page>
}

function getLoginApp(form?: AccountApp) {
  const user = React.useContext(UserContext)
  if (!form) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
          <div style={{ marginRight: 60 }}>
            <H2>Account</H2>
            {user.user ? (
              <div className="mw8">
                <H3>ID: {user.user.id} </H3>
                <H3>Name: {user.user.name}</H3>
                <H3>Email: {user.user.email}</H3>
                <H3>Linkedin: {user.user.linkedinLink}</H3>
              </div>
            ) : "" }
            <Login />
          </div>
          {!user.user ? (
            <CenterLine>
              <H2>Sign Up</H2>
              <Signup />
            </CenterLine>
          ) : (
            <CenterLine>
              <H2>Edit Profile</H2>
              <Profile/>
            </CenterLine>
          )}
        </div>

        {user.user ? (<div style={{display: 'flex', justifyContent: 'center', marginTop: '90px'}}>
          <H2>Events You're Hosting</H2>
        </div>) : ""}

        <div className="allEvents" style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
          {user.user ? (
            user.user.hostedEvents?.map(event => (
              <UserEvents event={event} />
            ))
          ) : (
            ""
          )}
        </div>
      </>
    )
  }

  return "error"

  /*switch (form) {
    case AccountApp.PROFILE:
      return <Profile />
    case AccountApp.SIGNUP:
      return <Signup />
    case AccountApp.LOGIN:
      return <Login />
    default:
      throw new Error('no app found')
  }*/
}

const CenterLine = style('div', 'pl5 bl b--silver')