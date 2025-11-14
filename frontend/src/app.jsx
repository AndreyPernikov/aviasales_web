import { useState } from 'react'
import './styles.css'

function App() {
  const [flights, setFlights] = useState([])
  const [searchParams, setSearchParams] = useState({
    from_airport: 'SVO',
    to_airport: 'LED',
    departure_date: '2024-05-20',
    passengers: 1
  })

  const searchFlights = async () => {
    try {
      const params = new URLSearchParams(searchParams)
      const response = await fetch(`http://localhost:8000/api/search?${params}`)
      const data = await response.json()
      setFlights(data.flights)
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  const bookFlight = async (flightId) => {
    try {
      const bookingData = {
        flight_id: flightId,
        passengers: [
          {
            first_name: "Иван",
            last_name: "Иванов",
            email: "ivan@mail.ru"
          }
        ]
      }

      const response = await fetch('http://localhost:8000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      })

      const result = await response.json()
      alert(`Бронирование создано! ID: ${result.booking_id}`)
    } catch (error) {
      console.error('Booking failed:', error)
    }
  }

  return (
    <div className="app">
      <h1>Поиск авиабилетов</h1>

      <div className="search-form">
        <input
          value={searchParams.from_airport}
          onChange={(e) => setSearchParams({...searchParams, from_airport: e.target.value})}
          placeholder="Откуда (SVO)"
        />
        <input
          value={searchParams.to_airport}
          onChange={(e) => setSearchParams({...searchParams, to_airport: e.target.value})}
          placeholder="Куда (LED)"
        />
        <input
          type="date"
          value={searchParams.departure_date}
          onChange={(e) => setSearchParams({...searchParams, departure_date: e.target.value})}
        />
        <button onClick={searchFlights}>Найти рейсы</button>
      </div>

      <div className="flights-list">
        {flights.map(flight => (
          <div key={flight.id} className="flight-card">
            <h3>{flight.airline} {flight.flight_number}</h3>
            <p>{flight.departure_airport} → {flight.arrival_airport}</p>
            <p>Время: {flight.departure_time} - {flight.arrival_time}</p>
            <p>Цена: {flight.price} руб.</p>
            <button onClick={() => bookFlight(flight.id)}>Забронировать</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App