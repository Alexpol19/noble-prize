import axios from "axios"

export const getPrizes = () => (
  axios
    .get('https://api.nobelprize.org/2.1/nobelPrizes')
    .then((res) => res.data)
)
// http://nobel-external-api-app.azurewebsites.net/2.1/nobelPrizes?offset=0&limit=25