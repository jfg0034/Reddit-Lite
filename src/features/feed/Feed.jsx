import Card from "../../components/Card";
import { useSelector} from "react-redux";

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
                    <div style={tempStyle}>
                        <h3>{post.title}</h3>
                        {post.preview && <img src={post.preview}/>}
                        <aside>Score: {post.score}</aside>
                        <aside>{post.author} | comments: {post.num_comments} | {post.created} </aside>
                    </div>
                );                    
            })}
        </div>
    );
}

/*
<Card
    subreddit={post.subreddit}
    title={post.title}
    score={post.score}
    id={post.id}
    author={post.author}
    num_comments={post.num_comments}
    created={post.created}
    preview={post.preview}    
/>
*/


export default Feed;