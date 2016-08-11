import React, {Component} from 'react';
import collectionActions from '../../../actions/collectionActions';
import modalActions from '../../../actions/modalActions';

import './card.scss';

export default class Card extends Component {

    _viewDetails() {
        modalActions.showMovieDetails(this.props.movie);
    }

    _removeMovie(event) {
        event.stopPropagation();
        collectionActions.removeMovie(this.props.movie);
    }

    _truncateTitle(title) {
        if (title && title.length > 40) {
            return title.substring(0, 40) + '...';
        } else {
            return title;
        }
    }

    _hasPoster(url) {
        return (url.length > 5);
    }

    render() {
        return (
            <article className="card" style={{width: this.props.width}} onClick={() => this._viewDetails()}>
                <img
                    src={this._hasPoster(this.props.movie.Poster) ? this.props.movie.Poster : "http://filmmakerseo.com/imdb/imdb11.jpg"}/>
                <div className="card-data">
                    {this.props.canEdit ?
                        <span className="remove-button" onClick={(event) => this._removeMovie(event)}>x</span> : null}
                    <p className="title">{this._truncateTitle(this.props.movie.Title)}</p>
                    <p className="year">{this.props.movie.Year}</p>
                    <p className="rating">{this.props.movie.imdbRating}</p>
                </div>

            </article>
        )
    }
};
