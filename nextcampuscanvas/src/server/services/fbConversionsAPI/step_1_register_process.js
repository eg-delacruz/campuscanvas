import { hash } from '@server/services/hash_to_256';

export async function successful_step_1_register_process(
  IP_Address,
  email,
  addedUser,
  browserName
) {
  const USER_ID = addedUser._id.toString();

  //Hashing email and mongo DB user id
  const hashed_email = await hash(email);
  const hashed_user_id = await hash(USER_ID);

  //Generating unique event ID
  const uniqueID = Math.floor(Math.random() * Date.now());

  ('use strict');
  const bizSdk = require('facebook-nodejs-business-sdk');
  const ServerEvent = bizSdk.ServerEvent;
  const EventRequest = bizSdk.EventRequest;
  const UserData = bizSdk.UserData;
  const CustomData = bizSdk.CustomData;
  const Content = bizSdk.Content;

  const access_token = process.env.NEXT_PUBLIC_FB_CONVERSIONS_ACCESS_TOKEN;
  const pixel_id = process.env.NEXT_PUBLIC_FB_CONVERSIONS_PIXEL_ID;
  const api = bizSdk.FacebookAdsApi.init(access_token);

  let current_timestamp = Math.floor(new Date() / 1000);

  const userData_0 = new UserData()
    .setEmails([hashed_email])
    .setExternalIds([hashed_user_id])
    .setClientUserAgent(browserName)
    .setClientIpAddress(IP_Address);

  const serverEvent_0 = new ServerEvent()
    .setEventName('successful_step_1_register_process')
    .setEventTime(current_timestamp)
    .setUserData(userData_0)
    .setActionSource('website')
    .setEventSourceUrl('www.campuscanvas.net/auth/registro_step_1')
    .setEventId(uniqueID);

  const eventsData = [serverEvent_0];
  const eventRequest = new EventRequest(access_token, pixel_id)
    //Comment/uncomment this depending if testing or not
    //.setTestEventCode('TEST49684')
    .setEvents(eventsData);

  eventRequest.execute().then(
    (response) => {
      console.log('[FB Conversions API] Execute OK', response);
    },
    (error) => {
      console.log('[FB Conversions API] Error: ', error);
    }
  );
}
