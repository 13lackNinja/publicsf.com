(
  function (h,i,v,e,s,d,k) {
  h.HiveSDKObject=s;
  h[s] = h[s] || function () {
    (h[s].q = h[s].q || []).push(arguments)
  },
    d = i.createElement(v),
    k = i.getElementsByTagName(v)[0];
    d.async = 1;
    d.id = s;
    d.src = e + '?r=' + parseInt(new  Date()/60000);
    k.parentNode.insertBefore(d,k)
  }
)

  (window, document, 'script', 'https://cdn-prod.hive.co/static/js/sdk-loader.js', 'HIVE_SDK')

HIVE_SDK('init', YOUR_BRAND_HIVE_ID, function (data) {  // Initialization success callback
  // data.user contains info about the currently user (if availiable)
  console.log(data)
});

export function HIVE_SDK(
  'fbSignup',
  function (data) {  // Success Callback
    // data.user contains info about the currently auth'ed user
    console.log(data)
  },
  function (data) {  // Error Callback
    // data contains error information
    console.log(data)
  }
);
