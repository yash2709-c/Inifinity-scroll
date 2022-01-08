const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API
const count = 30;
const apiKey = "XMi_-4RVYcoHZ4uqlG6TgWhrf1SYcrLzZrnzf-gGjCI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to st Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for Links and Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  console.log("totalImages ", +totalImages);
  // Run function for each object in Photosarray
  photoArray.forEach((photo) => {
    // Create anchor element to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.url.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // event Listener, check when each is finished loading
    imageContainer.addEventListener("load", imageLoaded);

    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    // console.log(photoArray);
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// check to see if scrolling newar bottom of page, Load More Pages;
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready === true
  ) {
    ready = false;
    getPhotos();
  }
});

// onLoad
getPhotos();
