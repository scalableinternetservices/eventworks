import { useQuery } from '@apollo/client';
import * as React from 'react';
import { FetchUserContext } from '../../graphql/query.gen';
import { H1 } from '../../style/header';
import { fetchUser } from '../auth/fetchUser';

export function Profile() {
  const { loading, data } = useQuery<FetchUserContext>(fetchUser);

  if (loading) {
    return (<div>loading...</div>)
  }
  if (!data) {
    return (<div>no user information</div>)
  }

  return (
    <div className="mw8">
      <H1>ID: {data.self?.id ? data.self?.id : "None"} </H1>
      <H1>Name: {data.self?.name ? data.self?.name : "None"}</H1>
      <H1>Email: {data.self?.email ? data.self?.email : "None"}</H1>
    </div>
  )
  /*const [name, setName] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log(`
      Name: ${name}
      Linkedin: ${linkedin}
      Title: ${title}
      Email: ${email}
    `);

    updateUser(getApolloClient(), {
      name: name,
      title: title,
      email: email,
      linkedinLink: linkedin
    }).then(() => {
      toast('submitted!')
    }).catch(err => {
      handleError(err)
    })
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
        <label className="db fw4 lh-copy f6" htmlFor="title">
          Email
        </label>
        <Input  $onChange={setEmail}  name="email" type="email" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="linkedin">
          Linkedin Link (Optional)
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
  );*/
};