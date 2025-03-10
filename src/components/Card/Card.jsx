import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "../Gallery/Gallery";
import { setCurrentPost } from "../../features/post/postSlice";
import { setCurrentSubreddit } from "../../features/feed/feedSlice";
import styles from "./Card.module.css";

// Displays important information per post
// Consider that video media is for display only but has no audio 
function Card({post, detail}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subreddit } = useSelector(state => state.feed);
    // Reassign type for thumbnail_url for better display
    if (post.type.media === 'thumbnail_url') detail = 'small';
    // Load current post into store
    const handlePostView = () => {
        dispatch(setCurrentPost(post));
    }
    const getSubreddit = () => {
        if (subreddit !== post.subreddit) {
            dispatch(setCurrentSubreddit(post.subreddit));
            navigate('/');
        }
    }
    return (
        <article className={styles.card}>
            <aside>
                <span className={styles.subreddit} onClick={getSubreddit}>
                    r/{post.subreddit}
                </span>
                <span>{post.created}</span>
            </aside>
            <div className={styles[detail]}>
                <div>
                    <h2><NavLink to={`/posts/${post.subreddit}/${post.id}`} onClick={handlePostView}>{post.title}</NavLink></h2>
                    <div className={styles.textContent}>
                        {(post.type.text === 'url_only' || post.type.text === 'url') && <a href={post.external_url}>{post.external_url}</a>}
                    </div>
                </div>
                {detail === 'big' && <div className={styles.media}>
                    {post.type.media === 'image' && <img src={post.preview} alt="post-image" loading="lazy"/>}
                    {post.type.media === 'video' && <video controls autoPlay loop muted loading="lazy"><source src={post.video}/></video>}
                    {post.type.media === 'gallery' && <Gallery imageList={post.gallery}/>}
                </div>}
                {detail === 'small' && <div>
                    {post.thumbnail && 
                    <img 
                        src={post.thumbnail.includes('https://') ? post.thumbnail : post.preview} 
                        alt="thumbnail" 
                        loading="lazy"
                    />}
                </div>}
            </div>
            <aside>
                <span>Score: {post.score}</span>
                <span>{post.num_comments} 💬</span>
            </aside>
        </article>
    );
}

export default Card;