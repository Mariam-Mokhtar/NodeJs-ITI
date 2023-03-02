var myMod = require("./module")
var date=new Date();

console.log(date)
let FlightAdminstration = myMod.fligthReservation;

let FlightAdmin = new FlightAdminstration();
FlightAdmin.AddFlight(5683,5,100,"Alex","cairo",date);
FlightAdmin.AddFlight(5685,7,60,"cairo","alex",date);
FlightAdmin.AddFlight(5684,10,150,"Alex","cairo",date);

FlightAdmin.GetUserFlights(5683);

FlightAdmin.updateUserFlights(5683,5,"seatNum",500)
FlightAdmin.updateUserFlights(5683,5,"flightNum",8)
