if (window.location.origin === "http://localhost:3000") {
  // dev server
  var apiUrl = "http://localhost:9000/api"
} else {
  // production
  var apiUrl = window.location.origin+'/api'
}

export default {
  apiUrl     
}