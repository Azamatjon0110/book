AOS.init();
const elForm = document.querySelector('.js-form');
const elInput = elForm.querySelector('.js-title');
const sortSelect = elForm.querySelector('.sort-select');
const minYearInput = elForm.querySelector('.js-year-min');
const maxYearInput = elForm.querySelector('.js-year-max');
const author = elForm.querySelector('.js-author');
const languageSelect = elForm.querySelector('.sort-languages');
const deleteBtn = document.querySelector('.delete');
const bookMarkList = document.querySelector('.save-books');
const bookList = document.querySelector('.result-box');
const bookTemp = document.querySelector('.book-template').content;
const bookListTemp = document.querySelector('.bookmark-template').content;
const fragment = new DocumentFragment();

function languageFunction(languageArray) {
	const languageFrag = new DocumentFragment();
	const language = [new Set(languageArray.language)];
	languageArray.forEach((element) => {
		if (!language.includes(element.language)) {
			console.log(element);
			language.push(element.language);
		}
	});
	// language

	language.sort();
	language.forEach((title) => {
		const selectOption = document.createElement('option');
		selectOption.textContent = title;
		languageFrag.appendChild(selectOption);
		languageSelect.appendChild(languageFrag);
	});
}

languageFunction(books);

function renderBook(array, list, regex = '') {
	list.innerHTML = null;
	array.forEach((elem) => {
		const templateBook = bookTemp.cloneNode(true);
		templateBook.querySelector('.book-img').src = elem.imageLink;
		templateBook.querySelector('.book-img').alt = elem.title;
		if (regex.source != '(?:)' && regex) {
			templateBook.querySelector('.book-title').innerHTML = elem.title.replace(
				regex,
				`<mark class="bg-warning">${regex.source}</mark>`
			);
		} else {
			templateBook.querySelector('.book-title').textContent = elem.title;
		}
		templateBook.querySelector('.book-year').textContent = elem.year;
		templateBook.querySelector('.book-page').textContent = elem.pages;
		templateBook.querySelector('.book-lang').textContent = elem.language;
		templateBook.querySelector('.js-author-text').textContent = elem.author;
		templateBook.querySelector('.more-info').href = elem.link;
		templateBook.querySelector('.add-bookmark').dataset.id = elem.link;
		fragment.appendChild(templateBook);
	});
	list.appendChild(fragment);
}

function renderBookList(array, list) {
	list.innerHTML = null;
	array.forEach((elem) => {
		const templateBook = bookListTemp.cloneNode(true);
		templateBook.querySelector('.book-img').src = elem.imageLink;
		templateBook.querySelector('.book-img').alt = elem.title;
		templateBook.querySelector('.book-title').textContent = elem.title;
		templateBook.querySelector('.more-info').href = elem.link;
		console.log(elem.link);
		templateBook.querySelector('.delete-bookmark').dataset.id = elem.link;
		fragment.appendChild(templateBook);
	});
	list.appendChild(fragment);
}

function sortBooks(arr, formSelectValue) {
	if (formSelectValue === 'a-z') {
		arr.sort((a, b) => {
			if (a.Title > b.Title) {
				return 1;
			} else if (a.title < b.title) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	if (formSelectValue === 'z-a') {
		arr.sort((a, b) => {
			if (a.title > b.title) {
				return -1;
			} else if (a.Title < b.Title) {
				return 1;
			} else {
				return 0;
			}
		});
	}
	if (formSelectValue === 'oldest') {
		arr.sort((a, b) => {
			if (Number(a.year) > Number(b.year)) {
				return 1;
			} else if (Number(a.year) < Number(b.year)) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	if (formSelectValue === 'latest') {
		arr.sort((a, b) => {
			if (Number(a.year) > Number(b.year)) {
				return -1;
			} else if (Number(a.year) < Number(b.year)) {
				return 1;
			} else {
				return 0;
			}
		});
	}
	if (formSelectValue === 'pageless') {
		arr.sort((a, b) => {
			if (Number(a.pages) > Number(b.pages)) {
				return 1;
			} else if (Number(a.pages) < Number(b.pages)) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	if (formSelectValue === 'much-page') {
		arr.sort((a, b) => {
			if (Number(a.pages) > Number(b.pages)) {
				return -1;
			} else if (Number(a.pages) < Number(b.pages)) {
				return 1;
			} else {
				return 0;
			}
		});
	}
}

function filteredArray(regex) {
	const filteredArray = books.filter((item) => {
		return (
			item.title.toString().match(regex) &&
			(minYearInput.value == '' || Number(minYearInput.value) <= item.year) &&
			(maxYearInput.value == '' || Number(maxYearInput.value) >= item.year) &&
			(author.value == '' ||
				item.author
					.toLowerCase()
					.includes(author.value.trim().toLowerCase())) &&
			(languageSelect.value == '' || item.language == languageSelect.value)
		);
	});
	return filteredArray;
}

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const inputValue = elInput.value.trim();
	const regex = new RegExp(inputValue, 'gi');
	const filterArray = filteredArray(regex);

	if (filteredArray.length > 0) {
		sortBooks(filterArray, sortSelect.value);
		renderBook(filterArray, bookList, regex);
	} else {
		bookList.innerHTML = 'Book not found!!!';
	}
});

booksListArray = [];
bookList.addEventListener('click', (evt) => {
	if (evt.target.matches('.add-bookmark')) {
		const addbtn = evt.target.dataset.id;
		const addobj = books.find((item) => item.link == addbtn);
		if (!booksListArray.includes(addobj)) {
			booksListArray.push(addobj);
			renderBookList(booksListArray, bookMarkList);
		}
	}
});

bookMarkList.addEventListener('click', (evt) => {
	if (evt.target.matches('.delete-bookmark')) {
		const addbtn = evt.target.dataset.id;
		console.log(addbtn);
		const addobj = booksListArray.findIndex((item) => item.link == addbtn);
		booksListArray.splice(addobj, 1);
		renderBookList(booksListArray, bookMarkList);
	}
});

renderBook(books, bookList);
