import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { createTable } from '../event/mutateEventTable';
import { AppRouteParams } from '../nav/route';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';
import { Page } from './Page';

interface EventTableCreateForm extends RouteComponentProps, AppRouteParams {}

export function EventTableCreateForm(props: EventTableCreateForm) {
  const [eventId, setEventId] = React.useState<number>(0);
  const [head, setHeadId] = React.useState<number>(0);
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    createTable(getApolloClient(), {
      name,
      description,
      eventId,
      head,
      userCapacity: 8,
      }).then(result => {

        if  (!result.data?.createTable) {
          throw Error('Unable to create table.')
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
      <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="eventId">
          Event ID
        </label>
        <Input $onChange={e => setEventId(Number(e))} className="input" name="eventId" type="eventId" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="head">
          Who will be leading the table? (Input the User's ID)
        </label>
        <Input $onChange={e => setHeadId(Number(e))} className="input"  name="head" type="head" />
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

      <div className="mt3">
        <Button onClick={handleSubmit}>Create Table</Button>
      </div>
    </>
    </Page>
  );
}