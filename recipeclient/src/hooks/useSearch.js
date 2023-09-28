import { useSelector } from "react-redux";
import { selectSearchQuery } from "../features/search/searchSlice";
import { useMemo } from "react";

const useSearch = (recipes) => {
  const searchQuery = useSelector(selectSearchQuery);

  const searchResults = useMemo(() => {
    if (searchQuery) {
      return recipes.ids.filter(
        (id) =>
          recipes.entities[id].title.toLowerCase().includes(searchQuery) ||
          recipes.entities[id].description.toLowerCase().includes(searchQuery)
      );
    }
    return recipes.ids;
  }, [searchQuery]);

  return searchResults;
};

export default useSearch;
