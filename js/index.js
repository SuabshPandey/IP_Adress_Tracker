const api_key = `at_mEC4l82AsgTauaF0t1NZT2GigKnB9`;

// Selecting Elements Using DOM

let ip_address = document.getElementById("current_ip_address");
let ip_location = document.getElementById("location");
let ip_timezone = document.getElementById("timezone");
let ip_isp = document.getElementById("isp");

// Integrating Leaflet JS

const map = L.map("ipMap").setView([27.7172, 85.324], 16);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

console.log("Informations are", ip_address, ip_location, ip_timezone, ip_isp);
