import React, { useState, useRef } from 'react';

// Helper function to generate a unique code (UUID)
const generateUniqueCode = () => {
  return 'xxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const FileTransfer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [peerConnected, setPeerConnected] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [offerStorage, setOfferStorage] = useState({});
  const peerConnection = useRef(null);
  const dataChannel = useRef(null);
  const receivedBuffers = useRef([]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Initialize the WebRTC connection and create an offer (Sender)
  const createOffer = async () => {
    peerConnection.current = new RTCPeerConnection();
    dataChannel.current = peerConnection.current.createDataChannel('fileTransfer');

    dataChannel.current.onopen = () => setStatus('Connection open. Ready to send file.');
    dataChannel.current.onclose = () => setStatus('Connection closed.');
    dataChannel.current.onmessage = handleReceiveMessage;

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    
    // Generate a unique code and store the offer
    const code = generateUniqueCode();
    setOfferStorage((prev) => ({ ...prev, [code]: offer }));
    setUniqueCode(code);
    setStatus(`Offer created. Share this unique code: ${code}`);
    console.log('Offer: ', JSON.stringify(offer)); // Log offer to share
  };

  // Handle retrieving offer using the unique code (Receiver)
  const handleReceiveOffer = (code) => {
    const offer = offerStorage[code];
    if (offer) {
      peerConnection.current = new RTCPeerConnection();

      peerConnection.current.ondatachannel = (event) => {
        dataChannel.current = event.channel;
        dataChannel.current.onmessage = handleReceiveMessage;
        setPeerConnected(true);
        setStatus('Connected. Ready to receive file...');
      };

      peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      createAnswer();
    } else {
      setStatus('Invalid unique code. Please try again.');
    }
  };

  // Create and send the answer
  const createAnswer = async () => {
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    setStatus('Answer created. Share this answer with the sender.');
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
    
    const chunkSize = 16384; // 16KB chunks
    const reader = new FileReader();
    let offset = 0;

    reader.onload = (e) => {
      const fileChunk = e.target.result;

      while (offset < fileChunk.byteLength) {
        const chunk = fileChunk.slice(offset, offset + chunkSize);
        dataChannel.current.send(chunk);
        offset += chunkSize;
      }

      setStatus('File sent successfully!');
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  // Handle receiving file chunks and reassembling them
  const handleReceiveMessage = (event) => {
    receivedBuffers.current.push(event.data);
    setStatus('Receiving file...');

    if (dataChannel.current.readyState === 'closed' || event.data.byteLength === 0) {
      setStatus('File transfer complete!');
      downloadFile(receivedBuffers.current);
    }
  };

  // Download the received file
  const downloadFile = (fileChunks) => {
    const blob = new Blob(fileChunks);
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
        <input 
          type="text" 
          placeholder="Enter Unique Code"
          onBlur={(e) => handleReceiveOffer(e.target.value)} 
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
