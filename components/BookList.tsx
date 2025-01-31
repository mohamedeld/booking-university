import { IBook } from "@/utils/types";
import BookCard from "./BookCard";

interface IProps{
  title:string;
  books:IBook[];
  containerClassName?:string;
}

const BookList = ({title,books,containerClassName}:IProps) => {
  if(books?.length < 2 ){
    return;
  }
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <div className="book-list">
        { books?.map(book=>(
          <BookCard key={book?.title} {...book}/>
        ))}
      </div>
    </section>
  )
}

export default BookList