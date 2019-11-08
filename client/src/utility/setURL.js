// Returns either an external or BigNeon URL for a given event.
export default function setURL(event) {
  const trackingParams = "?utm_source=publicworks&utm_medium=venuewebsite";

  return event.is_external ?
    event.external_url
    :
    event.url + trackingParams;
}
