import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge/utilities";
import { Redirect } from "@shopify/app-bridge/actions";


function useFetch() {
  const app = useAppBridge();
  const fetchFunction = authenticatedFetch(app);
  console.log("UseFetch From ")
  return async (uri, options) => {
    console.log("useFetch running")
    console.log(`https://${appOrigin}/apps${uri}`)

    const response = await fetchFunction(
      uri.startsWith("/")
        ? `https://shopify-ivky.onrender.com/apps${uri}`
        : `https://shopify-ivky.onrender.com/apps/${uri}`,
      options
    );
    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
           

    ) {
      console.log("hii response")
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/exitframe`);
      return null;
    }

     console.log(response)
    return response;
  };
}

export default useFetch;
