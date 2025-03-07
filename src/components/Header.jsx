import SearchBar from "../features/searchBar/SearchBar";

// Quick style
const headerStyle = {
    backgroundColor: 'rgb(153, 156, 199)'
}

function Header() {
    return (
        <div>
            <h1 style={headerStyle}>Reddit~Lite</h1>
            <SearchBar/>
        </div>
    );
}

export default Header;
