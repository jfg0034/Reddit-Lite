import { useNavigate} from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "./searchBarSlice";
import styles from "./SearchBar.module.css";

// Display search bar and sorting buttons
function SearchBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sortType = useSelector(state => state.searchBar.sortBy);
    const inputRef = useRef();
    // Redirect to a new path, the component in that path will take care of making the api call
    const handleSearch = (e) => {
        e.preventDefault();
        const searchInput = inputRef.current.value.trim();
        if (!searchInput) {
            return navigate('/');
        }
        navigate(`results/${searchInput}`);
    }
    const sortBy = (type) => {
        // Only dispatch if the clicked button is not already pressed
        if (sortType !== type) dispatch(setSortBy(type));
    }
    const sortCriteria =['hot', 'new', 'top'];
    return (
        <div className={styles.search}>
            <form onSubmit={handleSearch}>
                <input 
                    ref={inputRef}
                    type='text'
                    placeholder="Find anything"
                />
                <button type='submit'>Search</button>
            </form>
            <div>
                {sortCriteria.map((type, i) => {
                    return(
                        <button key={i} className={styles.sortBy} disabled={sortType === type} onClick={() => sortBy(type)}>
                            | {type}
                        </button>
                    );
                })}
            </div>
            <hr/>
        </div>
    );
}

export default SearchBar;