import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';

const ImageResizer = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isPassportMode, setIsPassportMode] = useState(false);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [useWhiteBackground, setUseWhiteBackground] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const PASSPORT_ASPECT_RATIO = 1;
  const PASSPORT_PIXELS = 600;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setSrc(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file');
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop, backgroundColor = 'transparent') => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = isPassportMode ? PASSPORT_PIXELS : pixelCrop.width;
    canvas.height = isPassportMode ? PASSPORT_PIXELS : pixelCrop.height;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return canvas;
  };

  const removeImageBackground = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    
    const bgColor = {
      r: data[0],
      g: data[1],
      b: data[2],
    };

    
    const threshold = 30;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      
      if (
        Math.abs(r - bgColor.r) < threshold &&
        Math.abs(g - bgColor.g) < threshold &&
        Math.abs(b - bgColor.b) < threshold
      ) {
        data[i + 3] = 0; 
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };

  const processImage = async () => {
    if (src && croppedAreaPixels) {
      try {
        let canvas = await getCroppedImg(src, croppedAreaPixels, useWhiteBackground ? 'white' : 'transparent');
        
        if (removeBackground) {
          canvas = removeImageBackground(canvas);
        }

        return canvas.toDataURL('image/png');
      } catch (e) {
        console.error('Error processing image:', e);
      }
    }
    return null;
  };

  const handleDownload = async () => {
    const processedImageUrl = await processImage();
    if (processedImageUrl) {
      const link = document.createElement('a');
      link.href = processedImageUrl;
      link.download = isPassportMode ? 'passport-photo.png' : 'cropped-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const updatePreview = useCallback(async () => {
    const previewUrl = await processImage();
    if (previewUrl) {
      setPreviewImage(previewUrl);
    }
  }, [src, croppedAreaPixels, useWhiteBackground, removeBackground]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  const togglePassportMode = () => {
    setIsPassportMode(!isPassportMode);
    if (!isPassportMode) {
      setAspect(PASSPORT_ASPECT_RATIO);
    }
  };

  return (
    <div className="image-resizer">
        <div className="mkb">
            <h1>M.KABIR pic resizer</h1>
            <p>"Please don't use the remove background and white background features because they are still in the development stage. You may use them, but they don't work properly."</p>
        </div>
      <input className='mkb2 custom-file-upload' type="file" accept="image/*" onChange={handleImageChange} />
      {src && (
        <div style={{ marginTop: '20px', position: 'relative', height: '400px', width: '100%' }}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <label>Zoom: </label>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Aspect Ratio: </label>
        <button onClick={() => setAspect(1 / 1)}>1:1</button>
        <button onClick={() => setAspect(4 / 3)}>4:3</button>
        <button onClick={() => setAspect(16 / 9)}>16:9</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={isPassportMode}
            onChange={togglePassportMode}
          />
          US Passport Photo Mode (2x2 inches)
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={removeBackground}
            onChange={(e) => setRemoveBackground(e.target.checked)}
          />
          Remove Background
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={useWhiteBackground}
            onChange={(e) => setUseWhiteBackground(e.target.checked)}
          />
          Use White Background
        </label>
      </div>
      <button 
        onClick={handleDownload}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Download {isPassportMode ? 'Passport Photo' : 'Cropped Image'}
      </button>
      {previewImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Preview:</h3>
          <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}

    </div>
  );
};

export default ImageResizer;