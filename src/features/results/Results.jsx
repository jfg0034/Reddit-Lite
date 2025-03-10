import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadResults } from "./resultsSlice";
import Card from "../../components/Card/Card";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./Results.module.css";

// Shows a list of results in a smaller version than the feed 
function Results() {
    const dispatch = useDispatch();
    const { query } = useParams();
    const { sortBy } = useSelector(state => state.searchBar);
    useEffect(() => {
        if (query) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            dispatch(loadResults({query, sort: sortBy}));
        }
    }, [query, sortBy]);
    const { results, hasError, isLoading } = useSelector(state => state.results);
    if (hasError) {
        return <ErrorMessage message={`Could not retrieve '${query}'`}/>;
    }
    if (!isLoading && results.length === 0) {
        return <ErrorMessage message={`There are no results for '${query}'`}/>;
    }
    return (
        <div className={styles.results}>
            {!isLoading && results.map(post => {
                return (
                    <Card key={post.id} post={post} detail='small'/>
                );                    
            })}
        </div>
    );
}

export default Results;