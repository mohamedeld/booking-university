import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface IProps{
  params:Promise<{
    id:string;
  }>
}
const BookDetailPage = async ({params}:IProps) => {
  const session =await auth();
  const {id} = await params;
  const [bookingDetails] = await db.select().from(books).where(eq(books?.id,id)).limit(1);
  if(!bookingDetails){
    return notFound();
  }
  return (
    <>
      <BookOverview props={bookingDetails} userId={session?.user?.id as string}/>
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            {/* video   */}
            <BookVideo videoUrl={bookingDetails?.videoUrl}/>
          </section>
          <section className="mb-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-10 text-xl text-light-100">
              {bookingDetails?.summary?.split('\n')?.map((line,index)=>{
                return <p key={index}>{line}</p>
              })}
            </div>
          </section>

        </div>
        {/* similar */}
      </div>
    </>
  )
}

export default BookDetailPage