import Ridbuter from "./firebase.js";

Ridbuter.open().then(() => {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((navItem, i) => {
    navItem.addEventListener("click", () => {
      navItems.forEach((item, j) => {
        item.className = "nav-item";
      });
      navItem.className = "nav-item active";
    });
  });

  const postTrips = document.getElementById("postTrips");
  const tripSeek = document.getElementById("searchTrips");
  const formContainer = document.getElementById("form-Content");
  const subHeading = document.getElementById("sub-heading");
  const searchResults = document.getElementById("searchResults");

  tripSeek.addEventListener("click", (event) => {
    event.preventDefault();

    const FromV = document.getElementById("From");
    const ToV = document.getElementById("To");
    const departureTime = document.getElementById("leaving");

    if (FromV.value.trim() === "") {
      FromV.style.border = "3px solid red";
      return;
    }

    if (ToV.value.trim() === "") {
      ToV.style.border = "3px solid red";
      return;
    }

    Ridbuter.searchTrip(FromV.value, ToV.value, departureTime.value)
      .then((matchedTrips) => {
        revealSearchResults(matchedTrips);
        formContainer.style.top = "30%";
        subHeading.style.top = "20%";
        searchResults.style.top = "50%";
      })
      .catch((error) => {
        console.error("Error searching trips:", error);
      });

    FromV.value = "";
    ToV.value = "";
  });

  postTrips.addEventListener("click", (event) => {
    event.preventDefault();

    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const numOfSeatsInput = document.getElementById("seats");
    const departureTime = document.getElementById("departureTime").value;

    // Validate inputs
    if (originInput.value.trim() === "") {
      originInput.style.border = "3px solid red";
      return;
    }

    if (destinationInput.value.trim() === "") {
      destinationInput.style.border = "3px solid red";
      return;
    }

    const numOfSeats = numOfSeatsInput.value;

    if (
      numOfSeats.trim() === "" ||
      isNaN(numOfSeats) ||
      parseInt(numOfSeats) <= 0
    ) {
      numOfSeatsInput.style.border = "3px solid red";
      return;
    }

    Ridbuter.add(
      originInput.value,
      destinationInput.value,
      numOfSeats,
      departureTime
    )
      .then((matchedTrips) => {
        document.getElementById("posted-message").style.transform =
          "translateY(10px)";
        setTimeout(() => {
          document.getElementById("posted-message").style.transform =
            "translateY(-25px)";
        }, 3000);
        console.log("Ride posted successfully");
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error posting ride:", error);
      });

    originInput.value = "";
    destinationInput.value = "";
    numOfSeatsInput.value = "0";
    departureTime = "";
  });

  function revealSearchResults(trips) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (trips.length > 0) {
      const resultList = document.createElement("ul");
      trips.forEach((trip) => {
        const listItem = document.createElement("li");
        listItem.className = "searchList";
        listItem.innerHTML = `Origin: ${trip.origin}<br>Destination: ${trip.destination}<br>Seats: ${trip.seats}<br>Departure time: ${trip.departureTime}`;
        // Add a "Book Trip" button
        const bookButton = document.createElement("button");
        bookButton.textContent = "Book Trip";
        bookButton.className = "book-btn";
        listItem.appendChild(bookButton);

        resultList.appendChild(listItem);
        bookButton.addEventListener("click", () => {
          const from = trip.origin;
          const to = trip.destination;
          const seats = trip.seats
          const DepartureTime = trip.departureTime

          const notificationMessage = `You've reserved a journey from ${from} to ${to}. You've secured ${seats} seats, and your departure is scheduled for ${DepartureTime}`;

          // Check if the browser supports notifications
          if ("Notification" in window) {
            // Request permission to show notifications
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // Show the notification
                new Notification("Trip Booked", {
                  body: notificationMessage,
                  icon: "/AppLogo.png", // Update with the path to your icon
                });
              }
            });
          }
        });
      });
      resultsContainer.appendChild(resultList);

    } else {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "No matching trips found.";
      resultsContainer.appendChild(noResultsMessage);
    }
  }

  
});
