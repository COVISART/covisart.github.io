import Axios from "axios";

export const Order = async  (state) => {
  const data = {
        email: state.email,
        name: state.name,
        country: state.country,
        description: state.message,
        size: state.size,
        phone: state.phone,
        accessory: state.accessory,
        color: state.color,
        reservedObjects: [
          "string"
        ]
      }
  const resp = await Axios.post("https://ngsmarket.azurewebsites.net/api/Orders/", data)
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const PingAPI =  () => {
  const resp = Axios.get("https://ngsmarket.azurewebsites.net/api/Orders/")
  .then((res) => {
      console.log(res)
  })
  .catch((err) => { 
      console.log(err)
  });
};