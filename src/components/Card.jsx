import { NavLink } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useDispatch } from "react-redux";
import { setCurrentPost } from "../features/post/postSlice";
import styles from "./Card.module.css";

function Card({post, detail}) {
    const dispatch = useDispatch();
    // Reassign type for thumbnail_url for better display
    if (post.type === 'thumbnail_url') detail = 'small';
    // Load current post into store
    const handlePostView = () => {
        dispatch(setCurrentPost(post));
    }

    return (
        <article className={styles.card}>
            <aside>
                <span>r/{post.subreddit}</span>
                <span>{post.created}</span>
            </aside>
            <div className={styles[detail]}>
                <div>
                    <h2><NavLink to={`/posts/${post.subreddit}/${post.id}`} onClick={handlePostView}>{post.title}</NavLink></h2>
                    <div className={styles.textContent}>
                        {(detail === 'big' && post.type === 'text') && <ReactMarkdown>{post.text}</ReactMarkdown>}
                        {(post.type === 'url_only' || post.type === 'thumbnail_url') && <a href={post.external_url}>{post.external_url}</a>}
                    </div>
                </div>
                <div>
                    {detail === 'big' && <>
                        {post.type === 'image' && <img className={styles.media} src={post.preview}/>}
                        {post.type === 'video' && <video className={styles.media} controls autoPlay loop muted><source src={post.video}/></video>}
                        {post.type === 'thumbnail_url' && <img className={styles.media} src={post.thumbnail}/>}
                        {post.type === 'gallery' && <p>Gallery, not supported yet!</p>}
                    </>}
                    {(detail === 'small' && post.thumbnail) && <img className={styles.media} src={post.thumbnail}/>}
                </div>
            </div>
            <aside>
                <span>Score: {post.score}</span>
                <span>{post.num_comments} 💬</span>
            </aside>
        </article>
    );
}

/*
{type === 'detailed' && 
<>
    {post.type === 'image' && <img className={styles.preview} src={post.preview}/>}
    {post.type === 'video' && 
        <video controls autoPlay loop muted>
            <source src={post.video}></source>    
        </video>
    }
    {post.type === 'text' && <p><ReactMarkdown>{post.text}</ReactMarkdown></p>}
    {post.type === 'url_only' && <a>{post.external_url}</a>}
    {post.type === 'gallery' && <p>Gallery, not supported yet!</p>}
</>}
{type === 'short' && 
<>
    {post.type === 'thumbnail_url' && <img className={styles.thumbnail} src={post.thumbnail}/>}
    {post.type === 'image' && <img className={styles.preview} src={post.preview}/>}
    {post.type === 'video' && 
        <video controls autoPlay loop muted>
            <source src={post.video}></source>    
        </video>
    }
</>}
}




        "title": "Not going back’: Ford will cancel Starlink-Ontario deal even if tariffs are lifted",
        "pwls": 7,
        "is_reddit_media_domain": false,
        "post_hint": "link",
        "content_categories": null,
        "domain": "globalnews.ca",
        "url_overridden_by_dest": "https://globalnews.ca/news/11067542/ontario-permenant-starlink-contract-cancel/",
        "preview": {
        "images": [
        ],
        "enabled": false
        },

        "title": "Making Signs Great Again",
        "pwls": null,
        "is_reddit_media_domain": true,
        "post_hint": "image",
        "content_categories": [
        "photography"
        ],
        "domain": "i.redd.it",
        "url_overridden_by_dest": "https://i.redd.it/trisl3nqpwme1.jpeg",
        "preview": {
        "images": [
        ],
        "enabled": true
        },



subreddit: post.subreddit,
            title: post.title,
            score: post.score,
            id: post.id,
            author: post.author,
            num_comments: post.num_comments,
            created_utc: post.created_utc,
 */

export default Card;