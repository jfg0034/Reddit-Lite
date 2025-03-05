import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { loadPostPage } from "./postSlice";

const tempStyle = {
    border : "1px solid black",
    margin: "20px"
}

function Post() {
    const dispatch = useDispatch();
    const {subreddit, postId} = useParams();
    useEffect(() => {
        if (subreddit && postId) {
            dispatch(loadPostPage({subreddit, postId}));
        }
    }, [dispatch, subreddit, postId]);
    const {isLoading, post, comments} = useSelector(state => state.post);
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <div>
            <div>
                <h1>{post.title}</h1>
                <p>author: {post.author}</p>
            </div>
            <div>
                <p>Comments:  </p>
                {comments.map(comment => {
                    return (
                        <div style={tempStyle} key={comment.id}>
                            <p>{comment.author}</p>
                            <ReactMarkdown>{comment.body}</ReactMarkdown>
                            <p>{comment.score} || {comment.created}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/*
replies: data.replies,
        id: data.id,
        author: data.author,
        created: formatTime(data.created),
        score: data.score,
        body: data.body,
        depth: data.depth
*/

export default Post;