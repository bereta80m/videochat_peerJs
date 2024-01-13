"use client"
import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs';

function VideoScreen() {
    const [initialID, setInitialID] = useState<any>('')
    const UserVideoRef = useRef<any>(null)
    const MyVideoRef = useRef<any>(null)
    const PeerInstance = useRef<any>(null)
    const [incomingCalls, setIncomingCalls] = useState<any>(null)
    const [remotePeerID, setRemotePeerID] = useState<any>('')
    const [currentCall, setCurrentCall] = useState<any>(null); // Estado para la llamada actual
    const [isCameraOn, setIsCameraOn] = useState(true); // Assuming camera starts as on
    const originalStreamRef = useRef<any>(null);

    const toggleCamera = () => {
        const stream = MyVideoRef.current.srcObject;
        if (stream) {
            const videoTracks = stream.getVideoTracks();
    
            videoTracks.forEach((track:any) => {
                track.enabled = !track.enabled; // Toggle the track
            });
    
            setIsCameraOn(!isCameraOn); // Update the state
        }
    };

    useEffect(() => {
        const HandlePeers = () => {
            if (typeof window !== 'undefined') {

                const peer = new Peer();
                PeerInstance.current = peer
                PeerInstance.current.on('open', (SessionId:any) => {
                    setInitialID(SessionId)
                })
                PeerInstance.current.on('call', (callReceiver:any) => {
                    setIncomingCalls(callReceiver)
                })
            }
        }
        HandlePeers()
    }, [])

    const AnswerCalls = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true,audio:true })
                .then((stream) => {
                    MyVideoRef.current.srcObject = stream
                    originalStreamRef.current = stream; 

                    incomingCalls.answer(stream); // Answer the call with an A/V stream.
                    setCurrentCall(incomingCalls); // Set the current call for the callee
                    incomingCalls.on('stream', (remoteStream:any)=> {
                        UserVideoRef.current.srcObject = remoteStream
                    })
                })
        }
    }
    const MakeCalls = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true,audio: true })
                .then((streamMedia) => {
                    MyVideoRef.current.srcObject = streamMedia
                    originalStreamRef.current = streamMedia; 

                    let call = PeerInstance.current.call(remotePeerID, streamMedia);
                    setCurrentCall(call); 
                    call.on('stream', (remoteStream: any) => {
                        UserVideoRef.current.srcObject = remoteStream
                    })
                })
        }
    }

    const ShareScreen = ()=>{
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({video:true})
            .then((mediaStream)=>{
                MyVideoRef.current.srcObject = mediaStream

                 // When the user clicks the browser's "Stop Sharing" button
                 mediaStream.getVideoTracks()[0].addEventListener('ended', () => {
                    console.log('Screen sharing stopped by the user');
                    StopSharing(); // Call your StopSharing function
                });
                if (currentCall) {
                    const sender = currentCall.peerConnection.getSenders().find((s:any) => s.track.kind === mediaStream.getVideoTracks()[0].kind);
                    sender.replaceTrack(mediaStream.getVideoTracks()[0]);
                }
            })
        }
    }
    
    const StopSharing = () => {
        // Stop all tracks of the screen sharing stream
        if (MyVideoRef.current && MyVideoRef.current.srcObject) {
            MyVideoRef.current.srcObject.getTracks().forEach((track:any) => track.stop());
        }
    
        MyVideoRef.current.srcObject = originalStreamRef.current;

         // Aquí es donde necesitas actualizar el stream que se está enviando.
    if (currentCall) {
        // Encuentra el sender correspondiente al tipo de track que quieres reemplazar.
        const videoSender = currentCall.peerConnection.getSenders().find((sender:any) => sender.track && sender.track.kind === 'video');
        
        // Obtén el track de video del stream de la cámara.
        const videoTrack = originalStreamRef.current.getVideoTracks()[0];

        // Reemplaza el track antiguo por el nuevo.
        if (videoSender && videoTrack) {
            videoSender.replaceTrack(videoTrack);
        }
    }
    }
    

 
    return (
        <div className='grid justify-center gap-3'>
            <h4 className='text-xl'>{initialID}</h4>
            <input className='border-2' placeholder='Type the UserID' value={remotePeerID} onChange={(e) => setRemotePeerID(e.target.value)} />
          {incomingCalls ? <button onClick={() => AnswerCalls()} className='bg-blue-500 rounded-xl text-white'>Answer</button>  : <button onClick={() => MakeCalls()} className='bg-blue-500  rounded-xl text-white'>Call</button>}
            <div className='flex gap-5'>
            <button onClick={toggleCamera} className='bg-blue-500 rounded-xl text-white'>
            {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
        </button>
                <h3>Me:</h3>
                <video className='w-[22rem] h-[22rem] border' ref={MyVideoRef} autoPlay playsInline />
                <h3>Other User:</h3>
                <video className='w-[22rem] h-[22rem] border' ref={UserVideoRef} autoPlay playsInline />
           
            </div>
            <button onClick={()=>ShareScreen()}>Share Screen</button>
        </div>
    )
}

export default VideoScreen