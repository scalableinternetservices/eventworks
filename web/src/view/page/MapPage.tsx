import { useQuery } from '@apollo/client';
import { Redirect, RouteComponentProps, useLocation } from '@reach/router';
import * as React from 'react';
import { useContext } from 'react';
import { fetchEvent } from '../../graphql/fetchEvent';
import { FetchEvent, FetchEventVariables } from '../../graphql/query.gen';
import { LoggedInUserCtx, UserContext } from '../auth/user';
import { Room } from '../map/Room';
import { AppRouteParams, Route } from '../nav/route';
import { Page } from './Page';
import { SearchEventsPage } from './SearchEventPage';

interface EventMapPageProps extends RouteComponentProps, AppRouteParams {}

export function EventMapPage(props: EventMapPageProps) {
  const user = useContext(UserContext)
  const location = useLocation()
  const [, eventIdStr] = (location.search || '').split('?eventID=')

  const eventId = Number(eventIdStr)

  if (!user.user?.id) {
    return <Redirect to={`/${Route.HOME}`} />
  }

  return (
    <Page>
      {eventId > 0 ? <MapPage eventId={eventId} user={user as LoggedInUserCtx} /> : <SearchEventsPage />}
    </Page>
  )
}

interface MapPageProps {
  user: LoggedInUserCtx
  eventId: number
}

export function MapPage({ user, eventId }: MapPageProps) {
  const { data } = useQuery<FetchEvent, FetchEventVariables>(fetchEvent, {
    variables: { eventId }
  })

  if (!data?.event) {
    return <div>Could no longer find event.</div>
  }

  return (
    <Page>
      <Room event={data} user={user} />
    </Page>
  )
}