import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { createEvent } from '../../graphql/mutateEventCreateForm';
import { FetchUserContext, User } from '../../graphql/query.gen';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { fetchUser } from '../auth/fetchUser';
import { createTable } from '../event/mutateEventTable';
import { AppRouteParams } from '../nav/route';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { Page } from './Page';

interface EventCreateForm extends RouteComponentProps, AppRouteParams {}

export function EventCreateForm(props: EventCreateForm) {
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [orgName, setOrgName] = React.useState("");
  const [capacity, setCapacity] = React.useState<number>(0);
  const [description, setDescription] = React.useState("");
  const [eventName, setEventName] = React.useState("");
  const {data} = useQuery<FetchUserContext, User>(fetchUser);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(startTime)
    console.log(endTime)
    console.log(orgName)
    console.log(capacity)
    console.log(description)
    console.log(eventName)

    let eventIdTemp:number = 0;
    let userIdTemp:number = 0;

    if (data?.self?.id) {
      userIdTemp = data?.self?.id;
    }

    createEvent(getApolloClient(), {
      eventName: eventName,
      description: description,
      orgName: orgName,
      startTime: startTime,
      endTime: endTime,
      userCapacity: capacity
      }).then((result) => {
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );

        if  (result.data?.createEvent.id) {
          eventIdTemp = result.data?.createEvent.id;
        }

        toast('Event Created! Your event id is ' + result.data?.createEvent.id)
      }).then(() => {
        createTable(getApolloClient(), {
          eventId: eventIdTemp,
          head: userIdTemp,
          name: 'Event ' + eventIdTemp,
          description: description,
          userCapacity: capacity
        })
      }).catch(err => {
        handleError(err)
      })


  }

  return (
    <Page>
      <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="startTime">
          Start Time
        </label>
        <Input $onChange={setStartTime} className="input" name="startTime" type="startTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="endTime">
          End Time
        </label>
        <Input $onChange={setEndTime} className="input" name="endTime" type="endTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="capacity">
          Estimated Capacity
        </label>
        <Input $onChange={e => setCapacity(Number(e))} className="input" name="capacity" type="capacity" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="orgName">
          Organization Name
        </label>
        <Input $onChange={setOrgName} className="input" name="orgName" type="orgName" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="eventName">
          Event Name
        </label>
        <Input $onChange={setEventName} className="input" name="eventName" type="eventName" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="description">
          Description
        </label>
        <Input $onChange={setDescription} className="input" name="description" type="description" />
      </div>

      <div className="mt3">
        <Button onClick={handleSubmit}>Create Event</Button>
      </div>
    </>
    </Page>
  );
}

  /*<form onSubmit={handleSubmit}>
        <label>
          Start Time
          <input type="text" value={startTime} onChange={e => setStartTime(e.target.value)} />
        </label>
        <label>
          End Time
          <input type="text" value={endTime} onChange={e => setEndTime(e.target.value)} />
        </label>
        <label>
          Organization Name
          <input type="text" value={orgName} onChange={e => setOrgName(e.target.value)} />
        </label>
        <label>
          Event Name
          <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} />
        </label>
        <label>
          Estimated Capcity
          <input type="text" value={capacity} onChange={e => setCapacity(e.target.valueAsNumber)} />
        </label>
        <label>
          Description
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </label>
      <input type="submit" value="Submit" />
    </form>*/