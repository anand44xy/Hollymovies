import React from 'react';

function SearchBox(props) {
    return (
        <div className="p-4 d-flex justify-content-center">
            <input
                onKeyUp={(e) => props.searchHandler(e.target.value)}
                className="px-4 py-2 border rounded w-75 w-md-50 w-lg-25"
                type="text"
                placeholder="Enter movie name..."
            />
        </div>
    );
}

export default SearchBox;
