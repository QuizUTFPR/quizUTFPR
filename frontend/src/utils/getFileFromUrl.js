async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
  const response = await fetch(url);
  const data = await response.blob();

  return new File([data], name, {
    type: response.headers.get('content-type') || defaultType,
  });
}

export default getFileFromUrl;
