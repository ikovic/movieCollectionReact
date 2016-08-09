import React, {Component} from 'react';

import './details.scss';

export default class Details extends Component {
    render() {
        return (
            <article className="movie-details">
                <div className="poster-holder">
                    <img src={this.props.movie.Poster}/>
                </div>
                <div className="data-holder">
                    <div>
                        <span>Title: </span><span className="data-text">{this.props.movie.Title}</span>
                    </div>
                    <div>
                        <span>Genre: </span><span className="data-text">{this.props.movie.Genre}</span>
                    </div>
                    <div>
                        <span>Actors: </span><span className="data-text">{this.props.movie.Actors}</span>
                    </div>
                    <div>
                        <span>Director: </span><span className="data-text">{this.props.movie.Director}</span>
                    </div>
                    <div>
                        <span>Plot: </span><span className="data-text">{this.props.movie.Plot}</span>
                    </div>
                    <div>
                        <span>Year: </span><span className="data-text">{this.props.movie.Year}</span>
                    </div>
                    <div>
                        <span>IMDb Rating: </span><span className="data-text">{this.props.movie.imdbRating}</span>
                    </div>
                </div>
            </article>
        )
    }
};
