const elForm  = document.querySelector(".js-form");
const elInput = elForm.querySelector(".js-title");
const sortSelect = elForm.querySelector(".sort-select");
const minYearInput = elForm.querySelector(".js-year-min");
const maxYearInput = elForm.querySelector(".js-year-max");
const bookList = document.querySelector(".result-box");
const bookTemp = document.querySelector(".book-template").content;
const fragment = new DocumentFragment();

const bookArray = [];



function renderBook (array, list, regex = ""){
  list.innerHTML = null;
  array.forEach(elem => {
    const templateBook = bookTemp.cloneNode(true);
    templateBook.querySelector(".book-img").src = elem.imageLink;
    templateBook.querySelector(".book-img").alt = elem.title;
    if(regex.source != "(?:)" && regex){
      templateBook.querySelector(".book-title").innerHTML = elem.title.replace(regex,
        `<mark class="bg-warning">${regex.source}</mark>`);
      }else{
        templateBook.querySelector(".book-title").textContent = elem.title;
      }
      templateBook.querySelector(".book-year").textContent = elem.year;
      templateBook.querySelector(".book-page").textContent = elem.pages;
      templateBook.querySelector(".book-lang").textContent = elem.language;
      templateBook.querySelector(".more-info").src = elem.link;
      fragment.appendChild(templateBook);
    })
    list.appendChild(fragment);
  }

  function sortBooks( arr,formSelectValue){
    if(formSelectValue === "a-z"){
      arr.sort((a,b)=>{
        if (a.Title > b.Title){
          return 1
        }
        else if(a.title < b.title){
          return -1
        }else{
          return 0
        }
      })
    };
    if(formSelectValue === "z-a"){
      arr.sort((a,b)=>{
        if (a.title > b.title){
          return -1
        }
        else if(a.Title < b.Title){
          return 1
        }else{
          return 0
        }
      })
    };
    if(formSelectValue === "oldest"){
      arr.sort((a,b)=>{
        if (Number(a.year) > Number(b.year)){
          return 1
        }
        else if(Number(a.year) < Number(b.year)){
          return -1
        }else{
          return 0
        }
      })
    };
    if(formSelectValue === "latest"){
      arr.sort((a,b)=>{
        if (Number(a.year) > Number(b.year)){
          return -1
        }
        else if(Number(a.year) < Number(b.year)){
          return 1
        }else{
          return 0
        }
      })
    };
  }


  function filteredArray (regex){
    const filteredArray = books.filter(item => {
      return (item.title.toString().match(regex)) && (minYearInput.value == "" || Number(minYearInput.value) <= item.year) && (maxYearInput.value == "" || Number(maxYearInput.value) >= item.year)
    })
    return filteredArray
  }


  elForm.addEventListener("submit", evt =>{
    evt.preventDefault();
    const inputValue = elInput.value.trim();
    const regex = new RegExp(inputValue, "gi");
    const filterArray = filteredArray(regex);

    if(filteredArray.length > 0){
      sortBooks(filterArray, sortSelect.value)
      renderBook(filterArray, bookList, regex);
    }else{
      bookList.innerHTML = "Book not found!!!"
    }
  })





  renderBook(books.slice(0,24), bookList)