import * as React from 'react';

export function TakenSeat({tableSeat}:{tableSeat: number}) {
  /*const {data: eventTableData, refetch: refetchTableData} = useQuery<FetchTable, FetchTableVariables>(fetchTable, {
    variables: { tableId: eventTableId }
  });

  const {data: userData, } = useQuery<FetchUserContext, User>(fetchUser);

  const handleLeave = (e: any) => {
    e.preventDefault()

    leaveTable(getApolloClient(), {
        eventTableId: eventTableId,
        participantId: userData?.self?.id || 0
        }).then(result => {
          if  (!result.data?.leaveTable.id) {
            throw Error('User does not exist')
          }
          toast('Left Table!')
          refetchTableData()

        }).catch(err => {
          handleError(err)
        })
      }*/

  const sitStyle = {
    display: "inline-block",
    backgroundColor: "#000000",
    opacity: "1",
    borderRadius: "50%",
    height: "36px",
    width: "36px",
    margin: "10px 6px"
  }
  const horizontalPlus = {
    position: "relative",
    backgroundColor: "#ffffff",
    width: "50%",
    height: "12.5%",
    left: "25%",
    top: "43.75%"
  } as React.CSSProperties;

  return (
    <div className={"seat " + tableSeat} /*onClick={handleLeave}*/ style={sitStyle} >
      <div className='horizontalPlus' style={horizontalPlus}></div>
      <div className='verticalPlus' style={{display: "none"}}></div>
    </div>
  )
}