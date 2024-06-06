import React, { FC, useEffect, useRef, useState } from 'react';
import { useFormikContext } from 'formik';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import { IAvatarCropper, PixelCrop } from '../../types';
import UserFormButton from '../forms/UserFormButton';
import getCroppedImg from '../../utils/cropImage';
import styles from './AvatarCropper.module.scss';

const AvatarCropper: FC<IAvatarCropper> = ({ editProfile, fieldName }) => {
  const { setFieldValue, handleSubmit } = useFormikContext();
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<PixelCrop | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isReady, setIsReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isReady) {
      handleSubmit();
      editProfile();
    }
  }, [isReady]);

  const triggerFileSelectPopup = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      });
    }
  };

  const onCropComplete = (
    croppedAreaPercentage: {
      width: number;
      height: number;
      x: number;
      y: number;
    },
    croppedAreaPixels: {
      width: number;
      height: number;
      x: number;
      y: number;
    }
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (image && croppedArea) {
      const croppedImg = await getCroppedImg(image, croppedArea);
      croppedImg.toBlob(
        blob => {
          if (blob && fileName !== null) {
            setFieldValue(
              fieldName,
              new File([blob], fileName, { type: blob.type })
            );
          }
          setIsReady(true);
        },
        'image/jpeg',
        0.66
      );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles['container-cropper']}>
        {image ? (
          <>
            <div className={styles.cropper}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape='round'
                showGrid={false}
              />
            </div>
            <div className={styles.slider}>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                color='primary'
                onChange={(e, zoom: number | number[]) => {
                  if (typeof zoom === 'number') {
                    setZoom(zoom);
                  }
                }}
              />
            </div>
          </>
        ) : (
          <div className={styles.forrest}></div>
        )}
      </div>
      <input
        type='file'
        accept='image/jpeg, image/jpg, image/png'
        ref={inputRef}
        onChange={onSelectFile}
        style={{ display: 'none' }}
      />
      <div className={styles.button_wrapper}>
        <UserFormButton
          fieldName={fieldName}
          onClick={e => {
            e.preventDefault();
            editProfile();
          }}
        >
          Cancel
        </UserFormButton>
        <UserFormButton fieldName={fieldName} onClick={triggerFileSelectPopup}>
          Choose file
        </UserFormButton>
        {image ? (
          <UserFormButton
            fieldName={fieldName}
            type='submit'
            onClick={handleSave}
          >
            Save
          </UserFormButton>
        ) : null}
      </div>
    </div>
  );
};

export default AvatarCropper;
