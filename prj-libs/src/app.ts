import axios from "axios";
//declare var google: any;

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyD2jlT6C_to6X1mMvR9yRWeRvpIgTXgddM";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  //Send this to Google's API!
  try {
    const response = await axios.get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    );
    console.log(response);
    if (response.data.status !== "OK") {
      throw new Error("Could not fetch location!");
    }
    const coordinates = response.data.results[0].geometry.location;
    var map = new google.maps.Map(document.getElementById("map")!, {
      center: coordinates,
      zoom: 16
    });
    new google.maps.Marker({ position: coordinates, map: map });
  } catch (err) {
    console.log(err.message);
  }
}

form?.addEventListener("submit", searchAddressHandler);
