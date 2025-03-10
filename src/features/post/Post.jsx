import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { loadPostPage } from "./postSlice";
import Comment from "../../components/Comment/Comment";
import Gallery from "../../components/Gallery/Gallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./Post.module.css";

// Post component, displays full content including text and media
// Consider that video media is for display only but has no audio 
function Post() {
    const dispatch = useDispatch();
    const {subreddit, postId} = useParams();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (subreddit && postId) {
            dispatch(loadPostPage({subreddit, postId}));
        }
    }, [dispatch, subreddit, postId]);
    const {isLoading, hasError, post, comments} = useSelector(state => state.post);
    return (<>
        {hasError? <ErrorMessage message={'This post could not be retrieved. Try again from the home page.'}/> :
            <div>
                {post && 
                    <div className={styles.post}>
                        <div className={styles.topDetails}>
                            <span>r/{post.subreddit} | By: {post.author}</span>
                            <span>{post.created}</span>
                        </div>
                        <hr/>
                        <h1>{post.title}</h1>
                        <div className={styles.media}>
                            {post.type.media === 'video' && <video controls autoPlay loop muted><source src={post.video}/></video>}
                            {post.type.media === 'image' && <img src={post.preview} alt="post-image"/>}
                            {post.type.media === 'thumbnail_url' && <img src={post.preview} alt="post-thumbnail"/>}
                            {post.type.media === 'gallery' && <Gallery imageList={post.gallery}/>}
                        </div>
                        <div className={styles.textContent}>
                            {post.type.text === 'text' && <ReactMarkdown>{post.text}</ReactMarkdown>}
                            {(post.type.text === 'url_only' || post.type.text === 'url') && <a href={post.external_url}>{post.external_url}</a>}
                        </div>
                        <hr/>
                        <div className={styles.bottomDetails}>
                            <span>Score: {post.score}</span>
                            <span>{post.num_comments} 💬</span>
                        </div>
                    </div>
                }
                <hr/>
                {!isLoading && (
                    comments.length === 0 ? <p>No comments posted yet.</p> : 
                    comments.map(comment => <Comment comment={comment} key={comment.id}/>)
                )}
            </div>
        }
    </>);
}

export default Post;