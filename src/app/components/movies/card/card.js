import React, {Component} from 'react';
import collectionActions from '../../../actions/collectionActions';

import './card.scss';

export default class Card extends Component {

    _viewDetails() {
        console.log('details')
    }

    _removeMovie(event) {
        event.stopPropagation();
        collectionActions.removeMovie(this.props.movie);
    }

    _truncateTitle(title) {
        if (title.length > 40) {
            return title.substring(0, 100) + '...';
        } else {
            return title;
        }
    }

    render() {
        return (
            <article className="card" style={{width: this.props.width}} onClick={() => this._viewDetails()}>
                <img
                    src={this.props.movie.Poster}/>
                <div className="card-data">
                    {this.props.canEdit ? <span className="remove-button" onClick={(event) => this._removeMovie(event)}>x</span> : null}
                    <p className="title">{this._truncateTitle(this.props.movie.Title)}</p>
                    <p className="year">{this.props.movie.Year}</p>
                    <p className="rating">{this.props.movie.imdbRating}</p>
                </div>

            </article>
        )
    }
};
