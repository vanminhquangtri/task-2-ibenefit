import deviceAPI from 'api/device';
import AppRouter from 'router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDevice } from 'store/device/reducers';

function App() {
  const dispatch = useDispatch();
  // set device info from local storage
  const storedDevice = useSelector((state) => {
    return state.Device;
  });

  // handle call api and update device info to local storage
  const initDevice = async () => {
    const response = await deviceAPI.init({ device_type: 2 });
    if (response && response?.success) {
      const data = { ...response?.data, lastUpdateTime: new Date().getTime() };
      dispatch(setDevice(data));
    }
  };

  useEffect(() => {
    const storeTime = storedDevice?.data?.lastUpdateTime; // time stamp
    const curTime = new Date().getTime();
    const collapsedTime = curTime - storeTime;
    const mustCheck = isNaN(storeTime) || collapsedTime >= 5 * 60 * 1000;
    if (mustCheck) {
      initDevice();
    }
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
