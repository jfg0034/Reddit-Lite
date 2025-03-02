import { formatDistanceToNow } from 'date-fns';
const baseUrl ='https://www.reddit.com';

// Helper function
const formatTime = (time) => {
    const past = new Date(time * 1000);
    const timeAgo = formatDistanceToNow(past, {addSuffix: true});
    return timeAgo;
}


const getHomeFeed = async() => {
    const endpoint = baseUrl + '/.json?feed=home';
    const response = await fetch(endpoint);
    if (response.ok) {
        const results = (await response.json()).data.children;
        return results.map(post => ({
            subreddit: post.data.subreddit_name_prefixed,
            title: post.data.title,
            score: post.data.score,
            id: post.data.id,
            author: post.data.author,
            num_comments: post.data.num_comments,
            created: formatTime(post.data.created),
            //preview: decodeURIComponent(post.data?.preview?.images?.[0].source.url) || ''
            preview: post.data.url_overridden_by_dest
        }));
    }
    else {
        throw new Error('Could not get home');
    }
}

const getSearchResults = async(query) => {
    const encodedQuery = encodeURIComponent(query);
    const endpoint = baseUrl + '/search/.json?q=' + encodedQuery;
    const response = await fetch(endpoint);
    if (response.ok) {
        const results = (await response.json()).data.children;
        return results.map(post => ({
            subreddit: post.data.subreddit_name_prefixed,
            title: post.data.title,
            score: post.data.score,
            id: post.data.id,
            author: post.data.author,
            num_comments: post.data.num_comments,
            created: formatTime(post.data.created),
            //preview: decodeURIComponent(post.data?.preview?.images?.[0].source.url) || ''
            preview: post.data.url_overridden_by_dest
        }));
    }
    else {
        throw new Error('Could not get home');
    }
}


export { getHomeFeed, getSearchResults };

/**
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