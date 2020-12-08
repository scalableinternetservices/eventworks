import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { Button } from '../../style/button';
import { H1 } from '../../style/header';
import { Input } from '../../style/input';
import { LoggedInUserCtx, UserContext } from '../auth/user';
import { createTable } from '../event/mutateEventTable';
import { AppRouteParams } from '../nav/route';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { Page } from './Page';

interface EventTableCreateForm extends RouteComponentProps, AppRouteParams {}

export function EventTableCreateForm(props: EventTableCreateForm) {
  const user = React.useContext(UserContext) as LoggedInUserCtx
  const [eventId, setEventId] = React.useState<number>(0);
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    createTable(getApolloClient(), {
      name,
      description,
      eventId,
      head: user.user.id,
      userCapacity: 8,
      senderId: user.user.id
    }).then(result => {

      if (!result.data) {
        throw Error('Unable to create table.')
      } else if (!result.data.createTable) {
        throw Error('Table limit exceeded for event. Cannot create more tables.')
      }

      toast('Table created for your event!')

      // make field empty
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      return result
    }).catch(err => {
      handleError(err)
    })
  }

  return (
    <Page>
      <H1 style={{ fontWeight: 600 }}>Create a Table for your Event</H1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="eventId">
            Event ID
          </label>
          <Input $onChange={e => setEventId(Number(e))} className="input" name="eventId" type="eventId" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="eventName">
            Name of Table
          </label>
          <Input $onChange={setName} className="input"  name="eventName" type="eventName" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="description">
            Description of Table
          </label>
          <Input $onChange={setDescription} className="input" name="description" type="description" />
        </div>

        <div className="mt3" style={{ marginTop: 40 }}>
          <Button onClick={handleSubmit}>Create Table</Button>
        </div>
      </div>
    </Page>
  );
}