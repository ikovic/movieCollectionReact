import React, {Component} from 'react';

import './card.scss';

export default class Card extends Component {
    render() {
        return (
            <article className="card">
                <img
                    src="http://ia.media-imdb.com/images/M/MV5BMTU0ODk1MTIxM15BMl5BanBnXkFtZTgwNTk3MTc5ODE@._V1_SX300.jpg"/>
                <div className="card-data">
                    <h4>Star Trek</h4>
                    <h4>2014.</h4>
                    <h4>IMDb: 7.5/10</h4>
                </div>

            </article>
        )
    }
};
/**
 * Created by Ivan on 4.8.2016..
 */
