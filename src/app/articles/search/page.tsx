
interface IProps {
  searchParams :  {
    searchText : string;
  }
}
const SearchArticlePage = ({searchParams : {searchText}} : IProps) => {
  console.log(searchText);
  
  return (
    <section className="fixed-height container m-auto px-5">
   <h1 className="text-2xl font-bold">
    Search text is : {searchText}
    </h1>    

</section>

  )
}

export default SearchArticlePage;