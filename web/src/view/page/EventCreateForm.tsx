import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { createEvent } from '../../graphql/mutateEventCreateForm';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { AppRouteParams } from '../nav/route';
import { toast } from '../toast/toast';

interface EventCreateForm extends RouteComponentProps, AppRouteParams {}

export function EventCreateForm(props: EventCreateForm) {
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [orgName, setOrgName] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [eventName, setEventName] = React.useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log(`
      Start Time: ${startTime}
      End Time: ${endTime}
      Organization Name: ${orgName}
      Capacity: ${capacity}
      Description: ${description}
      Event Name: ${eventName}
    `);

    createEvent(getApolloClient(), {
    eventName: eventName,
    description: description,
    orgName: orgName,
    startTime: startTime,
    endTime: endTime,
    userCapacity: capacity
    }).then(() => {
      toast('submitted!')
    })

  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <h1>Create Event</h1>

    //   <label>
    //     Email:
    //     <input
    //       name="email"
    //       type="email"
    //       value={email}
    //       onChange={e => setEmail(e.target.value)}
    //       required />
    //   </label>

    //   <label>
    //     Password:
    //     <input
    //       name="password"
    //       type="password"
    //       value={password}
    //       onChange={e => setPassword(e.target.value)}
    //       required />
    //   </label>

    //   <label>
    //     orgName:
    //     <input
    //       name="orgName"
    //       type="orgName"
    //       value={orgName}
    //       onChange={e => setOrgName(e.target.value)}
    //       required />
    //   </label>

    //   <label>
    //     capacity:
    //     <input
    //       name="capacity"
    //       type="capacity"
    //       value={capacity}
    //       onChange={e => setCapacity(e.target.value)}
    //       required />
    //   </label>

    //   <label>
    //     description:
    //     <input
    //       name="description"
    //       type="description"
    //       value={description}
    //       onChange={e => setDescription(e.target.value)}
    //       required />
    //   </label>

    //   <label>
    //     eventName:
    //     <input
    //       name="eventName"
    //       type="eventName"
    //       value={eventName}
    //       onChange={e => setEventName(e.target.value)}
    //       required />
    //   </label>

    //   <button>Submit</button>
    // </form>

    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Start Time of Event
        </label>
        <Input $onChange={setStartTime}  name="startTime" type="startTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="setEndTime">
          End Time of Event
        </label>
        <Input  $onChange={setEndTime}  name="setEndTime" type="setEndTime" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="orgName">
          Organization Name
        </label>
        <Input  $onChange={setOrgName}  name="orgName" type="orgName" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="capacity">
          Estimated Capacity
        </label>
        <Input  $onChange={setCapacity}  name="capacity" type="capacity" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="description">
          Brief Description
        </label>
        <Input  $onChange={setDescription}  name="description" type="description" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="eventName">
          Event Name
        </label>
        <Input  $onChange={setEventName}  name="eventName" type="eventName" />
      </div>
      <div className="mt3">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );


}