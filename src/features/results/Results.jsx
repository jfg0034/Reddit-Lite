import Card from "../../components/Card";

const tempList = [];

function Results() {
    const results = tempList;
    return (
        <div>
            {results.map(result => {
                <Card/>
            })}
        </div>
    );
}


export default Results;