import React, {Component} from 'react';
import Card from './card/card';

import './movies.scss';

export default class Movies extends Component {

    getCards() {
        var cards = [];
        for (var i = 0; i < 24; i++) {
            cards.push(<Card key={i}/>);
        }
        return cards;
    }

    render() {
        return (
            <section id="movies">
                <div className="cardsContainer">
                    {this.getCards()}
                </div>
            </section>
        )
    }
};
