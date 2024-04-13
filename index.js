import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_NacegNF0A6v3MNWv5CMcXeSURFl13CR9H7z0iH3e4Ue6KzuWoxeUsXbomUyBLsZs";

let selected = false;
// /**
//  * 1. Create an async function "initialLoad" that does the following:
//  * - Retrieve a list of breeds from the cat API using fetch().
//  * - Create new <options> for each of these breeds, and append them to breedSelect.
//  *  - Each option should have a value attribute equal to the id of the breed.
//  *  - Each option should display text equal to the name of the breed.
//  * This function should execute immediately.
//  */

(async function initialLoad() {
  const breedSelect = document.getElementById("breedSelect");
  try {

    let breeds = response.data;

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Failed to fetch breeds:", error);
    breedSelect.innerHTML = "<option>Error loading breeds</option>";
  }
  retrieveData();
})();


}

breedSelect.addEventListener("change", retrieveData);


//  * 6. Next, we'll create a progress bar to indicate the request is in progress.
//  * - The progressBar element has already been created for you.
//  *  - You need only to modify its "width" style property to align with the request progress.
//  * - In your request interceptor, set the width of the progressBar element to 0%.
//  *  - This is to reset the progress with each request.
//  * - Research the axios onDownloadProgress config option.
//  * - Create a function "updateProgress" that receives a ProgressEvent object.
//  *  - Pass this function to the axios onDownloadProgress config option in your event handler.
//  * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
//  *  - Update the progress of the request using the properties you are given.
//  * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
//  *   once or twice per request to this API. This is still a concept worth familiarizing yourself
//  *   with for future projects.
//  */

// /**
//  * 7. As a final element of progress indication, add the following to your axios interceptors:
//  * - In your request interceptor, set the body element's cursor style to "progress."
//  * - In your response interceptor, remove the progress cursor style from the body element.
//  */

// /**
//  * 8. To practice posting data, we'll create a system to "favourite" certain images.
//  * - The skeleton of this function has already been created for you.
//  * - This function is used within Carousel.js to add the event listener as items are created.
//  *  - This is why we use the export keyword for this function.
//  * - Post to the cat API's favourites endpoint with the given ID.
//  * - The API documentation gives examples of this functionality using fetch(); use Axios!
//  * - Add additional logic to this function such that if the image is already favourited,
//  *   you delete that favourite using the API, giving this function "toggle" functionality.
//  * - You can call this function by clicking on the heart at the top right of any image.
//  */
export async function favourite(imgId) {
  let requestBody = { image_id: imgId };
  const isExisting = await axios.get(`/favourites?image_id=${imgId}`);

  if (isExisting.data[0]) {
    let favouriteId = isExisting.data[0].id;
    await axios.delete(`/favourites/${favouriteId}`);
  } else {
    await axios.post("/favourites", requestBody);
  }
}

// /**
//  * 9. Test your favourite() function by creating a getFavourites() function.
//  * - Use Axios to get all of your favourites from the cat API.
//  * - Clear the carousel and display your favourites when the button is clicked.
//  *  - You will have to bind this event listener to getFavouritesBtn yourself.
//  *  - Hint: you already have all of the logic built for building a carousel.
//  *    If that isn't in its own function, maybe it should be so you don't have to
//  *    repeat yourself in this section.
//  */

async function getFavourites() {
  const favoriteImage = await axios.get(`/favourites`);
  const favoriteImg = favoriteImage.data;
  console.log(favoriteImage.data);
  Carousel.clear();
  favoriteImg.forEach((elem) => {
    const child = Carousel.createCarouselItem(
      elem.image.url,
      "alt",
      elem.image.id,
    );
    Carousel.appendCarousel(child);
  });
  Carousel.start();
}

// /**
//  * 10. Test your site, thoroughly!
//  * - What happens when you try to load the Malayan breed?
//  *  - If this is working, good job! If not, look for the reason why and fix it!
//  * - Test other breeds as well. Not every breed has the same data available, so
//  *   your code should account for this.
//  */
