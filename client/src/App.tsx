import { useState } from 'react';
import './App.css';
import { EchoServiceClient } from './gen/EchoServiceClientPb';
import { EchoRequest } from "./gen/echo_pb"

const client = new EchoServiceClient('http://localhost:9000', null, null);

function App() {
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState<Array<{requestedAt: Date, message: string}>>([])
  const handleClick = () => {
    const req = new EchoRequest()
    req.setMessage(message)
    const date = new Date()
    client.echo(req, {}, (err, resp) => {
      if (err) {
        console.error(err)
        return
      }
      setShowMessage(prev => [...prev, {requestedAt: date, message: resp.getMessage()}])
    })
  }

  return (
    <div className="App">
      <div>gRPC Demo</div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleClick}>Send</button>
      {showMessage.map(data => (<div>{data.requestedAt.toLocaleDateString()} {data.requestedAt.toLocaleTimeString()}: {data.message}</div>))}
    </div>
  );
}

export default App;
