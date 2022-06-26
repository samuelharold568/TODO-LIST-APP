	const storageKey = "MY_STORAGE";
	let books = [];
	
	const validStorage = () => {
		if(typeof(Storage) !== undefined) {
			const dataServer = JSON.stringify(books);
				localStorage.setItem(storageKey, dataServer);
				document.dispatchEvent(new Event("sentDataServer"));
		} else {
			alert("your Browser is not support Storage");
		};
	};

	const loadBook = () => {
		const getDataServer = localStorage.getItem(storageKey);
		let newDataServer = JSON.parse(getDataServer);
		
		if(newDataServer != null) {
			books = newDataServer;
		};		
		document.dispatchEvent(new Event("loadDataServer"));
	};

	function idBook(title, author, year, isCompleted) {
		return {
			id: +new Date(),
			title,
			author,
			year,
			isCompleted
		};
	};

	const findBooks = bookId => {
		for(book of books) {
			if(book.id === bookId) 
				return book;		
		};		
		return null;
	};

	const findBookIndex = bookId => {
		let index = 0;
		
		for(book of books) {
			if(book.id === bookId) {
				return index;
			};		
			index++;
		};
		return -1;
	};

	const refreshDataBooks = () => {
		const unCompletedBook = document.getElementById("uncompletedBook");
		const completedBook = document.getElementById("completedBook");

		for(book of books) {
			const newBook = createElement(book.title, book.author, book.year, book.isCompleted);
				newBook[bookItemId] = book.id;

			if(book.isCompleted) {
				completedBook.append(newBook);
			} else {
				unCompletedBook.append(newBook);
			};
		};
	};
