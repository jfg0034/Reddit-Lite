const anchorStyle = {
    margin: "0 10px"
}
function SearchBar() {
    return (
        <div>
            <input placeholder="Enter your request"/>
            <button>Search</button>
            <div>
                <a style={anchorStyle}>Category 1</a>
                <a style={anchorStyle}>Category 2</a>
                <a style={anchorStyle}>Category 3</a>
            </div>
            <hr></hr>
        </div>
    );
}

export default SearchBar;