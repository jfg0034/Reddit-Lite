import { refineData, refineCommentData } from '../utils/formatData.js';

const baseUrl ='https://www.reddit.com';

// Retrieves a subreddit, sort can be defined to filter results
const getFeedByType = async(subreddit = 'popular', sort = 'hot') => {
    const endpoint = baseUrl + `/r/${subreddit}/${sort}.json?raw_json=1`;
    const response = await fetch(endpoint);
    if(response.ok) {
        const results = (await response.json()).data.children;
        const feed = (results.map(result => {
            return refineData(result.data);
        }));
        return feed;
    }
    else {
        throw new Error('Could not retrieve subreddit');
    }
}

// Retrieve search results, will be set as 'hot' as default
const getSearchResults = async(query, sort = 'hot') => {
    const encodedQuery = encodeURIComponent(query);
    const endpoint = baseUrl + `/search/.json?raw_json=1&type=posts&q=${encodedQuery}&sort=${sort}`;
    const response = await fetch(endpoint);
    if (response.ok) {
        const results = (await response.json()).data.children;
        return results.map(post => {
            return refineData(post.data);
        });
    }
    else {
        throw new Error('Could not get home');
    }
};

const getPostPage = async(subreddit, postId) => {
    const endpoint = baseUrl + `/r/${subreddit}/comments/${postId}.json?raw_json=1`;
    const response = await fetch(endpoint);
    if (response.ok) {
        const page = await response.json();
        const post = page[0].data.children[0].data;
        let comments = page[1].data.children;
        let more = null;
        if (comments.length > 0) {
            const lastChild = comments[comments.length - 1];
            if (lastChild.kind === 'more') {
                more = lastChild;
                comments = comments.slice(0, -1);
            }
            comments = comments.map(comment => {
                return refineCommentData(comment.data);
            });
        }
        return {
            post: refineData(post),
            comments: comments,
            more: more
        };
    }
    else {
        throw new Error('Could not retrieve post or comments');
    }
};


// Get popular subreddits
const getTopSubreddits = async() => {
    const response = await fetch('https://www.reddit.com/subreddits/popular.json?limit=10');
    if (response.ok) {
        const results = (await response.json()).data.children;
        return results.map(subreddit => {
            return {
                id :subreddit.data.id,
                name: subreddit.data.display_name,
                members: subreddit.data.subscribers,
                icon: subreddit.data.icon_img
            }
        });
    }
    else {
        throw new Error('Could not get subreddits.')
    }
};

export { getSearchResults, getPostPage, getFeedByType, getTopSubreddits };