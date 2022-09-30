const api_key = `at_4QHHfAXud2HsZGZrp5TQtgNcBie4H`;

// NOTE: Cors bypass url. This is used to bypass cors error.
// This is a free service provided by cors-anywhere.herokuapp.com.
// To request the access of this service, visit https://cors-anywhere.herokuapp.com/corsdemo and
// click on the Request temporary access to the demo server button. and then only you can use this service.

const bypass_cors_url = "https://cors-anywhere.herokuapp.com/";
// const bypass_cors_url = "http://crossorigin.me/";
let current_verion = "v2";
let ipDetails = "country,city,vpn";
const base_url = "https://geo.ipify.org/api/";

// Selecting Elements Using DOM

let ip_address = document.getElementById("current_ip_address");
let ip_location = document.getElementById("location");
let ip_timezone = document.getElementById("timezone");
let ip_isp = document.getElementById("isp");

const searched_ip_address = document.getElementById("ip_address");
const search_btn = document.getElementById("search_btn");

const headers_option = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

// Integrating Leaflet JS

const map = L.map("ipMap").setView([27.7172, 85.324], 16);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

console.log("Informations are", ip_address, ip_location, ip_timezone, ip_isp);

// Adding Marker to the Map

updateMarker = (update_marker = [27.7172, 85.324]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

// Fetching Data from API

const getIpDetails = async (default_ip) => {
  try {
    if (default_ip == undefined) {
      var ip_url = `${bypass_cors_url}${base_url}${current_verion}?apiKey=${api_key}`;
    } else {
      var ip_url = `${bypass_cors_url}${base_url}${current_verion}/country,city?apiKey=${api_key}&ipAddress=${default_ip}`;
    }

    const response = await fetch(ip_url, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const dataResponse = await response.json();
    console.log("Data Repsonse is", dataResponse);

    ip_address.innerHTML = dataResponse?.ip;
    ip_location.innerHTML = `${dataResponse?.location?.country}`;
    ip_timezone.innerHTML = `UTC ${dataResponse?.location?.timezone}`;
    ip_isp.innerHTML = dataResponse?.isp;

    // Updating location marker on the map

    updateMarker([dataResponse?.location?.lat, dataResponse?.location?.lng]);
  } catch (error) {
    alert(
      "Unable to get IP details. \n Make sure you have requested the access of cors-anywhere.herokuapp.com from \n \t https://cors-anywhere.herokuapp.com/corsdemo"
    );
    console.log("Error is", error);
  }
};

document.addEventListener("load", updateMarker());

search_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searched_ip_address.value != "" && searched_ip_address.value != null) {
    getIpDetails(searched_ip_address.value);
    return;
  }
  alert("Please enter a valid IP address");
});
