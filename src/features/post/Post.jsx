import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { loadPostPage } from "./postSlice";
import styles from "./Post.module.css";

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
    return (
        <div className={styles.page}>
            {post && 
                <div className={styles.post}>
                    <span>{post.subreddit}</span>
                    <span>{post.created}</span>
                    <h1>{post.title}</h1>
                    <p>author: {post.author}</p>
                    <div className={styles.media}>
                        {post.type === 'video' && <video className={styles.media} controls autoPlay loop muted><source src={post.video}/></video>}
                        {post.type === 'image' && <img className={styles.media} src={post.preview}/>}
                        {post.type === 'thumbnail_url' && <img className={styles.media} src={post.preview}/>}
                        {post.type === 'gallery' && <p>Gallery, not supported yet!</p>}
                    </div>
                    <div className={styles.textContent}>
                        {post.type === 'text' && <ReactMarkdown>{post.text}</ReactMarkdown>}
                        {(post.type === 'url_only' || post.type === 'thumbnail_url') && <a href={post.external_url}>{post.external_url}</a>}
                    </div>
                    <aside>Score: {post.score}</aside>
                </div>
            }
            {isLoading && <p>Loading comments...</p>}
            {!isLoading && 
                <div className={styles.comments}>
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
            }
        </div>
    );
}

/*


num_comments: data.num_comments,

thumbnail: data.is_self || data.thumbnail === 'default' ? null : data.thumbnail,

*/

export default Post;