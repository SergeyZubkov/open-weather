import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import {debounce} from 'lodash';

import cityList from '../city.list.json';

const cityNames = cityList.map(c => c.name);

export default ({onAddCity}) => {
    let [city, setCity] = useState([])
    let [matchedCities, setMatchedCities] = useState([]);

    const findCities = debounce( (str) => {
        setMatchedCities( cityNames.filter(c => c.toLowerCase().includes(str.toLowerCase())).slice(0, 20) );
    }, 200 )

    return (
       <Form className="mt-4"> 
            <Form.Group>
                <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    onInputChange={findCities}
                    onChange={setCity}
                    options={matchedCities}
                    placeholder="Выберите город"
                    selected={city}
                    renderMenuItemChildren={( option ) => (
                        <div>{option}</div>)}
                />
            </Form.Group>
            <Button onClick={() => onAddCity(city[0])}>Добавить</Button>
       </Form> 
    )
}