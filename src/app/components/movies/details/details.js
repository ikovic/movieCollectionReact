import React, {Component} from 'react';

import './details.scss';

export default class Details extends Component {
    render() {
        console.dir(this.props);
        return (
            <article className="movie-details">
                <div className="poster-holder">
                    <img src={this.props.movie.Poster} />
                </div>
                <div className="data-holder">
                    <div>
                        <span>Title: </span><span>{this.props.movie.Title}</span>
                    </div>
                    <div>
                        <span>Genre: </span><span>{this.props.movie.Genre}</span>
                    </div>
                    <div>
                        <span>Actors: </span><span>{this.props.movie.Actors}</span>
                    </div>
                    <div>
                        <span>Director: </span><span>{this.props.movie.Director}</span>
                    </div>
                    <div>
                        <span>Plot: </span><span>{this.props.movie.Plot}</span>
                    </div>
                    <div>
                        <span>Year: </span><span>{this.props.movie.Year}</span>
                    </div>
                    <div>
                        <span>IMDb Rating: </span><span>{this.props.movie.imdbRating}</span>
                    </div>
                </div>
            </article>
        )
    }
};
