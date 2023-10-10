import Axios from "axios";

export const uploadData = (state) => {
    const data = {
        email: state.email,
        name: state.name,
        description: state.decal,
        size: state.size,
        phone: state.phone,
        accessory: state.accessory,
        color: state.color,
        reservedObjects: [
          "string"
        ]
      }
    Axios.post("https://ngsmarket.azurewebsites.net/api/Orders/", data,)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => { 
        console.log(err)
    });
};