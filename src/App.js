import { useEffect, useState } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import './App.css';
import CityForm from './CityForm/CityForm';

import cityList from './city.list.json';

const createIds = cityNames => cityNames.length === 0 ? "" : cityList.filter(c => cityNames.some(n => n === c.name)).map(c => c.id).join(",")

function App() {
  const [cityNames, setCityNames] = useState([]);
  const [data, setData] = useState([]);

  useEffect(
    async () => {
      if (cityNames.length) {
        const r = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${createIds(cityNames)}&appid=5a1434c253404a3ffa75b8640df26b1e`);
        const d = await r.json();
      // // http://openweathermap.org/img/wn/03n@4x.png
        setData(d.list)
      }

    }
  , [cityNames])

  const handleAddCity = city => setCityNames([...cityNames, city])

  return (
    <div className="app">
      <Container>
        <Row>
          <Col md={3} >
            <CityForm onAddCity={handleAddCity} />
          </Col>
          <Col md={9} style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            {data.map(c => (
              <Card key={c.id} style={{ width: '10rem', display: 'flex', alignItems: 'center' }} className="mb-2">
                <Card.Img variant="top" style={{width: '100px'}} src={`http://openweathermap.org/img/wn/${c.weather[0].icon}@4x.png`} />
                <Card.Body>
                  <Card.Title>{c.name}</Card.Title>
                  <Card.Text>
                    {c.main.temp}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
