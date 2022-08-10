import { book } from "./book.model";

export class BooksMock {

    private _defaultBook: book = {
        ISBN: '',
        title: '',
        author:'',
        year:0,
        numberOfPages: 0
    }

    public withCustomISBN(ISBN: string): BooksMock{
        this._defaultBook.ISBN = ISBN;
        return this;
    }

    public withCustomTitle(title: string): BooksMock{
        this._defaultBook.title = title;
        return this;
    }

    public withCustomAuthor(author: string): BooksMock{
        this._defaultBook.author = author;
        return this;
    }

    public withCustomYear(year: number): BooksMock{
        this._defaultBook.year = year;
        return this;
    }

    public Model(): book {
        return this._defaultBook;
    }




}