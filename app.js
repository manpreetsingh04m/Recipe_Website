const searchOpen = document.getElementById("button_Search");
const searchPage = document.getElementById("search_page_pop");
const SearchButtonMain = document.getElementById("button_Search_main");
const somethingElse = document.getElementById("dish_change");
const specialDishName = document.getElementById("special_dish_name");
const specialDishCategory = document.getElementById("special_dish_category");
const specialDishImage = document.getElementById("special_dish_image");
const close = document.getElementById("close_option");
const resultPage = document.getElementById("searched_meal_page");
const spaceDiv = document.getElementById("temprory");
const instruction = document.getElementById("instruction_given");
const ingrideients = document.getElementById("ingrideients");
const dishImage = document.getElementById("special_dish_image");
const dishName = document.getElementById("special_dish_name");
const dishCategory = document.getElementById("special_dish_category");
const modalPage = document.getElementById("modal_page");
const specialDishText = document.getElementById("special_dish_text");
const modalClose = document.getElementById("modal_img");
const measurementModalPage = document.getElementById("measurement_modal");
const measurementModalClose = document.getElementById("measurement_modal_img");
const measurementButton = document.getElementById("measurement_button");
const tutorialVideo = document.getElementById("measurement_video");
const measurementList = document.getElementById("measurement_list");
const searchModal = document.getElementById("view_modal");
const searchList = document.getElementById("view_list");
const linkElement = document.querySelector("#measurement_video a");
const closeSearchModal = document.querySelector("#view_modal_img");
searchOpen.onclick = function () {
  searchPage.style.display = "block";
  searchOpen.style.display = "none";
};

close.onclick = function () {
  searchPage.style.display = "none";
  searchOpen.style.display = "block";
};

somethingElse.onclick = function () {
  getRandom();
};

async function getRandom() {
  const random_url = "https://www.themealdb.com/api/json/v1/1/random.php";
  try {
    const response = await fetch(random_url);
    const info = await response.json();
    console.log("info: ", info);

    // Update the correct ID usage here
    specialDishName.textContent = `${info.meals[0].strMeal}`;
    specialDishCategory.textContent = `${info.meals[0].strCategory}`;
    specialDishImage.setAttribute("src", `${info.meals[0].strMealThumb}`);
    instruction_given.textContent = `${info.meals[0].strInstructions}`;
    linkElement.setAttribute("href", `${info.meals[0].strYoutube}`);
    let ingredientsList = document.getElementById("ingrideients");
    ingredientsList.innerHTML = "";

    // Populate the ingredients list
    for (let i = 1; i <= 30; i++) {
      const ingredient = info.meals[0][`strIngredient${i}`];
      if (ingredient) {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        listItem.classList.add("dynamic-list-item");
        ingredientsList.appendChild(listItem);
      } else {
        break;
      }
    }

    measurementList.innerHTML = "";

    for (let j = 1; j <= 30; j++) {
      const measurementmain = info.meals[0][`strMeasure${j}`];
      if (measurementmain) {
        const measurementListCreate = document.createElement("li");
        measurementListCreate.textContent = measurementmain;
        measurementListCreate.classList.add("measurement-item-style");
        measurementList.appendChild(measurementListCreate);
      } else {
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function getMealDetails(mealName) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const data = await res.json();
    // Handle the retrieved data as needed
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function getName(food) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`;
  try {
    const respo = await fetch(url);
    const data = await respo.json();
    console.log("data: ", data);

    const mainContainer = document.querySelector(".whole_container");

    let meals = data.meals;
    let cont = "";
    meals.forEach((el) => {
      cont += `<div class="container">
        <div class="container_image" data-meal-name="${el.strMeal}">
          <img src="${el.strMealThumb}" alt="">
        </div>
        <div class="container_text">
          <p class="h1" id="container_text_food">${el.strMeal}</p>
        </div>
      </div>`;
    });
    mainContainer.innerHTML = cont;

    const containerImages = document.querySelectorAll(".container_image");
  containerImages.forEach((containerImage) => {
    containerImage.addEventListener('click', async (event) => {
      const clickedMealName = event.currentTarget.dataset.mealName;
      searchModal.style.display = "block";

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${clickedMealName}`);
        const data = await response.json();

        const ingredientsList = document.getElementById("view_list_ul");
        ingredientsList.innerHTML = ""; // Clear previous ingredients

        for (let i = 1; i <= 20; i++) {
          const ingredient = data.meals[0][`strIngredient${i}`];
          if (ingredient) {
            const listItem = document.createElement("li");
            listItem.textContent = ingredient;
            ingredientsList.appendChild(listItem);
          } else {
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

    closeSearchModal.addEventListener('click', () => {
      searchModal.style.display = "none";
    });
  } catch (err) {
    console.log(err);
  }
}

dishImage.addEventListener("click", modalView);

function modalView() {
  dishImage.style.display = "none";
  dishName.style.display = "none";
  dishCategory.style.display = "none";
  somethingElse.style.display = "none";
  specialDishText.style.display = "none";
  modalPage.style.display = "block";
}

modalClose.addEventListener("click", modalHide);
function modalHide() {
  dishImage.style.display = "block";
  dishName.style.display = "block";
  dishCategory.style.display = "block";
  somethingElse.style.display = "block";
  specialDishText.style.display = "block";
  modalPage.style.display = "none";
}

measurementButton.addEventListener("click", measurementModalView);
function measurementModalView() {
  dishImage.style.display = "none";
  dishName.style.display = "none";
  dishCategory.style.display = "none";
  somethingElse.style.display = "none";
  specialDishText.style.display = "none";
  modalPage.style.display = "none";
  measurementModalPage.style.display = "block";
}

measurementModalClose.addEventListener("click", measurementModalHide);
function measurementModalHide() {
  dishImage.style.display = "none";
  dishName.style.display = "none";
  dishCategory.style.display = "none";
  somethingElse.style.display = "none";
  specialDishText.style.display = "none";
  modalPage.style.display = "block";
  measurementModalPage.style.display = "none";
}

function getData() {
  var food = document.getElementById("searchBar").value;
  getName(food);
}

function displaying() {
  searchPage.style.display = "none";
  searchOpen.style.display = "block";
  resultPage.style.display = "block";
  spaceDiv.style.display = "block";
}

function calling() {
  getData();
  displaying();
}

SearchButtonMain.addEventListener("click", calling);
getRandom();
