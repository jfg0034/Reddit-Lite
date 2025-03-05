import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Subreddits from '../features/subreddits/Subreddits';

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