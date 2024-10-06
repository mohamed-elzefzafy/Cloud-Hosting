"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";


const SearchArticleInput = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();



const formSubmitHandler = (e : FormEvent) => {
e.preventDefault();

router.push(`articles/search?searchText=${searchText}`);
}
  return (
    <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
      <input
        className="w-full border-none rounded p-3 text-xl text-gray-900"
        type="search"
        placeholder="Search for aeticles"
        value={searchText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchArticleInput;
