	const formBook = document.getElementById("resetInput");
	const uncompletedContainer = document.getElementById("uncompletedBook");
	const completedContainer = document.getElementById("completedBook");
	const deleteSection = document.querySelector(".deleteSection");
	const buttonSearch = document.getElementById("searchButton");
	const bookItemId = "itemId";

	const createElement = (title, author, year, isCompleted) => {
		let bookTitle, bookAuthor, bookYear, containerBook;

			bookTitle = document.createElement("h3");
			bookTitle.classList.add("itemTask");
			bookTitle.innerText = title;
			bookAuthor = document.createElement("p");
			bookAuthor.classList.add("itemTask");
			bookAuthor.innerText = author;
			bookYear = document.createElement("p");
			bookYear.classList.add("itemTask");
			bookYear.innerText = year;
			containerBook = document.createElement("article");
			containerBook.classList.add("containerBook");
			containerBook.append(bookTitle, bookAuthor, bookYear, showModal());
		
		isCompleted ? containerBook.append(undoButton()) :
			containerBook.append(checkButton());
			return containerBook;
	};

 	const createButton = (classButton, name, ev) => {
		const button = document.createElement("button");
			button.classList.add(classButton);
			button.innerText = name;
			button.addEventListener("click", event => ev(event));
		return button;
  };

	const createSpanDelete = ev => {
		const spanDelete = document.createElement("span");
			spanDelete.classList.add("deleteBtn");
			spanDelete.innerHTML = "&#215";
			spanDelete.addEventListener("click", event => ev(event));
		return spanDelete;
	};

	const showModal = () => createSpanDelete(event =>	deleteTask(event.target.parentElement));		
	
	const undoButton = () => createButton("btnUndo", "undo", event =>	undoTask(event.target.parentElement));
	
	const checkButton = () => createButton("btnFinish", "finish", event => checkTask(event.target.parentElement));

	const addTask = () => {
		const unCompletedCheck = document.getElementById("inputUncompleted").checked;
		const completedCheck = document.getElementById("inputCompleted").checked;
		const bookTitle = document.getElementById("inputBookTitle").value;
		const bookAuthor = document.getElementById("inputBookAuthor").value;
		const bookYear = document.getElementById("inputBookYear").value;
		const appendUncompleted = createElement(bookTitle, bookAuthor, bookYear, false);
		const appendCompleted = createElement(bookTitle, bookAuthor, bookYear, true);
		const dataObjectFalse = idBook(bookTitle, bookAuthor, bookYear, false);
		const dataObjectTrue = idBook(bookTitle, bookAuthor, bookYear, true);
		let checkUncompleted = unCompletedCheck;
		let checkCompleted = completedCheck;

		const checkBox = () => {
			if(checkUncompleted && checkCompleted) {
				appendUncompleted[bookItemId] = dataObjectFalse.id; 
				books.push(dataObjectFalse);
				appendCompleted[bookItemId] = dataObjectTrue.id; 
				books.push(dataObjectTrue);
				uncompletedContainer.append(appendUncompleted);
				completedContainer.append(appendCompleted);
				validStorage();
			} else if (checkUncompleted) {				
				appendUncompleted[bookItemId] = dataObjectFalse.id; 
				books.push(dataObjectFalse);
				uncompletedContainer.append(appendUncompleted);
				validStorage();
			} else if (checkCompleted) {
				appendCompleted[bookItemId] = dataObjectTrue.id; 
				books.push(dataObjectTrue);
				completedContainer.append(appendCompleted);
				validStorage();
			} else {
				alert("you have to fill check box");
			};
		};

		if(bookTitle === "") {
				alert("You must define book title");
		} else {
			checkBox();
		};
		
	};

	const deleteTask = (task) => {
		const divContainer = document.createElement("div");
			divContainer.classList.add("divContainerDelete");

		const div = document.createElement("div");
			div.classList.add("divDelete");

		const p = document.createElement("p");
			p.classList.add("attention");
			p.innerText = `Are you sure want to delete this item ?`;

		const btnCancel = document.createElement("button");
			btnCancel.classList.add("btnCancel");
			btnCancel.innerText = "Cancel";
			btnCancel.addEventListener("click", cancelModal);

		const btnDelete = document.createElement("button");
			btnDelete.classList.add("btnDelete");
			btnDelete.innerText = "Delete";
			btnDelete.addEventListener("click", () => {
				const deleteBook = findBookIndex(task[bookItemId]);
				books.splice(deleteBook, 1);
				task.remove();
				validStorage();
				return cancelModal();
			});

		div.append(p, btnCancel, btnDelete);
		divContainer.appendChild(div);
		deleteSection.appendChild(divContainer);
	};

	const cancelModal = () => {
		const d = document.querySelector(".divContainerDelete");
			d.remove();
	};

	const checkTask = taskElement => {
		const firstElement = taskElement.querySelectorAll(".itemTask")[0].innerText;
		const secondElement = taskElement.querySelectorAll(".itemTask")[1].innerText;
		const lastElement = taskElement.querySelectorAll(".itemTask")[2].innerText;
		const newElement = createElement(firstElement, secondElement, lastElement, true);
		const newBook = findBooks(taskElement[bookItemId]);
			newBook.isCompleted = true;
			newElement[bookItemId] = book.id;
			completedContainer.append(newElement);
			taskElement.remove();
			validStorage();
	};

	const undoTask = taskElement => {
		const firstElement = taskElement.querySelectorAll(".itemTask")[0].innerText;
		const secondElement = taskElement.querySelectorAll(".itemTask")[1].innerText;
		const lastElement = taskElement.querySelectorAll(".itemTask")[2].innerText
		const newElement = createElement(firstElement, secondElement, lastElement, false);
		const newBook = findBooks(taskElement[bookItemId]);
			newBook.isCompleted = false;
			newElement[bookItemId] = book.id;
			uncompletedContainer.append(newElement);
			taskElement.remove();
			validStorage();
	};

	buttonSearch.addEventListener("click", ev => {
		ev.preventDefault();
		const searchInput = document.getElementById("searchInput").value.toUpperCase();
		const task = document.querySelectorAll(".containerBook");

		for(let i of task) {
			const reduceTask = i.firstElementChild.textContent.toUpperCase();
			if(reduceTask.indexOf(searchInput) > -1) {
				i.style.display = "";
			} else {
				i.style.display = "none";
			};
		};
	
		document.getElementById("searchInputReset").reset();
 });

	document.addEventListener("DOMContentLoaded",() => {
		formBook.addEventListener("submit", event => {
			event.preventDefault();
			addTask();
			document.getElementById("resetInput").reset();
		});

		loadBook();
	});

	document.addEventListener("loadDataServer", () => refreshDataBooks());
 	
	