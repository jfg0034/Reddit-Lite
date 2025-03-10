import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Subreddits from '../features/subreddits/Subreddits';

// Main layout
function Root() {
    return (
        <>
            <Header/>
            <main>
                <Subreddits/>
                <Outlet/>
            </main>
        </>
    );
}

export default Root;