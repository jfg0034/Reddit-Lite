import SearchBar from "../features/searchBar/SearchBar";

const temp = {
    backgroundColor: 'rgb(126, 133, 238)'
}

function Header() {
    return (
        <div>
            <h1 style={temp}>Reddit~Lite</h1>
            <SearchBar/>
        </div>
    );
}

export default Header;
