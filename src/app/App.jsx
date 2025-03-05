import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from './router';
import { loadFeed } from '../features/feed/feedSlice';
import { loadSubreddits } from '../features/subreddits/subredditsSlice'; 
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { sortBy } = useSelector(state => state.searchBar);
  // Load feed on start
  useEffect(() => {
    dispatch(loadFeed({sort: sortBy}));
  }, [sortBy]);

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
