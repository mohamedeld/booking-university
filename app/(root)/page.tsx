import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]}/>

      <BookList/>
    </>
  );
}
