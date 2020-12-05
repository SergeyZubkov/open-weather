import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import {debounce} from 'lodash';

import cityList from '../city.list.json';

const cityNames = cityList.map(c => ({name: c.name, country: c.country, id: c.id}));

export default function CityForm({onAddCity}) {
    let [city, setCity] = useState([])
    let [matchedCities, setMatchedCities] = useState([]);

    const findCities = debounce( (str) => {
        setMatchedCities( cityNames.filter(c => c.name.toLowerCase().includes(str.toLowerCase())).slice(0, 20) );
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
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <i>
                            {option.name}
                            </i>
                            <i> 
                            {option.country}
                            </i>
                        </div>)}
                />
            </Form.Group>
            <Button onClick={() => {setCity([]); onAddCity(city[0].id)}} disabled={!city.length}>Добавить</Button>
       </Form> 
    )
}