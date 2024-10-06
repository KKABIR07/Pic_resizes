import React, { useState, useRef } from 'react';

const FileTransfer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [peerConnected, setPeerConnected] = useState(false);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef(null);

  // WebRTC peer connection
  const peerConnection = useRef(new RTCPeerConnection());

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    setStatus('Created offer. Send the offer to your peer.');
  };

  const handleReceiveOffer = async (offer) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    setStatus('Offer received and answer created. Send answer back to the offerer.');
  };

  const handleReceiveAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    setStatus('Connection established.');
    setPeerConnected(true);
  };

  const handleDataChannel = () => {
    const dataChannel = peerConnection.current.createDataChannel('fileTransfer');

    dataChannel.onopen = () => {
      setStatus('Data channel open. Sending file...');
      sendFile(dataChannel);
    };

    dataChannel.onmessage = (event) => {
      const receivedFile = event.data;
      downloadFile(receivedFile);
    };
  };

  const sendFile = (dataChannel) => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = () => {
      dataChannel.send(reader.result);
      setStatus('File sent successfully!');
    };
  };

  const downloadFile = (file) => {
    const blob = new Blob([file]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setStatus('File received and downloaded!');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Fast File Transfer (P2P)</h2>

      <input ref={fileInputRef} type="file" onChange={handleFileChange} />
      
      <div>
        <button onClick={createOffer}>Create Offer</button>
      </div>
      
      <p>Status: {status}</p>

      {peerConnected && selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <button onClick={handleDataChannel}>Send File</button>
        </div>
      )}
    </div>
  );
};

export default FileTransfer;
