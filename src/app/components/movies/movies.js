import React, {Component} from 'react';
import Card from './card/card';
import collectionStore from '../../stores/collectionStore';

import './movies.scss';

export default class Movies extends Component {

    constructor() {
        super();

        this.updateDimensions = this.updateDimensions.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            width: 192,
            movies: []
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

        this.setState({
            width: cardWidth
        });
    }

    getCards() {
        var cards = [];
        this.state.movies.forEach((movie) => {
            cards.push(<Card movie={movie} width={this.state.width} key={movie._id}/>);
        });
        return cards;
    }

    onChange() {
        this.setState({
            movies: collectionStore.getMovies()
        })
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        var cards = this.getCards();
        return (
            <section ref="cardsContainer" id="movies">
                {cards.length ? cards : <h1 className="empty-collection">No movies in this collection</h1>}
            </section>
        )
    }
};
