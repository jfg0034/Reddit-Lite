import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Root from "../layout/Root";
import Feed from "../features/feed/Feed";
import Results from "../features/results/Results";
import Post from "../features/post/Post";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
        <Route index element={ <Feed/> }/>
        <Route path="results/:query/:sort?" element={ <Results/> }/>
        <Route path="posts/:subreddit/:postId" element={ <Post/> }/>
        <Route path="*" element={ <Navigate to="/"/>}/>
    </Route>
));

export default router;