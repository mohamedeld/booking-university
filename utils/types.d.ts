export interface IBook{
  id:string;
  title:string;
  author:string;
  genre:string;
  rating:number;
  totalCopies:number;
  availableCopies:number;
  description:string;
  coverColor:string;
  coverUrl:string;
  videoUrl:string;
  summary:string;
  createdAt:Date | null;
  isLoanedBook?:boolean;
  
}

export interface AuthCredentiasl {
  fullName:string;
  email:string;
  password:string;
  universityId:number;
  universityCard:string;
  
}

export interface BookParams{
  title:string;
  author:string;
  genre:string;
  rating:number;
  coverUrl:string;
  coverColor:string;
  description:string;
  summary:string;
  totalCopies:number;
  videoUrl:string;
}

export interface BookBorrow{
  bookId: string;
  userId: string;
}