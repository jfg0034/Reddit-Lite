import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import router from './router';
import { loadSubreddits } from '../features/subreddits/subredditsSlice'; 
import './App.css';

function App() {
  const dispatch = useDispatch();
  // Load subreddits
  useEffect(() => {
    dispatch(loadSubreddits());
  }, []);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
