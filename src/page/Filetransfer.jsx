import React, { useState, useRef } from 'react';

const FileTransfer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [peerConnected, setPeerConnected] = useState(false);
  const peerConnection = useRef(null);
  const dataChannel = useRef(null);

  const fileInputRef = useRef(null);

  // Handle file selection for Sender
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Initialize the WebRTC connection and create an offer
  const createOffer = async () => {
    peerConnection.current = new RTCPeerConnection();
    dataChannel.current = peerConnection.current.createDataChannel('fileTransfer');

    dataChannel.current.onopen = () => setStatus('Connection open. Ready to send file.');
    dataChannel.current.onclose = () => setStatus('Connection closed.');
    dataChannel.current.onmessage = (event) => downloadFile(event.data);

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    setStatus('Offer created. Share this offer with the receiver.');
    // Display the offer to share with the receiver
    console.log('Offer: ', JSON.stringify(offer));
  };

  // Handle the receiver button by accepting the offer and creating an answer
  const handleReceiveOffer = async (offer) => {
    peerConnection.current = new RTCPeerConnection();

    peerConnection.current.ondatachannel = (event) => {
      dataChannel.current = event.channel;
      dataChannel.current.onmessage = (event) => downloadFile(event.data);
      setPeerConnected(true);
      setStatus('Connected. Receiving file...');
    };

    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    setStatus('Answer created. Send this answer back to the sender.');
    // Display the answer to share with the sender
    console.log('Answer: ', JSON.stringify(answer));
  };

  // Handle receiving the answer on the sender side
  const handleReceiveAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    setStatus('Connection established. Ready to send file.');
    setPeerConnected(true);
  };

  // Send the selected file over the data channel
  const sendFile = () => {
    if (!selectedFile || !dataChannel.current) return;
    const reader = new FileReader();
    reader.onload = () => {
      dataChannel.current.send(reader.result);
      setStatus('File sent successfully!');
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // Download the received file
  const downloadFile = (file) => {
    const blob = new Blob([file]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = selectedFile ? selectedFile.name : 'received_file';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setStatus('File received and downloaded!');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Fast File Transfer (P2P)</h2>
      
      {/* Sender */}
      <div>
        <h3>Sender</h3>
        <input ref={fileInputRef} type="file" onChange={handleFileChange} />
        <button onClick={createOffer}>Create Offer</button>
        <button onClick={sendFile} disabled={!peerConnected}>Send File</button>
      </div>

      {/* Receiver */}
      <div>
        <h3>Receiver</h3>
        <textarea 
          placeholder="Paste Offer JSON here"
          rows="5"
          cols="50"
          onBlur={(e) => handleReceiveOffer(JSON.parse(e.target.value))}
        />
        <textarea 
          placeholder="Paste Answer JSON here"
          rows="5"
          cols="50"
          onBlur={(e) => handleReceiveAnswer(JSON.parse(e.target.value))}
        />
      </div>

      <p>Status: {status}</p>
    </div>
  );
};

export default FileTransfer;
