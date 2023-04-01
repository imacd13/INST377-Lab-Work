/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item, index) => {
      /* string that supplies us restaurant name */
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str
    }) 
  }
  
  /* A quick filter that will return something based on a matching input */
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    })
    /*
      Using the .filter array method, 
      return a list that is filtered by comparing the item name in lower case
      to the query in lower case
  
      Ask the TAs if you need help with this
    */
  }
  
  function cutRestaurantList(list) {
    console.log('fired cut list');
    const range = [...Array(15).keys()];
    return newArray = range.map((item, index) => {
      const idx = getRandomIntInclusive(0, list.length -1);
      return list[idx];
    });
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterDataButton = document.querySelector('#filter_button');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto');
    
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
    generateListButton.style.display = 'none';
  
    let storedList = [];
    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      
      // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
      console.log('Loading data'); 
      loadAnimation.style.display = 'inline-block';
  
  
      // Basic GET request - this replaces the form Action
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      // This changes the response from the GET into data we can use - an "object"
      storedList = await results.json();
  
      loadAnimation.style.display = 'none';
      console.table(storedList); 
    });
  
    filterDataButton.addEventListener('click', (event) => {
      console.log('clicked filterButton');
  
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.resto);
  
      console.log(newList);
      injectHTML(newList);
    })
  
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      currentList = cutRestaurantList(storedList);
      console.log(currentList)
      injectHTML(currentList);
    })

    textField.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        const newlist = filterList(currentList, event.target.value);
        console.log(newlist);
        injectHTML(newlist);
    })
    
  }
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  