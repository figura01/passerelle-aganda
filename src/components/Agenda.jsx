// Chargement des dépendances (librairie React ici)
import React, { Fragment } from 'react';

import SearchBar from './SearchBar';
import Event from './Event';
/*
 * API OpenData de la région Ile-de-France : 
 * https://data.iledefrance.fr/explore/dataset/evenements-publics-cibul/api
 *
 * URL finale à appeler en HTTP GET, récupère 36 résultats (paramètre rows)
 */



// Composant React de type classe : le plus simple lorsqu'il y a du state
export class Agenda extends React.Component {

    constructor(props) {
    super(props);
        this.state = { 
            cards: [],
            filteredCards: [],
            filter: '',
        };
    }

    componentDidMount() {
        let url = 'https://data.iledefrance.fr/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&facet=keywords_fr&facet=updatedat&facet=firstdate_begin&facet=firstdate_end&facet=lastdate_begin&facet=lastdate_end&facet=location_city&facet=location_department&facet=location_region&facet=location_countrycode';
        window.fetch(url).then(httpResponse => {
            return httpResponse.json()
        }).then((json) => {
            console.log(json);
            this.setState({
                cards: json.records
            })
        }) 
    }

    setFilter = (inputValue) => {
        let filteredEvents = this.filterEvents(inputValue);
        this.setState({
            cards: this.state.cards,
            filter: inputValue,
            filteredCards: filteredEvents
        }) 
    }
    
    filterEvents = () => {
        let newListRecords = this.state.cards;
        newListRecords = newListRecords.filter((el) => el.fields.title_fr.includes(this.state.filter))
        return newListRecords
    }

    buildListFilterRecords = () => {
        let filteredEvents = this.state.cards.filter((el) => el.fields.title_fr.includes(this.state.filter))
        let filteredListRecords = filteredEvents.map((eventData) => <Event key={eventData.recordid} data={eventData}   /> )
        return filteredListRecords;
    }
    
    buildListRecords = () => {
        const listRecords = this.state.cards.map((eventData) => {
            return <Event key={eventData.recordid} data={eventData} /> 
        })
        return listRecords
    };
    
    render() { 
        let listRecords = this.buildListRecords();
        if(this.state.filter !== '') {
            listRecords = this.buildListFilterRecords();
        }
        return (
            <Fragment>
                <section className="">
                    <SearchBar filter={this.state.filter}  setFilter={this.setFilter} />
                    <div className="container mx-auto">
                        <ul className="flex flex-col">
                            {listRecords}
                        </ul>
                    </div>
                </section>
            </Fragment>
        );
    }
}