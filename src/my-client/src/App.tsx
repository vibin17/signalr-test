import './App.css';
import MyContract from './MyContract';
import HubContext from './hub-context';
import { useEffect, useState } from 'react';

function App() {
  const [hubContext, setHubContext] = useState<HubContext>();
  const [clientMethod1Message, setClientMethod1Message] = useState<string>();
  const [clientMethod2Message, setClientMethod2Message] = useState<MyContract>({id: "initId", message: "initMessage"});
  const [inputForMyHubMethod2, setInputForMyHubMethod2] = useState<string>();

  function onMyClientMethod1(message: string) {
    setClientMethod1Message(message);
  }

  function onMyClientMethod2(myContract: MyContract) {
    setClientMethod2Message(myContract);
  }

  useEffect(() => {
    async function connect(): Promise<void> {
      setHubContext(await HubContext.get(onMyClientMethod1, onMyClientMethod2));
    }
    
    connect();

    return () => { 
      hubContext?.close() 
    };
  }, []);

  return (
    <div className="App">
      <div>
      {
        !hubContext ?
          <p>Connection not established</p>
          :
          <div>
            <div> 
              Message 1 is {clientMethod1Message}
            </div>
            <div>
              Message 2: Guid - {clientMethod2Message?.id}, Message - {clientMethod2Message?.message}
            </div>
            <div>
              <button onClick={() => hubContext.myHubMethod1()}>
                Call MyHubMethod1
              </button>
            </div>
            <div>
              <input value={inputForMyHubMethod2} onChange={(e) => setInputForMyHubMethod2(e.target.value)} />
              <button onClick={() => { 
                if (!inputForMyHubMethod2) {
                  alert("empty input");

                  return;
                }

                hubContext.myHubMethod2(inputForMyHubMethod2)} 
              }>
                Call MyHubMethod2
              </button>
            </div>
          </div>
      }
      </div>
    </div>
  );
}

export default App;
