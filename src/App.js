import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.css';
import DefaultComponent from './components/DefaultComponent';
import { addNotification } from './redux/userSlice';
import { routes } from './routes';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('wss://carstore-api.onrender.com');
    socket.off('notification').on('notification', (msgObj, user_id) => {
      console.log(user_id);
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
        console.log('addNotification(msgObj)', addNotification(msgObj));
        console.log(user._id);
      }
    });
    socket.off('new-order').on('new-order', (msgObj) => {
      if (user?.isAdmin) {
        dispatch(addNotification(msgObj));
        console.log('addNotification(msgObj)', addNotification(msgObj));
      }
    });
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const LayOut = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <LayOut>
                    <Page />
                  </LayOut>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
