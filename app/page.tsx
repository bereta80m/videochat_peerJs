
import Image from 'next/image'
import VideoScreen from './UI/VideoScreen/VideoScreen';

export default function Home() {
 /*
 
  const [peerId, setpeerId] = useState<any>(null)
  const [removePeerId, setRemovePeerId] = useState<any>()
  const MyReferenceVideo = useRef<any>(null)
  const YourReferenceVideo = useRef<any>(null)
  const PeerInstance = useRef<any>(null)
  const [incomingCall, setIncomingCall] = useState<any>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const peer = new Peer();

      peer.on('open', function (id) {
        setpeerId(id);
      });

      peer.on('call', (call: any) => {
        setIncomingCall(call);
      });

      PeerInstance.current = peer
    }


  }, []);

  const calling = (remotepeerId: any) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          MyReferenceVideo.current.srcObject = stream as MediaStream

          const call = PeerInstance.current.call(remotepeerId, stream);
          call.on('stream', function (remoteStream: any) {
            YourReferenceVideo.current.srcObject = remoteStream as MediaStream
          });
        })
        .catch(function (err) {
          console.error("Error accessing media devices:", err);
        });
    }
  }

  const answerCall = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream: any) => {
        MyReferenceVideo.current.srcObject = mediaStream;
        incomingCall.answer(mediaStream); // Answer the call with the stream
        incomingCall.on('stream', (remoteStream: any) => {
          YourReferenceVideo.current.srcObject = remoteStream;
        });
        setIncomingCall(null); // Reset the incoming call state
      }).catch((err) => {
        console.error("Error accessing media devices:", err);
      });
    }
  };

  const shareScreen = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          MyReferenceVideo.current.srcObject = stream;
  
          const call = PeerInstance.current.call(removePeerId, stream);
          call.on('stream', (remoteStream:any) => {
            YourReferenceVideo.current.srcObject = remoteStream;
          });
        })
        .catch(err => {
          console.error("Error in screen sharing: ", err);
        });
    }
  };
  

 */

  return (
    <main className=' grid justify-center '>
      <VideoScreen />
    </main>
  );

}


/*

<h3>CurrentID: {peerId}</h3>
      <input type="text" value={removePeerId} onChange={(e) => setRemovePeerId(e.target.value)} placeholder="please enter ID:" />
      <button onClick={() => calling(removePeerId)}>Call</button>

      {incomingCall && (
        <button onClick={() => answerCall()}>Answer Call</button>
      )}

      <button onClick={shareScreen}>Share My Screen</button>

      <div className='w-[22rem] h-[22rem]'>
        <h3>My Video</h3>
        <video ref={MyReferenceVideo} autoPlay
          playsInline />
      </div>

      <div className='w-[22rem] h-[22rem]'>
        <h3>His Video</h3>

        <video ref={YourReferenceVideo} autoPlay
          playsInline />
      </div>
*/