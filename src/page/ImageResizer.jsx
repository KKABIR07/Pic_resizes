import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { MdOutlineCompress } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const ImageResizer = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isPassportMode, setIsPassportMode] = useState(false);
  const [is4x6Mode, setIs4x6Mode] = useState(false);
  const [fill4x6With2x2, setFill4x6With2x2] = useState(false);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [useWhiteBackground, setUseWhiteBackground] = useState(false);
  const [enableCompression, setEnableCompression] = useState(false);
  const [uncut, setUncut] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const PASSPORT_ASPECT_RATIO = 1; // 2x2 inch aspect ratio (1:1)
  const PASSPORT_PIXELS = 600; // 2x2 inch at 300 DPI

  const FOUR_BY_SIX_ASPECT_RATIO = 2 / 3; // 4x6 inch aspect ratio (2:3)
  const FOUR_BY_SIX_PIXELS_WIDTH = 1200; // 4x6 inch at 300 DPI width
  const FOUR_BY_SIX_PIXELS_HEIGHT = 1800; // 4x6 inch at 300 DPI height

  const TWO_BY_TWO_PIXELS = 600; // 2x2 inch at 300 DPI

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

    // If uncut is selected, skip cropping and use the entire image
    if (uncut) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      return canvas;
    }

    if (isPassportMode) {
      canvas.width = PASSPORT_PIXELS;
      canvas.height = PASSPORT_PIXELS;
    } else if (is4x6Mode) {
      canvas.width = FOUR_BY_SIX_PIXELS_WIDTH;
      canvas.height = FOUR_BY_SIX_PIXELS_HEIGHT;
      if (fill4x6With2x2) {
        const numCols = Math.floor(FOUR_BY_SIX_PIXELS_WIDTH / TWO_BY_TWO_PIXELS);
        const numRows = Math.floor(FOUR_BY_SIX_PIXELS_HEIGHT / TWO_BY_TWO_PIXELS);
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            ctx.drawImage(
              image,
              pixelCrop.x,
              pixelCrop.y,
              pixelCrop.width,
              pixelCrop.height,
              col * TWO_BY_TWO_PIXELS,
              row * TWO_BY_TWO_PIXELS,
              TWO_BY_TWO_PIXELS,
              TWO_BY_TWO_PIXELS
            );
          }
        }
        return canvas;
      }
    } else {
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
    }

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

  const processImage = async () => {
    if (src && (croppedAreaPixels || uncut)) {
      try {
        let canvas = await getCroppedImg(src, croppedAreaPixels, useWhiteBackground ? 'white' : 'transparent');
        
        if (removeBackground) {
          canvas = removeImageBackground(canvas);
        }

        if (enableCompression) {
          return canvas.toDataURL('image/jpeg', 0.5); // Compress to JPEG with 50% quality
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
      link.download = isPassportMode
        ? 'passport-photo.png'
        : is4x6Mode
        ? '4x6-photo.png'
        : 'cropped-image.png';
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
  }, [src, croppedAreaPixels, useWhiteBackground, removeBackground, is4x6Mode, isPassportMode, fill4x6With2x2, enableCompression, uncut]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  const togglePassportMode = () => {
    setIsPassportMode(!isPassportMode);
    if (!isPassportMode) {
      setAspect(PASSPORT_ASPECT_RATIO);
      setIs4x6Mode(false); // Disable 4x6 mode if passport mode is enabled
    }
  };

  const toggle4x6Mode = () => {
    setIs4x6Mode(!is4x6Mode);
    if (!is4x6Mode) {
      setAspect(FOUR_BY_SIX_ASPECT_RATIO);
      setIsPassportMode(false); // Disable passport mode if 4x6 mode is enabled
    }
  };

  return (
    <div className="image-resizer">
      <div className="mkb">
        <h1>M.KABIR Pic Resizer</h1>
        <p>"Please don't use the remove background and white background features because they are still in the development stage. You may use them, but they don't work properly."</p>
      </div>
      <label htmlFor="file-upload" className="custom-file-upload">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="custom-file-input"
        onChange={handleImageChange}
      />
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
        <label>
          <input type="checkbox" checked={is4x6Mode} onChange={toggle4x6Mode} />
          4x6 Mode (1200x1800 pixels)
        </label>
        <label>
          <input
            type="checkbox"
            checked={fill4x6With2x2}
            onChange={() => setFill4x6With2x2(!fill4x6With2x2)}
            disabled={!is4x6Mode}
          />
          Fill 4x6 with 2x2 photos
        </label>
        <label>
          <input
            type="checkbox"
            checked={removeBackground}
            onChange={() => setRemoveBackground(!removeBackground)}
          />
          Remove Background (In Development)
        </label>
        <label>
          <input
            type="checkbox"
            checked={useWhiteBackground}
            onChange={() => setUseWhiteBackground(!useWhiteBackground)}
          />
          Use White Background
        </label>
        <label>
          <input
            type="checkbox"
            checked={enableCompression}
            onChange={() => setEnableCompression(!enableCompression)}
          />
          <MdOutlineCompress /> Enable Compression
        </label>
        <label>
          <input
            type="checkbox"
            checked={uncut}
            onChange={() => setUncut(!uncut)}
          />
          <FaUndo /> Uncut (Disable Cropping)
        </label>
      </div>
      <div>
        <button onClick={handleDownload}>Download</button>
        <NavLink to={'/file'}>File Transfer</NavLink>
      </div>
      {previewImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Preview:</h3>
          <img src={previewImage} alt="Cropped" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
