import React, {Component} from 'react';

import './details.scss';

export default class Details extends Component {

    constructor() {
        super();

        this._hasPoster = this._hasPoster.bind(this);

        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        this.urlRegex = new RegExp(expression);
    }

    _hasPoster(url) {
        return this.urlRegex.test(url);
    }

    render() {
        return (
            <article className="movie-details">
                <div className="poster-holder">
                    <img
                        src={this._hasPoster(this.props.movie.Poster) ? this.props.movie.Poster : require('../../../../../public/images/imdb.jpg')}/>
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
