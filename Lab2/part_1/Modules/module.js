class fligthReservation {
    Flights = [];
    AddFlight(userId, flightNum, seatNum, depature_airport, arrival_airport, date) {
        let flight = { userId, flightNum, seatNum, depature_airport, arrival_airport, date };
        this.Flights.push(flight);
    }
    GetUserFlights(search_id) {
        let result = this.Flights.filter(flight => flight.userId === search_id);
        console.log(`User ${search_id} Your Flights`);
        console.log(`-----------------------`);
        let i = 1
        for (var item of result) {
            console.log(`Flight no: ${i}`);
            for (let key in item) {
                console.log(`${key} : ${item[key]}`);
            }
            console.log(`-----------------------`);
            i++;
        }
    }
    updateUserFlights(user_id, flight_num, update_field, update_value) {
        let result = this.Flights.find(flight => flight.userId === user_id && flight.flightNum == flight_num);
        // create empty user input
        if (result) {
            if (update_field != "userId" && update_field !="flightNum") {
                console.log("Old")
                for (let key in result) {
                    console.log(`${key} : ${result[key]}`);
                }
                console.log(`-----------------------`);
                result[update_field] = update_value;
                console.log("Update Sucessfully")
                console.log(`-----------------------`);
                console.log("New")
                for (let key in result) {
                    console.log(`${key} : ${result[key]}`);
                }

            } else {
                console.log("\nYou can't edit your id or your flight number")
            }
        }
        else {
            console.log("No Result, please try again");
        }
    }
}

module.exports = {
    fligthReservation
}