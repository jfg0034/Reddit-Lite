import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentSubreddit } from "../feed/feedSlice";
import styles from './Subreddits.module.css';

// Displays top subreddits and 'Popular' for home feed
function Subreddits() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subreddits, hasError } = useSelector(state => state.subreddits);
    const loadSubredditPosts = (subreddit) => {
        dispatch(setCurrentSubreddit(subreddit));
        navigate('/');
    }
    return (
        <div className={styles.subreddits}>
            {hasError ? <p>Could not load subreddits. Check your connection</p> :
                <>
                    <h2 onClick={() => loadSubredditPosts()}>POPULAR</h2>
                    <div>
                        <h3>Top 10</h3>
                        <hr/>
                        {subreddits.map(subreddit => {
                            return (
                                <div key={subreddit.id} onClick={() => loadSubredditPosts(subreddit.name)}>
                                    <img src={subreddit.icon ? subreddit.icon : '/default.png'} alt="subreddit-icon"/>
                                    <h4>r/{subreddit.name}</h4>
                                </div>
                            );
                        })}
                    </div>
                </>
            }
        </div>
    );
}

export default Subreddits;