const tempStyle = {
    border : "1px solid black",
    margin: "20px"
}

function Card(props) {
    return (
        <div style={tempStyle}>
            <h3>{props.title}</h3>
            <p>Description</p>
            {props.preview && <img src={props.preview}/>}
            <aside>Score: {props.score}</aside>
            <aside>{props.author} | comments: {props.num_comments} | {props.created} </aside>
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