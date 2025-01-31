interface IProps{
  params:Promise<{
    id:string;
  }>
}
const BookDetailPage = async ({params}:IProps) => {
  const {id} = await params;
  
  return (
    <div>BookDetailPage</div>
  )
}

export default BookDetailPage