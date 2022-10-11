//Explanation: registers all clicks on the "registrarse" button,
//and sends data to Facebook

import hash_to_256 from '@services/hash_to_256';
const { hash } = hash_to_256;

const FB_Conversions_register_button_clicks = async (browserName) => {
  //timestamp in seconds (required in this format by facebook)
  const UnixTimeStamp = Math.floor(new Date().getTime() / 1000);

  //Generating unique event ID
  const uniqueID = Math.floor(Math.random() * Date.now());

  //Setting the external user id (always unauth user)
  const hashed_user_id = await hash('unauthenticated_user');

  //Sending request to FB Conversions API
  const PIXEL_ID = process.env.NEXT_PUBLIC_FB_CONVERSIONS_PIXEL_ID;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_FB_CONVERSIONS_ACCESS_TOKEN;
  const API_URL = `https://graph.facebook.com/v15.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [
        {
          event_name: 'register_ViewContent',
          event_time: UnixTimeStamp,
          action_source: 'website',
          event_id: uniqueID,
          event_source_url: 'www.campuscanvas.net',
          user_data: {
            client_user_agent: browserName,
            external_id: hashed_user_id,
          },
        },
      ],
      //Comment/uncomment this depending if testing or not
      //test_event_code: 'TEST49684',
    }),
  });

  const data = await response.json();
  //console.log(data);
};

export default {
  FB_Conversions_register_button_clicks,
};
