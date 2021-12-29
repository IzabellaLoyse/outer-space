// eslint-disable-next-line import/extensions
import APY_KEY from './service.js';

const getDataApod = async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APY_KEY} `);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const loadData = async () => {
  const description = document.querySelector('.js-explanation');
  const titleImage = document.querySelector('.js-title-image');
  const urlImage = document.querySelector('.js-url-image');
  const urlIframe = document.querySelector('.js-url-iframe');

  const data = await getDataApod();
  const {
    explanation, title, url, media_type,
  } = data;

  if (media_type === 'image') {
    urlImage.setAttribute('src', url);
    urlImage.setAttribute('alt', title);
  } else {
    urlIframe.setAttribute('src', url);
    urlIframe.setAttribute('alt', title);
  }

  description.insertAdjacentHTML('afterbegin', explanation);
  titleImage.insertAdjacentHTML('afterbegin', title);
};

loadData();
