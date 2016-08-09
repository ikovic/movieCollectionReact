import React, {Component} from 'react';
import Card from './card/card';
import collectionStore from '../../stores/collectionStore';
import sessionStore from '../../stores/sessionStore';

import './movies.scss';

export default class Movies extends Component {

    constructor() {
        super();

        this.updateDimensions = this.updateDimensions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getMessageForNoMovies = this.getMessageForNoMovies.bind(this);

        this.state = {
            width: 192,
            movies: []
        }
    }

    updateDimensions() {
        var containerWidth = this.refs.cardsContainer.offsetWidth;
        var numberOfCardsInRow = 1;
        if (containerWidth > 1400) {
            numberOfCardsInRow = 12;
        } else if (containerWidth > 1200) {
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

        var cardWidth = (containerWidth / numberOfCardsInRow) - 4;

        this.setState({
            width: cardWidth
        });
    }

    canRemoveMovie() {
        var currentCollection = collectionStore.getCurrentCollection();
        var currentUser = sessionStore.getActiveUser();
        if (currentCollection && currentUser) {
            return currentCollection.slug === currentUser.slug;
        } else {
            return false;
        }
    }

    getCards() {
        var canRemoveMovie = this.canRemoveMovie();
        var cards = [];
        this.state.movies.forEach((movie) => {
            cards.push(<Card canEdit={canRemoveMovie} movie={movie} width={this.state.width} key={movie._id}/>);
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
        collectionStore.addChangeListener(this.onChange);
        sessionStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        collectionStore.removeChangeListener(this.onChange);
        sessionStore.removeChangeListener(this.onChange);
    }

    getMessageForNoMovies() {
        if (collectionStore.getCurrentCollection()) {
            if (!this.state.movies.length) {
                return 'No movies in this collection';
            }
        } else {
            return 'Please select a collection on the left side';
        }
    }

    render() {
        var cards = this.getCards();

        return (
            <section ref="cardsContainer" id="movies">
                {cards.length ? cards : <h1 className="empty-collection">{this.getMessageForNoMovies()}</h1>}
            </section>
        )
    }
};
