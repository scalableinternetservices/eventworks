import { Redirect, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { createEvent } from '../../graphql/mutateEventCreateForm';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { UserContext } from '../auth/user';
import { AppRouteParams, Route } from '../nav/route';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { Page } from './Page';

interface EventCreateForm extends RouteComponentProps, AppRouteParams {}

export function EventCreateForm(props: EventCreateForm) {
  const user = React.useContext(UserContext)
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [endTime, setEndTime] = React.useState<number | null>(null);
  const [orgName, setOrgName] = React.useState("");
  const [capacity, setCapacity] = React.useState<number | null>(null);
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  if (!user.user?.id) {
    return <Redirect to={Route.LOGIN_SIGNUP} />
  }

  const userId = user.user.id // prevent TS from reading it as nullable in createEvent

  const resetForm = () => {
    setStartTime(null)
    setEndTime(null)
    setOrgName("")
    setCapacity(null)
    setDescription("")
    setName("")
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!((startTime && startTime > 0)
      && (endTime && endTime > 0)
      && orgName
      && (capacity && capacity > 0)
      && name)) {
      toast("Cannot create: Form input must be valid. All mandatory fields must be filled with positive/valid values.")
      return
    }

    createEvent(getApolloClient(), {
      name,
      description,
      orgName,
      startTime,
      endTime,
      userCapacity: capacity,
      hostId: userId
      }).then(result => {
        if  (!result.data?.createEvent) {
          throw Error('Unable to create event.')
        }
        toast('Event Created! Your event id is ' + result.data?.createEvent.id + '. You can go to the find event page to find it.')
        return result
      }).then(resetForm)
        .catch(err => {
        handleError(err)
      })
  }

  return (
    <Page>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="eventName">
          Event Name*
        </label>
        <Input $onChange={setName} value={name} name="eventName" type="eventName" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="orgName">
          Organization Name*
        </label>
        <Input $onChange={setOrgName} value={orgName} name="orgName" type="orgName" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="description">
          Description
        </label>
        <Input $onChange={setDescription} value={description} name="description" type="description" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="capacity">
          Capacity*
        </label>
        <Input $onChange={e => setCapacity(Number(e))} value={capacity || ''} name="capacity" type="capacity" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="startTime">
          Start Time*
        </label>
        <Input $onChange={e => setStartTime(Number(e))} value={startTime || ''} name="startTime" type="startTime" required />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="endTime">
          End Time*
        </label>
        <Input $onChange={e => setEndTime(Number(e))} value={endTime || ''} name="endTime" type="endTime" required />
      </div>
      <div className="mt3">
        <Button onClick={handleSubmit}>Create Event</Button>
      </div>
    </Page>
  );
}