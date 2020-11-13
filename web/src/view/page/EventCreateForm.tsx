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
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [orgName, setOrgName] = React.useState("");
  const [userCapacity, setUserCapacity] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const {data} = useQuery<FetchUserContext, User>(fetchUser);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let eventIdTemp: number = 0;
    let userIdTemp: number = 0;

    if (data?.self?.id) {
      userIdTemp = data?.self?.id;
    }

    createEvent(getApolloClient(), {
      name,
      description,
      orgName,
      startTime,
      endTime,
      userCapacity
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
        description,
        userCapacity
      })
    }).catch(err => {
      handleError(err)
    })
  }

  return (
    <Page>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="startTime">
          Start Time
        </label>
        <Input $onChange={e => setStartTime(Number(e))} className="input" name="startTime" type="startTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="endTime">
          End Time
        </label>
        <Input $onChange={e => setEndTime(Number(e))} className="input" name="endTime" type="endTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="capacity">
          Estimated Capacity
        </label>
        <Input $onChange={e => setUserCapacity(Number(e))} className="input" name="capacity" type="capacity" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="orgName">
          Organization Name
        </label>
        <Input $onChange={setOrgName} className="input" name="orgName" type="orgName" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="name">
          Event Name
        </label>
        <Input $onChange={setName} className="input" name="name" type="name" />
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
    </Page>
  );
}