import { Redirect, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { createEvent } from '../../graphql/mutateEventCreateForm';
import { Button } from '../../style/button';
import { H1 } from '../../style/header';
import { Input } from '../../style/input';
import { UserContext } from '../auth/user';
import { AppRouteParams, Route } from '../nav/route';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { Page } from './Page';

interface EventCreateForm extends RouteComponentProps, AppRouteParams {}

export function EventCreateForm(props: EventCreateForm) {
  const user = React.useContext(UserContext)
  const [startTime, setStartTime] = React.useState<string>('');
  const [endTime, setEndTime] = React.useState<string>('');
  const [orgName, setOrgName] = React.useState("");
  const [capacity, setCapacity] = React.useState<number | null>(null);
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  if (!user.user) {
    return <Redirect to={`/${Route.LOGIN_SIGNUP}`} />
  }

  const userId = user.user.id // prevent TS from reading it as nullable in createEvent

  const resetForm = () => {
    setStartTime('')
    setEndTime('')
    setOrgName("")
    setCapacity(null)
    setDescription("")
    setName("")
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const startTimeDate = new Date(startTime)
    const endTimeDate = new Date(endTime)

    if (!(startTimeDate && endTimeDate && orgName && capacity && name)) {
      toast("Cannot create: Form input must be valid. All mandatory fields must be filled with positive/valid values.")
      return
    }

    if (endTimeDate < new Date()) {
      toast("Cannot create: Start time is before current time.")
      return
    }

    if (startTimeDate >= endTimeDate) {
      toast("Cannot create: End time must come before start time.")
      return
    }

    createEvent(getApolloClient(), {
      name,
      description,
      orgName,
      startTime: startTimeDate.getTime(),
      endTime: endTimeDate.getTime(),
      userCapacity: capacity,
      hostId: userId
      }).then(result => {
        if  (!result.data?.createEvent) {
          throw Error('Unable to create event.')
        }
        toast('Event Created! Your event id is ' + result.data?.createEvent.id + '. Make sure to keep this event ID, it is important to access!')
        return result
      }).then(resetForm)
        .catch(handleError)
  }

  return (
    <Page>
      <H1 style={{ fontWeight: 600 }}>Create Event</H1>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="eventName">
          Event Name*
        </label>
        <Input $onChange={setName} value={name} name="eventName" type="text" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="orgName">
          Organization Name*
        </label>
        <Input $onChange={setOrgName} value={orgName} name="orgName" type="text" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="description">
          Description
        </label>
        <Input $onChange={setDescription} value={description} name="description" type="text" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="capacity">
          Capacity*
        </label>
        <Input $onChange={e => setCapacity(Number(e))} value={capacity || ''} name="capacity" type="number" min="1" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="startTime">
          Start Time*
        </label>
        <Input $onChange={e => setStartTime(e)} value={startTime} name="startTime" type="datetime-local" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="endTime">
          End Time*
        </label>
        <Input $onChange={e => setEndTime(e)} value={endTime} name="endTime" type="datetime-local" required />
      </div>
      <div className="mt3">
        <Button onClick={handleSubmit}>Create Event</Button>
      </div>
    </Page>
  );
}