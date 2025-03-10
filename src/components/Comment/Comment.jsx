import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getReplies } from '../../utils/formatData';
import styles from './Comment.module.css';

// This component calls itself as long as replies exist
// Only surface replies retrieved on the call are shown here, no additional calls are made for deep nested replies
function Comment({comment}) {
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    const commentReplies = getReplies(comment.replies)?.replies; // Retrieve replies
    const viewReply = () => {
        setIsReplyVisible(prev => !prev);
    }
    return (
        <div className={styles.comment}>
            <div className={styles.topDetails}>
                <span>By: {comment.author}</span>
                <span>{comment.created}</span>
            </div>
            <hr/>
            <div className={styles.commentBody}>
                <ReactMarkdown>{comment.body}</ReactMarkdown>
            </div>
            <div className={styles.bottomDetails}>
                <span>Score: {comment.score}</span>
                {(commentReplies && commentReplies.length > 0) && 
                    <button onClick={viewReply}>
                        {isReplyVisible ? '🡅' : `${commentReplies.length} 💬`}
                    </button>}
            </div>
            {(commentReplies && isReplyVisible) && 
                commentReplies.map(reply => <Comment comment={reply} key={reply.id}/>)}
        </div>
    );
}

export default Comment;