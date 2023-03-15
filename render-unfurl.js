const renderUnfurl = ({ title, url, image, description, logo, publisher }) => {
  const result = `<div class="unfurl">
  <h4 class="unfurl__heading">
      <a href="${url}" target="_blank">${title}</a>
  </h4>
  <img class="unfurl__image" src="${image.url}" width="${image.width}" height="${image.height}" alt="Page preview image" />
  <p class="unfurl__description">${description}</p>

  <div class="unfurl__meta">
      <img class="unfurl__logo" src="${logo.url}" width="${logo.width}" height="${logo.height}" alt="Logo" />
      <span class="unfurl__publisher">${publisher}</span>
  </div>
</div>`;
  console.log("result :>> ", result);
  return result;
};
module.exports = renderUnfurl;
