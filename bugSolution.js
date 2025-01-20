The solution is to use the `useCameraDevices` hook's asynchronous nature to our advantage.  Ensure camera operations happen only after the camera has loaded.

```javascript
import { Camera, useCameraDevices } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const devices = await useCameraDevices();
      setDevices(devices);
      setSelectedDevice(devices.back ? devices.back : devices[0]);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && selectedDevice) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });
        console.log('Photo taken!', photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />; // Loading
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        device={selectedDevice}
      />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
};
```