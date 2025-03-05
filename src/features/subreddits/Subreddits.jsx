import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadFeed } from "../feed/feedSlice";
import styles from './Subreddits.module.css';

function Subreddits() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subreddits = useSelector(state => state.subreddits.subreddits);
    const loadSubredditPosts = (subreddit) => {
        dispatch(loadFeed({subreddit: subreddit}));
        navigate('/');
    }
    return (
        <div className={styles.subreddits}>
            <h2 onClick={() => loadSubredditPosts('popular')}>POPULAR</h2>
            <hr/>
            <h3>Top 10</h3>
            <hr/>
            {subreddits.map(subreddit => {
                return (
                    <div key={subreddit.id} onClick={() => loadSubredditPosts(subreddit.name)}>
                        <img src={subreddit.icon ? subreddit.icon : '/default.png'}/>
                        <h4>r/{subreddit.name}</h4>
                    </div>
                );
            })}
        </div>
    );
}

export default Subreddits;