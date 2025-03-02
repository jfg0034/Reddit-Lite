import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "../layout/Root";
import Feed from "../features/feed/Feed";
import Results from "../features/results/Results";
import Post from "../features/Post";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
        <Route index element={ <Feed/> }/>
        <Route path="results/:query" element={ <Results/> }/>
        <Route path="posts/:postId" element={ <Post/> }/>
    </Route>
));


export default router;