import getDataApod from './service.js';

const formattedDate = (valueDate) => {
  const dateInput = document.querySelector('.js-datepicker');
  const currentDate = new Date().toISOString().slice(0, 10);

  dateInput.value = valueDate || currentDate;
  dateInput.max = currentDate;
  dateInput.min = '1995-06-16';
};

const handleApodData = async () => {
  const description = document.querySelector('.js-explanation');
  const titleMedia = document.querySelector('.js-title-image');
  const urlImage = document.querySelector('.js-url-image');
  const urlIframe = document.querySelector('.js-url-iframe');

  try {
    const data = await getDataApod();
    const {
      title, hdurl, media_type, url,
      explanation, date,
    } = data;

    if (title !== titleMedia.textContent) titleMedia.textContent = '';

    formattedDate(date);

    if (media_type === 'image') {
      urlImage.setAttribute('src', hdurl);
      urlImage.setAttribute('alt', title);
      urlIframe.classList.remove('c-about-space__video--actived');
    } else {
      urlIframe.setAttribute('src', url);
      urlIframe.setAttribute('alt', title);
      urlImage.classList.add('c-about-space__video--disabled');
      urlIframe.classList.add('c-about-space__video--actived');
    }

    titleMedia.insertAdjacentHTML('afterbegin', `${title}`);
    description.insertAdjacentHTML('afterbegin', `${explanation}`);
  } catch (error) {
    throw new Error(error);
  }
};

handleApodData();

document.querySelector('.js-datepicker').addEventListener('change', (event) => {
  event.preventDefault();
  handleApodData();
});
