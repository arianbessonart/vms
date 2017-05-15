export default function encodeData(data) {
  return Object.keys(data).map(function(key) {
    if (data[key] !== '') {
      return [key, data[key]].map(encodeURIComponent ).join("=");
    }
  }).join("&");
}
