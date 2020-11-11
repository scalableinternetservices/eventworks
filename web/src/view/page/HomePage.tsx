import { Redirect, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useState } from 'react'
import { Button } from '../../style/button'
import { H1 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams, Route } from '../nav/route'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const HomePage = (props: HomePageProps) => {
  const user = useContext(UserContext)
  const [eventId, setEventId] = useState('')
  const [jumpToEvent, setJumpToEvent] = useState(false)

  const jumpToEventFunc = () => {
    if (eventId) {
      setJumpToEvent(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' ) {
      jumpToEventFunc()
    }
  }

  if (!user?.user) {
    return <Redirect to={"/"+Route.LOGIN_SIGNUP} />
  }

  if (jumpToEvent) {
    return <Redirect to={"/event/"+eventId} />
  }

  return (
    <Page>
      <H1>Eventworks</H1>
      <Table>
        <TR>
          <TD>
            <a href={Route.CREATE_FORM} style={{ textDecoration: 'none' }}><Button>Create Event</Button></a>
          </TD>
        </TR>
        <Spacer $h2 />
        <TR>
          <TD style={{ padding: '20px 10px 10px 16px' }}>
            <input
              type="number"
              min="1"
              pattern="\d+"
              placeholder="Enter event ID"
              value={eventId}
              onChange={e => setEventId(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ border: '1px solid black', padding: 5 }}
            />
          </TD>
        </TR>
        <TR>
          <TD>
            <Button onClick={jumpToEventFunc}>Join Event</Button>
          </TD>
        </TR>
      </Table>
    </Page>
  )
}

const Table = style('table', '')

const TR = style('tr', '')
const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })