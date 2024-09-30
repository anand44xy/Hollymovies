import React from 'react';

function DisplayBox(props) {
    return (
        <div className='row gy-4'>
            {
                props.movies.map((m, i) => (
                    <Box key={i} title={m.title} source={m.poster_path} />
                ))
            }
        </div>
    );
}

export default DisplayBox;

function Box(props) {
    return (
        <div className='col-lg-2 col-md-3 col-sm-4 col-6 mb-4'>
            <div className='card overflow-hidden bg-dark text-white'>
                <img src={`https://image.tmdb.org/t/p/w1280/${props.source}`} alt="movie-img" className="card-img-top" />
                <p className='text-center my-1'>{props.title}</p>
            </div>
        </div>
    );
}
