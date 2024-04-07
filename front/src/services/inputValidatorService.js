const validateIdealistaURL = (url) => {
 
  const regex = /^https?:\/\/(www\.)?idealista\.com\/inmueble\/(\d+)\/?$/;

  const match = url.match(regex);

  if (match) {
    return match[2];
  } else {
    return '';
  }
};

export default { validateIdealistaURL };
