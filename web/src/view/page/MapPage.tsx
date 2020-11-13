import * as React from 'react';
import { Room } from '../map/Room';

export function MapPage({ eventId }: { eventId: number }) {
  return (
      <Room eventId = {eventId}/>
  )
}