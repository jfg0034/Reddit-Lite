import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import router from './router';
import { loadFeed } from '../features/feed/feedSlice'; 
import './App.css';

function App() {
  const dispatch = useDispatch();
  // Load feed on start
  useEffect(() => {
    dispatch(loadFeed());
  }, []);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
