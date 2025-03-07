import { formatDistanceToNow } from 'date-fns';
const baseUrl ='https://www.reddit.com';



// Helper function
const formatTime = (time) => {
    const past = new Date(time * 1000);
    const timeAgo = formatDistanceToNow(past, {addSuffix: true});
    return timeAgo;
};

/* Define preview image if enabled
const setPreview = (preview) => {
    if (preview) {
        if (preview.enabled) return preview.images[0].source.url;
    }
    return null;
}*/

// Set type of post
const getType = (data) => {
    if (data.selftext) return 'text';
    else if (data.is_video) return 'video';
    else if (data.preview) {
        if (data.preview.enabled) return 'image';
        else return 'thumbnail_url';
    }
    else if (data.is_gallery) return 'gallery';
    else if (!data.is_self) return 'url_only';
    else return 'unknown';
}

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
        gallery: data.is_gallery ? data.gallery_data.items : null, // This is simply a list of objects, images are not usable in this form
        external_url: data.url,
        type: getType(data),
    };
};

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
}

const getReplies = (replies) => {
    const allReplies = replies.data.children;
    const moreReplies = allReplies.pop();
    return {
        replies: allReplies.map(reply => {
            return refineCommentData(reply.data);
        })
    };
}


// Retrieves a subreddit, sort can be defined to filter results
const getFeedByType = async(subreddit = 'popular', sort = 'hot') => {
    const endpoint = baseUrl + `/r/${subreddit}/${sort}.json?raw_json=1`;
    const response = await fetch(endpoint);
    if(response.ok) {
        const results = (await response.json()).data.children;
        return (results.map(result => {
            return refineData(result.data);
        }));
    }
    else {
        throw new Error('Could not retrieve subreddit');
    }
}


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
        const comments = page[1].data.children;
        const more = comments.pop();
        const refinedComments = comments.map(comment => {
            return refineCommentData(comment.data);
        });
        return {
            post: refineData(post),
            comments: refinedComments,
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




//const subreddit = 'law';
//const postId = '1j0yur7';
//getPostPage(subreddit, postId);
//getHomeFeed();
//getByCategory('r', 'popular');


export { getSearchResults, getPostPage, getFeedByType, getTopSubreddits };

/**
 *
thumbnail: 
            data.thumbnail ?
                {
                    url: data.thumbnail,
                    width: data.thumbnail_width,
                    height: data.thumbnail_height
                } : null,
        video: 
            data.is_video ? 
                {
                    url: data.secure_media.reddit_video.fallback_url,
                    height: data.secure_media.reddit_video.height,
                    width: data.secure_media.reddit_video.width
                } : null,

 * 
 "<!-- SC_OFF --><div class="md"><p>So my (28M) girlfriend, Sarah (26F), just had her birthday dinner at a nice restaurant with about 12 of our friends. I spent weeks planning it—made the reservation, coordinated with her friends, even got the staff to bring out a surprise cake at the end.</p>

<p>Dinner was going well until Sarah stood up, tapped her glass, and said she had an &quot;important announcement.&quot; Then, with the biggest smile, she goes: <em>&quot;I just want to thank everyone for coming tonight… and a special thank you to my wonderful boyfriend, who has been so amazing. So amazing, in fact, that I’m happy to say I finally see him as a true best friend… and nothing more.&quot;</em></p>

<p>The table went silent. I thought it was some weird joke, but then she kept talking about how she had been thinking for a while and realized she loved me, but &quot;not in that way.&quot; In front of <strong>everyone</strong>.</p>

<p>I felt like an idiot. I just sat there, stunned, while some of her friends awkwardly tried to change the subject. Eventually, I just grabbed my coat and left. I didn’t cause a scene, I didn’t say anything—I just walked out.</p>

<p>Sarah started throwing texts up my phone, calling me &quot;dramatic&quot; and saying I embarrassed her on her birthday. She said she thought we were mature enough to handle this like adults and that I should have stayed. But I just couldn’t sit there and pretend everything was fine after that public humiliation.</p>

<p>AITAH?</p>
</div><!-- SC_ON -->"
 * 
 * 
 * 
 * 
{
  kind: 't3',
  data: {
    subreddit: 'law',
    author_fullname: 't2_pydei2159',
    title: 'Trump says President Zelensky should be nicer to Vladimir Putin',
    subreddit_name_prefixed: 'r/law',
    name: 't3_1j0yur7',
    secure_media: { reddit_video: [Object] },
    link_flair_text: 'Trump News',
    score: 42705,
    thumbnail: 'https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?width=140&amp;height=78&amp;crop=140:78,smart&amp;format=jpg&amp;v=enabled&amp;lthumb=true&amp;s=9412b37c217866bba2fd50614077c31ed861f61c',
    subreddit_type: 'public',
    preview: { images: [Array], enabled: false },

    subreddit_id: 't5_2qh9k',
  
    id: '1j0yur7',
 
    author: 'Sanizore05',
    discussion_type: null,
    num_comments: 11136,
 
    permalink: '/r/law/comments/1j0yur7/trump_says_president_zelensky_should_be_nicer_to/',
    url: 'https://v.redd.it/co3ndyqhs2me1',
    subreddit_subscribers: 594486,
    created_utc: 1740833746,
    num_crossposts: 23,
    media: { reddit_video: [Object] },
    is_video: true
  }
}

"preview": 
{"images": 
    [
        {
            "source": {
                "url": "https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?format=pjpg&amp;auto=webp&amp;s=35f4015c8d1773672a32bfbb1ae3098455aaac9f", 
                "width": 1280, 
                "height": 720
            }, 
            "resolutions": [
                {
                    "url": "https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?width=108&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=3fbae79aa284ab2edde32a0f7d4cbdc58907453f", 
                    "width": 108, 
                    "height": 60
                }, 
                {
                    "url": "https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?width=216&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=d7c9381dfb1079c0802121ed6794bcc8ff199da2", 
                    "width": 216, 
                    "height": 121
                }, 
                {
                    "url": "https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=9f6b4400cb561724c8885b87028917b429fa41a4", 
                    "width": 320, 
                    "height": 180
                }, 
                {
                    "url": "https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?width=640&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=d10b137005ebb2e881c18bf1664af2dd176dd43b", 
                    "width": 640, 
                    "height": 360
                }, 
                {
                    "url": "https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?width=960&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=1f96174afe57b3229f5d9433e77882ceee281931", 
                    "width": 960, 
                    "height": 540
                }, 
                {
                    "url": "https://external-preview.redd.it/OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_.png?width=1080&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=2f7c1ef0515a7d3ef19856030b37868034caa069", 
                    "width": 1080,
                    "height": 607
                }
            ], 
            "variants": {}, 
            "id": "OGxwaGdibGhzMm1lMRWTQSwMhgiHpjUReX-ZalZ5WsSXnHQMIXg9WbXQU_r_"
        }
    ], 
    "enabled": false}



 */