import {Card, Button} from 'react-bootstrap';

export default function CityWeatherList({data, onDeleteCity}) {
    return (
        <>
            {data&&data.sort((a, b) => a.name.localeCompare(b.name)).map(c => (
                <Card key={c.id} style={{ width: '10rem', display: 'flex', alignItems: 'center' }} className="mb-2 ml-1">
                <Card.Img variant="top" style={{width: '100px'}} src={`http://openweathermap.org/img/wn/${c.weather[0].icon}@4x.png`} />
                <Card.Body>
                    <Card.Title style={{textAlign: 'center'}}>{parseInt(c.main.temp)}</Card.Title>
                    <Card.Text>
                    {c.name}
                    </Card.Text>
                    <Button 
                        variant="light" 
                        size='sm'
                        onClick={() => onDeleteCity(c.id)}
                    >
                        Удалить
                    </Button>
                </Card.Body>
                </Card>
            ))}
        </>
    )
}