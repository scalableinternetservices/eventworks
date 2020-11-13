import { Redirect, RouteComponentProps } from '@reach/router';
import * as React from "react";
import { useState } from 'react';
import { Button } from '../../style/button';
import { H2 } from '../../style/header';
import { Spacer } from '../../style/spacer';
import { style } from '../../style/styled';
import { BodyText } from '../../style/text';
import { AppRouteParams, Route } from '../nav/route';
import { Page } from './Page';

interface LandingPageProps extends RouteComponentProps, AppRouteParams {}

export function LandingPage(props: LandingPageProps) {
  return (
    <Page>
      <LandingPageContent />
    </Page>
  )
}

function LandingPageContent(props: LandingPageProps) {
  return (
    <Columnflex>
      <Halfwidth><LeftColumn/></Halfwidth>
      <Halfwidth><RightColumn/></Halfwidth>
    </Columnflex>
  )
}

function LeftColumn(props: LandingPageProps) {
  // const signUp = () => {
  //   //how to redirect to the sign up page?
  //     return <Redirect to={"/"+Route.LOGIN_SIGNUP} />
  // }
  //copied from HomePage - something aint right
  const [jumpToSignUp, setJumpToSignUp] = useState(false)

  const signUp = () => {
      setJumpToSignUp(true)
  }
  if (jumpToSignUp) {
    return <Redirect to={"/"+Route.LOGIN_SIGNUP} />
  }
  return (
    <div>
      <Spacer $h4 /><Spacer $h4 /><Spacer $h4 />
      <H2>We make events work.</H2>
        <Spacer $h4 />
        <BodyText>Our scalable internet service helps you host your own</BodyText>
        <BodyText> virtual networking event in just 3 easy steps!</BodyText>
        <Spacer $h4 /><Spacer $h4 />
      <Button onClick={signUp}>Sign Up</Button>
    </div>
  )
}

function RightColumn(props: LandingPageProps) {
  return (
    <CenterLine>
      <H2>Sign Up</H2>
        <BodyText>Create an account with your name, a profile photo, and a linkedin!</BodyText>
        <Spacer $h4 />
      <H2>Create an Event</H2>
        <BodyText>Enter some basic logistics to create an event with a custom link. You can invite other users to sign up and join this event!</BodyText>
        <Spacer $h4 />
      <H2>Join a Table to Chat</H2>
        <BodyText>You will automatically be added to a chatroom with the other table occupants.</BodyText>
    </CenterLine>
  )
}

const Columnflex = style('div','cf')
const Halfwidth = style('div', 'fl w-50 pa1 tl')
const CenterLine = style('div', 'pl5 bl b--silver')

export default LandingPage;