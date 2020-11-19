import * as React from 'react';
import { Room } from '../map/Room';

export function MapPage({ eventId }: { eventId: number }) {
  /*const {data: userData} = useQuery<FetchUserContext>(fetchUser)
  const {data: singleEventData } = useQuery<FetchEvent, FetchEventVariables>(fetchEvent, {
    variables: {eventId: eventId}
  })

  React.useEffect(() => {
    if (singleEventData?.event.eventTables?.length) {
      if (singleEventData?.event.eventTables[0].id != 0) {
        joinTable(getApolloClient(), {
          eventTableId: singleEventData?.event ? (singleEventData.event.eventTables?.length ? singleEventData.event.eventTables[0].id : 0) : 0,
          participantId: userData?.self?.id || 0
          }).then(result => {
            if  (!result.data?.joinTable.id) {
              throw Error('User does not exist')
            }
            toast('Welcome to the event!')

          }).catch(err => {
            handleError(err)
          })
      }
    }

    return () => {
      if (singleEventData?.event.eventTables?.length) {
        if (singleEventData?.event.eventTables[0].id != 0) {
          leaveTable(getApolloClient(), {
            eventTableId: singleEventData?.event ? (singleEventData.event.eventTables?.length ? singleEventData.event.eventTables[0].id : 0) : 0,
            participantId: userData?.self?.id || 0
            }).then(result => {
              if  (!result.data?.leaveTable.id) {
                throw Error('User does not exist')
              }
              toast('Left the event!')

            }).catch(err => {
              handleError(err)
            })
        }
      }
    }
  });*/

  return (
      <Room eventId={eventId}/>
  )
}