import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'
import { sleep, check } from 'k6'

export const options = {
  scenarios: {
    example_scenario: {
      executor: 'constant-vus',
      vus: 25,
      duration: '200s',

    },
  },
}

export default function () {

  //Create random Signup users
  var randomNumber = '' + Math.random(1) * 100
  var payload = JSON.stringify({
    email: 'something@gmail.com' + randomNumber,
    name: 'testing',
  })
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
 //goto home page
  http.get('http://localhost:3000/')
  //sign up
  http.post('http://localhost:3000/auth/createUser', payload, params)


  sleep(Math.random() * 3)
  //Create an Event
  let eventCreation = `
  mutation CreateEvents{
    createEvent(input: {startTime:2, endTime:4, userCapacity:1000, name:"Juicy", orgName:"Red Cross", description:"load test", hostId:1}) {
   		startTime
    	endTime
    	userCapacity
    	name
    	orgName
    description
  }
}
`;
let resp = http.post('http://localhost:3000/graphql', JSON.stringify({ query: eventCreation }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
check(resp, { 'created lobby': (r) => r.status == 200 });
//create 2nd event
let eventCreation2 = `
mutation CreateEvents{
  createEvent(input: {startTime:2, endTime:4, userCapacity:1000, name:"Juicy", orgName:"UCLA", description:"load test2", hostId:1}) {
     startTime
    endTime
    userCapacity
    name
    orgName
  description
}
}
`;
let resp2 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: eventCreation2 }),{
headers: {
'Content-Type': 'application/json',
},
})
check(resp2, { 'created lobby2': (r) => r.status == 200 });
//Join event
let switchTable = `
  mutation SwitchTable{
    switchTable(input: {eventTableId:1, participantId:1}){
      table{
        id
      }
    }
  }
`
let switchTableResponse = http.post('http://localhost:3000/graphql', JSON.stringify({ query: switchTable }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
check(switchTableResponse, { 'Joined Table': (r) => r.status == 200 });
  //Find an Event
  let findAllEvents = http.post(
    `http://localhost:3000/graphql`,
    '{"operationName":"FetchEvent","variables":{},"query":"query FetchEvent{events{id}}"}',
    {
      headers: {
      'Content-Type': 'application/json',
     },
    }
  );
  check(findAllEvents, { 'find all events': (r) => r.status == 200 });

  //Fetch Chat
  let chatResponse = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse2 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse3 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse4 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  check(chatResponse, { 'Fetch Chat': (r) => r.status == 200 });
  check(chatResponse2, { 'Fetch Chat2': (r) => r.status == 200 });
  check(chatResponse3, { 'Fetch Chat3': (r) => r.status == 200 });
  check(chatResponse4, { 'Fetch Chat4': (r) => r.status == 200 });


  //Mutate Chat
  let chatCreation  = `
  mutation SendChatMessage{
    sendMessage(senderId: 2, eventId: 1, tableId: 1, message: "testing") {
      message
  }
}
  `
  let chatCreationResponse = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
check(chatCreationResponse, { 'Mutated Chat': (r) => r.status == 200 });

//2nd chat for table 1
let chatResponse5 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse6 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse7 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse8 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 1, "tableID": 1},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  check(chatResponse5, { 'Fetch Chat5': (r) => r.status == 200 });
  check(chatResponse6, { 'Fetch Chat6': (r) => r.status == 200 });
  check(chatResponse7, { 'Fetch Chat7': (r) => r.status == 200 });
  check(chatResponse8, { 'Fetch Chat8': (r) => r.status == 200 });


  //Mutate Chat
  let chatCreation2  = `
  mutation SendChatMessage{
    sendMessage(senderId: 1, eventId: 1, tableId: 1, message: "testing2") {
      message
  }
}
  `
  let chatCreationResponse2 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation2 }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
check(chatCreationResponse2, { 'Mutated Chat2': (r) => r.status == 200 });

//1st chat for 2nd table
let chatResponse9 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse10 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse11 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse12 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  check(chatResponse9, { 'Fetch Chat9': (r) => r.status == 200 });
  check(chatResponse10, { 'Fetch Chat10': (r) => r.status == 200 });
  check(chatResponse11, { 'Fetch Chat11': (r) => r.status == 200 });
  check(chatResponse12, { 'Fetch Chat12': (r) => r.status == 200 });


  let chatCreation3  = `
  mutation SendChatMessage{
    sendMessage(senderId: 1, eventId: 2, tableId: 2, message: "testing3") {
      message
  }
}
  `
  let chatCreationResponse3 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation3 }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
check(chatCreationResponse3, { 'Mutated Chat3': (r) => r.status == 200 });

//2nd chat for table 2
let chatResponse13 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse14 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse15 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  let chatResponse16 = http.post(`http://localhost:3000/graphql`,
  '{"operationName":"FetchChat","variables":{"eventID": 2, "tableID": 2},"query":"query FetchChat($eventID: Int!, $tableID: Int!){chatMessages(eventId: $eventID, tableId: $tableID){message}}"}',
  {
    headers: {
    'Content-Type': 'application/json',
   },
  });
  check(chatResponse13, { 'Fetch Chat13': (r) => r.status == 200 });
  check(chatResponse14, { 'Fetch Chat14': (r) => r.status == 200 });
  check(chatResponse15, { 'Fetch Chat15': (r) => r.status == 200 });
  check(chatResponse16, { 'Fetch Chat16': (r) => r.status == 200 });


  //Mutate Chat
  let chatCreation4  = `
  mutation SendChatMessage{
    sendMessage(senderId: 1, eventId: 2, tableId: 2, message: "testing") {
      message
  }
}
  `
  let chatCreationResponse4 = http.post('http://localhost:3000/graphql', JSON.stringify({ query: chatCreation4 }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
check(chatCreationResponse4, { 'Mutated Chat4': (r) => r.status == 200 });
//Leave Table/Event
let leaveTable = `
  mutation SwitchTable{
    switchTable(input: {eventTableId:null, participantId:1}){
      table{
        id
      }
    }
  }
`
let leaveTableResponse = http.post('http://localhost:3000/graphql', JSON.stringify({ query: leaveTable }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
check(leaveTableResponse, { 'Left Table': (r) => r.status == 200 });


  }
const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}


