import * as React from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { updateUser } from '../auth/mutateUser';
import { UserContext } from '../auth/user';
import { handleError } from '../toast/error';
import { toast } from '../toast/toast';

export function Profile() {
  const user = React.useContext(UserContext)
  const [name, setName] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [email, setEmail] = React.useState("");

  const resetForm = () => {
    setName('')
    setLinkedin('')
    setEmail('')
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    updateUser(getApolloClient(), {
      id: user.user?.id,
      name: name,
      title: "",
      email: email,
      linkedinLink: linkedin
    }).then(() => {
      toast('Your profile has been updated!')
    }).then(resetForm).catch(err => {
      handleError(err)
    })
    event.preventDefault();
  }
  return (
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="name">
          Name
        </label>
        <Input $onChange={setName} value={name} name="name" type="name" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="title">
          Email
        </label>
        <Input  $onChange={setEmail} value={email} name="email" type="email" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="linkedin">
          Linkedin Link (Optional)
        </label>
        <Input  $onChange={setLinkedin} value={linkedin} name="linkedin" type="linkedin" />
      </div>
      <div className="mt3">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );};