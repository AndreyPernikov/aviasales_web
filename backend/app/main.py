from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Annotated, List
from enum import Enum

app = FastAPI()

# CORS для фронта
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FlightSearch(BaseModel):
    from_airport: str
    to_airport: str
    departure_date: str
    passengers: int = 1


class PassengerInfo(BaseModel):
    first_name: str
    last_mane: str
    email: str


class BookingRequest(BaseModel):
    flight_id: str
    passengers: List[PassengerInfo]


flights_bd = [
    {
        "id": "flt_1",
        "flight_number": "SU-100",
        "airline": "Аэрофлот",
        "departure_airport": "SVO",
        "arrival_airport": "LED",
        "departure_time": "2024-05-20T10:00:00",
        "arrival_time": "2024-05-20T11:30:00",
        "price": 5000,
        "available_seats": 50
    }
]

booking_db = []


@app.get("/")
async def read_root():
    return {"message": "Aviasales_API"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
