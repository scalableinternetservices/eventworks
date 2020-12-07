import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '../../style/button'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { UserContext } from '../auth/user'
import { link } from '../nav/Link'
import { AppRouteParams, getEventPath, Route } from '../nav/route'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}
const ButtonLink = link(Button)

const homePageContentStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
  position: 'absolute',
  left: 0
} as React.CSSProperties

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const HomePage = (props: HomePageProps) => {
  const user = React.useContext(UserContext)
  return (
    <Page>
      <div style={homePageContentStyle}>
        <div style={{ marginRight: 30 }}>
        <div>
          {!user.user ? (
            <>
              <H2>Easy Sign Up</H2>
              <Spacer $h1 />
              <BodyText>Log in or create an account with just your name and email.</BodyText>
              <Spacer $h2 />
              <ButtonLink to={Route.LOGIN_SIGNUP}>Log In / Sign Up</ButtonLink>
              <Spacer $h4 />
            </>
          ) : null}
          {user.user ? (
            <>
              <H1 style={{ fontWeight: 500 }}>Now all you need to do is...</H1>
              <Spacer $h4 />
            </>
          ) : null}
          <H2>Create an Event</H2>
          <Spacer $h1 />
          <BodyText>
            Enter some basic logistics to create an event with a custom link. <br/>
            Then share the link with other users so they can join when the event goes live!
          </BodyText>
          <Spacer $h4 />
          <H2>Join a Table to Chat</H2>
          <Spacer $h1 />
          <BodyText>You can join chatrooms with other table occupants.</BodyText>
        </div>
        </div>
        {user.user ? <CreateOrJoinEvent /> : null}
      </div>
    </Page>
  )
}

const CreateOrJoinEvent = () => {
  const [eventId, setEventId] = useState<number | null>(null)
  return (
    <CenterLine style={{
      marginLeft: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ marginBottom: 15 }}>
        <ButtonLink to={Route.CREATE_FORM}>Create Event</ButtonLink>
      </div>
      <H2 style={{ marginBottom: 15 }}>or</H2>
      <div>
        <Input
          placeholder="Enter event ID"
          type="number"
          min="1"
          value={eventId || ''}
          $onChange={e => setEventId(parseInt(e))}
          style={{ marginBottom: 20 }}
        />
        <ButtonLink to={eventId ? getEventPath(eventId) : Route.HOME} >Join Event</ButtonLink>
      </div>
    </CenterLine>
  )
}

const CenterLine = style('div', 'pl5 bl b--silver')
