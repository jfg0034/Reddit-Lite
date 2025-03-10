import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { loadFeed } from "./feedSlice";
import Card from "../../components/Card/Card";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./Feed.module.css";

// Main content Feed
function Feed() {
    const dispatch = useDispatch();
    const { sortBy } = useSelector(state => state.searchBar);
    //console.log(`sort criteria set to ${sortBy}`);
    const { subreddit } = useSelector(state => state.feed);
    // Load feed on start
    useEffect(() => {
        dispatch(loadFeed({subreddit, sort: sortBy}));
    }, [sortBy, subreddit, dispatch]);
    const { feed, hasError, isLoading } = useSelector(state => state.feed);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Focus page to top
    if (hasError) {
        return <ErrorMessage message={'Could not load Feed, try again.'}/>
    }
    return (
        <div className={styles.feed}>
            {subreddit && <h1 className={styles.subreddit}>r/{subreddit}</h1>}
            {!isLoading && feed.map(post => {
                return (
                    <Card key={post.id} post={post} detail='big'/>
                );                    
            })}
        </div>
    );
}

export default Feed;