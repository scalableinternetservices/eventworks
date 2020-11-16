import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { createEvent } from '../../graphql/mutateEventCreateForm';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { AppRouteParams } from '../nav/route';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { Page } from './Page';

interface EventCreateForm extends RouteComponentProps, AppRouteParams {}

export function EventCreateForm(props: EventCreateForm) {
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [orgName, setOrgName] = React.useState("");
  const [capacity, setCapacity] = React.useState<number>(0);
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    createEvent(getApolloClient(), {
      name,
      description,
      orgName,
      startTime,
      endTime,
      userCapacity: capacity
      }).then(result => {
        if  (!result.data?.createEvent) {
          throw Error('Unable to create event.')
        }
        toast('Event Created! Your event id is ' + result.data?.createEvent.id)
        return result
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
        <Input $onChange={e => setStartTime(Number(e))} name="startTime" type="startTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="endTime">
          End Time
        </label>
        <Input $onChange={e => setEndTime(Number(e))} name="endTime" type="endTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="capacity">
          Estimated Capacity
        </label>
        <Input $onChange={e => setCapacity(Number(e))} name="capacity" type="capacity" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="orgName">
          Organization Name
        </label>
        <Input $onChange={setOrgName} name="orgName" type="orgName" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="eventName">
          Event Name
        </label>
        <Input $onChange={setName} name="eventName" type="eventName" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="description">
          Description
        </label>
        <Input $onChange={setDescription} name="description" type="description" />
      </div>

      <div className="mt3">
        <Button onClick={handleSubmit}>Create Event</Button>
      </div>
    </>
    </Page>
  );
}