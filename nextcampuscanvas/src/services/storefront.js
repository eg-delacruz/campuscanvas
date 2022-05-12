//See video: https://www.youtube.com/watch?v=xNMYz74zNHM&t=643s

const API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function storefront(query, variables = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
