import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Weather Search</h1>
    <form id="weatherForm">
      <label for="city">City:</label>
      <input type="text" id="city" name="city" required>
      <button type="submit" id="searchButton" disabled>Search</button>
    </form>
    <div id="weatherResult">
    </div>
    <div id="updateSection">
      <p>Next update in: <span id="countdown">120</span> seconds</p>
      <button id="updateNow">Update Now</button>
    </div>
  </div>
  </div>
`

setupCounter(document.querySelector('#counter'))
