"use client";
import { ChangeEvent, FormEvent, useState } from "react";


const SearchArticleInput = () => {
  const [searchInputText, setSearchInputText] = useState("");



const formSubmitHandler = (e : FormEvent) => {
e.preventDefault();

console.log({searchInputText});

}
  return (
    <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
      <input
        className="w-full border-none rounded p-3 text-xl text-gray-900"
        type="search"
        placeholder="Search for aeticles"
        value={searchInputText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInputText(e.target.value)}
      />
    </form>
  );
};

export default SearchArticleInput;
