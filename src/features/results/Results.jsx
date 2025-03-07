import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadResults } from "./resultsSlice";
import Card from "../../components/Card";
import styles from "./Results.module.css";

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
        <div className={styles.results}>
            {results.map(post => {
                return (
                    <Card key={post.id} post={post} detail='small'/>
                );                    
            })}
        </div>
    );
}


export default Results;