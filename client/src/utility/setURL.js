// Returns either an external or BigNeon URL for a given event.
export default function setURL(event) {
  const baseURL = "https://bigneon.com/events/"
  const trackingParams = "?utm_source=publicworks&utm_medium=venuewebsite";

  return event.is_external ?
    event.external_url
    :
    baseURL + event.id + trackingParams;
}
