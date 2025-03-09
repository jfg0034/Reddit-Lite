import SearchBar from "../../features/searchBar/SearchBar";
import styles from "./Header.module.css";

function Header() {
    return (
        <div className={styles.header}>
            <h1>Reddit~Lite</h1>
            <SearchBar/>
        </div>
    );
}

export default Header;
