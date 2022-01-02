const APY_KEY = 'AmYKrxfwVwllPmAcQ7vIx7WMxqx4awY0JpM8Va8l';
const baseURL = 'https://api.nasa.gov/planetary/apod?api_key=';

const getDataApod = async () => {
  const dateInput = document.querySelector('.js-datepicker');
  const { value } = dateInput;
  const newDate = `&date=${value}&`;

  try {
    const response = await fetch(`${baseURL}${APY_KEY}${newDate}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default getDataApod;
