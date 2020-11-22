import { useQuery } from '@apollo/client'
import * as React from 'react'
import { useState } from 'react'
import { fetchAllEvent } from '../../graphql/fetchEvent'
import { FetchAllEvent } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { link } from '../nav/Link'
import { getEventPath } from '../nav/route'

const ButtonLink = link(Button)

export function SearchEventsPage() {
  const [userQuery, setUserQuery] = useState('')
  const { loading, data } = useQuery<FetchAllEvent>(fetchAllEvent)

  if (loading) {
    return <div>loading...</div>
  }
  if (!data || data.events.length === 0) {
    return <div>no events</div>
  }

  return (
      <div className="mw6">
        <H1>Search for your event</H1>
        <Input $onChange={setUserQuery} placeholder="Enter event ID"/>
        <Spacer $h4 />
        {data.events
          .filter(event => event.id == parseInt(userQuery))
          .map((event, i) => (
            <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
              <ButtonLink to={getEventPath(event.id)} >Join Event</ButtonLink>
              <Spacer $w4 />
              {event.name} · {event.id}
            </div>
          ))}
      </div>
  )
}