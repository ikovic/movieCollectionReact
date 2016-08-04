import React, {Component} from 'react';
import Card from './card/card';

import './movies.scss';

export default class Movies extends Component {

    constructor() {
        super();

        this.updateDimensions = this.updateDimensions.bind(this);

        this.state = {
            width: 192
        }
    }

    updateDimensions() {
        var containerWidth = this.refs.cardsContainer.offsetWidth;
        var numberOfCardsInRow = 1;
        if (containerWidth > 1200) {
            numberOfCardsInRow = 10;
        } else if (containerWidth > 992) {
            numberOfCardsInRow = 8;
        } else if (containerWidth > 768) {
            numberOfCardsInRow = 6;
        } else if (containerWidth > 480) {
            numberOfCardsInRow = 4;
        } else if (containerWidth > 320) {
            numberOfCardsInRow = 2;
        }

        var cardWidth = (containerWidth / numberOfCardsInRow) - 2;

        //console.log('card width', cardWidth, 'container width', containerWidth, 'cards in row', numberOfCardsInRow);

        this.setState({
            width: cardWidth
        });
    }

    getCards() {
        var cards = [];
        for (var i = 0; i < 24; i++) {
            cards.push(<Card width={this.state.width} key={i}/>);
        }
        return cards;
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        return (
            <section ref="cardsContainer" id="movies">
                <div className="cardsContainer">
                    {this.getCards()}
                </div>
            </section>
        )
    }
};
