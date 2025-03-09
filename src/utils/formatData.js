import { formatDistanceToNow } from 'date-fns';

// Format time created
const formatTime = (time) => {
    const past = new Date(time * 1000);
    const timeAgo = formatDistanceToNow(past, {addSuffix: true});
    return timeAgo;
};

// Set type of post
const getType = (data) => {
    const content = {media:'', text:''};
    // text
    if (data.selftext) content.text = 'text';
    // media
    if (data.is_video) content.media = 'video';
    else if (data.preview) {
        if (data.preview.enabled) content.media = 'image';
        else {
            content.media = 'thumbnail_url';
            content.text = 'url';
        }
    }
    else if (data.is_gallery) content.media = 'gallery';
    else if (!data.is_self) content.text = 'url_only';
    return content;
};

// Format JSON retrieved to filter usable data
const refineData = (data) => {
    return {
        id: data.id,
        subreddit: data.subreddit,
        title: data.title,
        author: data.author,
        score: data.score,
        num_comments: data.num_comments,
        created: formatTime(data.created),
        preview: data.preview?.images[0].source.url,
        thumbnail: data.is_self || data.thumbnail === 'default' ? null : data.thumbnail,
        video: data.is_video ? data.secure_media.reddit_video.fallback_url : null,
        text: data.selftext,
        gallery: getGallery(data),
        external_url: data.url,
        type: getType(data),
    };
};

// Helper function
const getGallery = (data) => {
    if (!data.media_metadata) return null;
    else return Object.values(data.media_metadata).map(media => media.s.u);
}

// Format JSON retrieved to filter comment usable data
const refineCommentData = (data) => {
    return {
        replies: data.replies,
        id: data.id,
        author: data.author,
        created: formatTime(data.created),
        score: data.score,
        body: data.body,
        depth: data.depth
    };
};

// Filter data to get needed repplies
const getReplies = (replies) => {
    if (!replies) return null;
    let allReplies = replies.data.children;
    const lastChild = allReplies[allReplies.length - 1];
    let moreReplies = null;
    if (lastChild.kind === 'more') {
        moreReplies = lastChild;
        allReplies = allReplies.slice(0,-1);
    }
    return {
        replies: allReplies.map(reply => {
            return refineCommentData(reply.data);
        }),
        moreReplies
    };
};

export { 
    formatTime, 
    getType, 
    refineData, 
    refineCommentData, 
    getReplies
};