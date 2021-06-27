export const apiCall = async (url, params, abortSignal, requestType, sendAsFormData = false, throwError = false) => {
  try {
    let headers = {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-CSRF-Token",
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    // headers['Accept'] = 'application/json',
    // headers['Content-Type'] = 'application/json'
    if (requestType === "GET") {
      let separator = "?";
      if (url.indexOf("?") != -1) {
        separator = "&";
      }
      url = `${url}${separator}`;
    }
    let requestParams = {
      method: requestType,
      headers: headers,
      signal: abortSignal,
    };
    if (requestType === "POST") {
      requestParams["body"] = params;
    }
    const response = await fetch(`${url}`, requestParams);
    const data = await response.json();
    if (response.status >= 400) {
      throw new Error(data.errors);
    }
    return data;
  } catch (e) {
    console.error("Exception in apiCall", e);
    if(throwError) {
      throw e;
    }
    return false;
  }
};

export const apiPost = async (url, params, abortSignal, sendAsFormData = false, throwError = false) => {
  params = JSON.stringify(params)
  return await apiCall(url, params, abortSignal, "POST", sendAsFormData, throwError);
};
export const apiGet = async (url, params, abortSignal, throwError = false) => {
  return await apiCall(url, params, abortSignal, "GET", false, throwError);
};