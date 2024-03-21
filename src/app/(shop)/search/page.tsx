import { getProductByName } from "@/actions";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import {SearchInput} from "./ui/SearchInput";

interface Props {}

const SearchPage: NextPage<Props> = async({}) => {
   return (
      <div>
         <h1>Search page</h1>
         <SearchInput  />
      </div>
   );
};

export default SearchPage;
