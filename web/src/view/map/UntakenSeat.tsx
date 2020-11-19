import { useQuery } from '@apollo/client';
import * as React from 'react';
import { FetchUserContext, User } from '../../graphql/query.gen';
import { fetchUser } from '../auth/fetchUser';

export function UntakenSeat({tableSeat}:{tableSeat: number}) {
  /*const {data: eventTableData, refetch: refetchTableData} = useQuery<FetchTable, FetchTableVariables>(fetchTable, {
    variables: { tableId: eventTableId }
  });

  const {data: userData, } = useQuery<FetchUserContext, User>(fetchUser);

  const handleJoin = (e: any) => {
    e.preventDefault()

    joinTable(getApolloClient(), {
        eventTableId: eventTableId,
        participantId: userData?.self?.id || 0
        }).then(result => {
          if  (!result.data?.joinTable.id) {
            throw Error('User does not exist')
          }
          toast('Joined Table!')
          refetchTableData()

        }).catch(err => {
          handleError(err)
        })
      }*/

  const {data: userData, } = useQuery<FetchUserContext, User>(fetchUser);

  const seatStyle = {
    display: "inline-block",
    backgroundColor: "#000000",
    opacity: "0.2",
    borderRadius: "50%",
    height: "36px",
    width: "36px",
    margin: "10px 6px"
  };
  const horizontalPlus = {
    position: "relative",
    backgroundColor: "#ffffff",
    width: "50%",
    height: "12.5%",
    left: "25%",
    top: "43.75%"
  } as React.CSSProperties;
  const verticalPlus = {
    position: "relative",
    backgroundColor: "#ffffff",
    width: "12.5%",
    height: "50%",
    left: "43.75%",
    top: "12.5%"
  } as React.CSSProperties;


  return (
    <div className={"seat " + tableSeat} /*onClick={handleJoin}*/ style={seatStyle} >
      {userData?.self ? true ? <> <div className='horizontalPlus' style={horizontalPlus}></div>
      <div className='verticalPlus' style={verticalPlus}></div> </> : <div style={{display: "none"}}/> : <div style={{display: "none"}}/>}
    </div>
  )
}