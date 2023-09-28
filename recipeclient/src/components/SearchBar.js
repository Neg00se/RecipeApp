import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchQueryChange } from "../features/search/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    dispatch(searchQueryChange(query));
  };

  return (
    <Form className="d-flex mx-md-5" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={(e) =>
          e.target.value
            ? setQuery(e.target.value)
            : dispatch(searchQueryChange(""))
        }
      />
      <Button variant="outline-success" onClick={handleSearchChange}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
