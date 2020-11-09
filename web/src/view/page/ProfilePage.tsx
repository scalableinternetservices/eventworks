import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { AppRouteParams } from '../nav/route';

interface ProfileForm extends RouteComponentProps, AppRouteParams {}

export function Profile(props: ProfileForm) {
  const [name, setName] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [title, setTitle] = React.useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log(`
      Name: ${name}
      Linkedin: ${linkedin}
      Title: ${title}
    `);


    event.preventDefault();
  }
  //User goes to profile page
  //queries for user data to autodisplay
  //if none, show none
  //if successful, show user data and allow user to change their profile
  return (
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="name">
          Name
        </label>
        <Input $onChange={setName}  name="name" type="name" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="linkedin">
          Linkedin Link
        </label>
        <Input  $onChange={setLinkedin}  name="linkedin" type="linkedin" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="title">
          Title
        </label>
        <Input  $onChange={setTitle}  name="title" type="title" />
      </div>
      <div className="mt3">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );


}