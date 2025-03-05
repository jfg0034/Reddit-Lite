import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { loadResults } from "./resultsSlice";
import Card from "../../components/Card";

const tempStyle = {
    border : "1px solid black",
    margin: "20px"
}

function Results() {
    const dispatch = useDispatch();
    const { query } = useParams();
    const { sortBy } = useSelector(state => state.searchBar);
    useEffect(() => {
        if (query) {
            dispatch(loadResults({query, sort: sortBy}));
        }
    }, [query, sortBy]);
    const results = useSelector(state => state.results.results);
    return (
        <div>
            {results.map(post => {
                return (
                    <Card key={post.id} post={post}/>
                );                    
            })}
        </div>
    );
}


export default Results;