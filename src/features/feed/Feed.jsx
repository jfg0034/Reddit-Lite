import { useSelector} from "react-redux";
import Card from "../../components/Card";
import styles from "./Feed.module.css";

function Feed() {
    const feed = useSelector(state => state.feed.feed);
    return (
        <div className={styles.feed}>
            {feed.map(post => {
                return (
                    <Card key={post.id} post={post} detail='big'/>
                );                    
            })}
        </div>
    );
}

/**
preview: data.preview?.images?.[0].source.url || null,
thumbnail: data.thumbnail,
video: data.is_video ? data.secure_media.reddit_video.fallback_url : null,
text_html: data.selftext,
 */

export default Feed;