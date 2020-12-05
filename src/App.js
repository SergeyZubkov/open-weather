import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';
import CityForm from './CityForm/CityForm';
import CityWeatherList from './CityWeatherList/CityWeatherList';
import {useSelector, useDispatch} from 'react-redux';
import {addCityAction, tryGetInitialDataAction, deleteCityAction} from './actions';

function App() {
  const [cityId, setCityId] = useState(null);
  // const [data, setData] = useState([]);

  const data = useSelector(state => state);
  const dispatch = useDispatch();

  // useEffect(
  //   () => {
  //     // получение данных из локального хранилища
  //     if (localStorage['cityIds']) {
  //       const cityIds = localStorage['cityIds'].split(',');

  //       if (cityIds.length) {
  //         fetch(`https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=5a1434c253404a3ffa75b8640df26b1e`)
  //         .then(r => r.json())
  //         .then(d => setData(data => [...data, ...d.list]))
  //       }
  //     } 
  //     // получение коор. пользователя
  //     const c = navigator.geolocation
  //     c.getCurrentPosition((position) => {
        
  //       const latitude  = position.coords.latitude;
  //       const longitude = position.coords.longitude;

  //       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5a1434c253404a3ffa75b8640df26b1e`)
  //       .then(r => r.json())
  //       .then(d => setData(data => [...data, d]) )
      
  //     })

  //   }
  // , [])

  // useEffect(
  //   () => {
  //     const fetchData = async () => {
  //       if (cityId) {
  //         const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=5a1434c253404a3ffa75b8640df26b1e`);
  //         const d = await r.json();

  //         setData(data => [...data, d])
  //       }
  //       console.log(1)
  //     }

  //     fetchData()
  //   }
  // , [cityId])

  useEffect(
    () => dispatch(tryGetInitialDataAction())
  , [])

  const handleAddCity = cityId => {
    if (data.some(i => i.id === cityId)) return
    
    dispatch(addCityAction(cityId))

  }

  const handleDeleteCity = id => {
    dispatch(deleteCityAction(id))
  }

  return (
    <div className="app">
      <Container>
        <Row>
          <Col md={3} >
            <CityForm onAddCity={handleAddCity} />
          </Col>
          <Col md={9} style={{display: 'flex', flexWrap: 'wrap'}}>
            <CityWeatherList data={data} onDeleteCity={handleDeleteCity}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
