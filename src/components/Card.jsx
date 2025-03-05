import { NavLink } from "react-router-dom";

const tempStyle = {
    border : "1px solid black",
    margin: "20px"
}

function Card({post}) {
    return (
        <div style={tempStyle} key={post.id}>
            <p>r/{post.subreddit} | {post.author}</p>
            <NavLink to={`/posts/${post.subreddit}/${post.id}`}>{post.title}</NavLink>
            <br/>
            {(post.thumbnail && post.thumbnail !== 'default') && <img width="140" src={post.thumbnail}/>}
            {post.thumbnail === 'default' && <img width="140" src={post.preview}/>}
            {post.video && 
                <video width="140" controls>
                    <source src={post.video}></source>    
                </video>}
            <aside>Score: {post.score}</aside>
            <aside>Comments: {post.num_comments} | {post.created} </aside>
        </div>
    );
}

/**
subreddit: post.subreddit,
            title: post.title,
            score: post.score,
            id: post.id,
            author: post.author,
            num_comments: post.num_comments,
            created_utc: post.created_utc,
 */

export default Card;