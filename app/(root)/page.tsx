import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { IBook  } from "@/utils/types";


import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth();
  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books?.createdAt))) as IBook[]
  return (
    <>
      <BookOverview props={latestBooks[0]} userId={session?.user?.id as string}/>

      <BookList
        title="Latest Books"
        books={latestBooks?.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
