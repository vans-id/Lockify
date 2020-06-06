import React, {
  useRef,
  useState,
  useEffect,
} from 'react';

import './ImageUpload.css';
import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    // Create a file reader API
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // Todo after readAsDataURL
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (
      e.target.files &&
      e.target.files.length === 1
    ) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className='form-control'>
      <input
        type='file'
        ref={filePickerRef}
        id={props.id}
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div
        className={`image-upload ${
          props.center && 'centered'
        } `}
      >
        {previewUrl ? (
          <div
            className={`image-upload__preview ${
              props.isRounded && 'rounded'
            }`}
          >
            <img src={previewUrl} alt={'preview'} />
          </div>
        ) : (
          <p>Please pick your avatar image</p>
        )}

        <Button
          type='button'
          size='large'
          onClick={pickImageHandler}
        >
          PICK IMAGE
        </Button>
      </div>

      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
