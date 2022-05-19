const API_URL = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN;

export async function shopifyAdmin(query, variables = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ACCESS_TOKEN,
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

//Currently not being used. Leave it here for possible future use.
