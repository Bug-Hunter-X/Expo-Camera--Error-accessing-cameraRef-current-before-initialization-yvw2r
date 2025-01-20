This error occurs when using the Expo Camera API and attempting to access the camera's features before the camera has fully initialized.  This often happens when trying to access `cameraRef.current` before the promise from `useCameraDevices` resolves or in components that mount before the camera is ready.

```javascript
// Incorrect usage
const takePicture = async () => {
  if (cameraRef.current) {
    await cameraRef.current.takePictureAsync({});
  }
};
```