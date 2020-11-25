import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'
import { sleep, check } from 'k6'

export const options = {
  scenarios: {
    example_scenario: {
      executor: 'constant-vus',
      vus: 20,
      duration: '5s',
    },
  },
}

export default function () {

  //Create random Signup users
  var randomNumber = '' + Math.random(1) * 100
  var payload = JSON.stringify({
    email: 'something@gmail.com' + randomNumber,
    name: 'rando',
  })
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  var email = 'temp@gmaik.com'
  var name = 'bob'
  //http.get('http://localhost:3000/')
  http.post('http://localhost:3000/auth/createUser', payload, params)

  sleep(Math.random() * 3)

  let mutationTest = `
  mutation CreateEvents{
    createEvent(input: {startTime:2, endTime:4, userCapacity:30, name:"Ronald", orgName:"Red Cross", description:"load test", hostId:1}) {
   		startTime
    	endTime
    	userCapacity
    	name
    	orgName
    description
  }
}
`;
let resp = http.post('http://localhost:3000/graphql', JSON.stringify({ query: mutationTest }),{
  headers: {
  'Content-Type': 'application/json',
 },
})
  //Create an Event
  // http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"CreateEvent","variables":{"input":{"startTime":2,"endTime":4,"userCapacity":30,"name":"Ronald","orgName":"Red Cross","description":"load test","hostId":1}},"query":"mutation CreateEvent($input: EventInput!) { createEvent(input: $input)}"}',
  //   {
  //     headers: {
  //     'Content-Type': 'application/json',
  //    },
  //   }
  // )
  //Find an Event


  // let chatResponse = http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"SendChatMessage","variables":{"senderID":1,"eventID":1,"tableID":1,"message":"Ronald"},"query":"mutation SendChatMessage($senderId: Int!, $eventId: Int!, $tableId: Int!, $message: String!) { sendMessage(senderId: $senderId, eventId: $eventId, tableId: $tableId, message: $message)}"}',
  //   {
  //     headers: {
  //     'Content-Type': 'application/json',
  //    },
  //   }
  // )
  // check(chatResponse, { 'mutated chat': (r) => r.status === 200 });
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