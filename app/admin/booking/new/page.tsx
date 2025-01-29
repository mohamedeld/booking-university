import BookForm from "@/components/admin/BookForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const NewBookingPage = () => {
  return (
    <>
    <Button className="back-btn w-fit" asChild>
      <Link href={"/admin/booking"}>
        Go Back
      </Link>
    </Button>
    <section className="w-full max-w-2xl">
      <BookForm/>
    </section>
      </>
  )
}

export default NewBookingPage