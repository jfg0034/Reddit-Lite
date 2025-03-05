import { useSelector} from "react-redux";
import Card from "../../components/Card";

const tempStyle = {
    border : "1px solid black",
    margin: "20px"
}

function Feed() {
    const feed = useSelector(state => state.feed.feed);
    return (
        <div>
            {feed.map(post => {
                return (
                    <Card key={post.id} post={post}/>
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