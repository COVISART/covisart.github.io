import Axios from "axios";

export const ORDERS_ENDPOINT = "https://ngsmarket.azurewebsites.net/api/Orders/";

// Shape expected by POST https://ngsmarket.azurewebsites.net/api/Orders/
// {"email","name","country","description","size","phone","accessory","color","reservedObjects":[]}
export const buildOrderPayload = ({
  email,
  name,
  country,
  description,
  size,
  phone,
  accessory,
  color,
  reservedObjects,
} = {}) => ({
  email: email || "",
  name: name || "",
  country: country || "",
  description: description || "",
  size: String(size || ""),
  phone: String(phone || ""),
  accessory: accessory || "",
  color: color || "",
  reservedObjects:
    Array.isArray(reservedObjects) && reservedObjects.length > 0
      ? reservedObjects
      : ["string"],
});

// Posts an order and lets the caller handle success / failure.
export const PostOrder = (order) =>
  Axios.post(ORDERS_ENDPOINT, buildOrderPayload(order));

export const Order = async (state) => {
  const resp = await PostOrder({
    email: state.email,
    name: state.name,
    country: state.country,
    description: state.message,
    size: state.size,
    phone: state.phone,
    accessory: state.accessory,
    color: state.color,
  })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const PingAPI =  () => {
  const resp = Axios.get(ORDERS_ENDPOINT)
  .then((res) => {
      console.log(res)
  })
  .catch((err) => { 
      console.log(err)
  });
};
