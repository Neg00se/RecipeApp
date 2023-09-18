import RecipeList from "../components/RecipeList";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Info from "../features/info/Info";
import { useGetRecipesQuery } from "../features/recipes/recipeSlice";
import {
  useGetMealsInfoQuery,
  useGetDifficultiesInfoQuery,
} from "../features/info/infoSlice";

const HomePage = () => {
  useGetMealsInfoQuery("getMealsInfo");
  useGetDifficultiesInfoQuery("getDifficultiesInfo");
  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecipesQuery("getRecipes");

  let content;
  if (isLoading) {
    content = (
      <div className="spinner">
        <h2>Loading</h2>
        <Spinner
          className="ms-2"
          animation="border"
          role="status"
          variant="dark"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <Row>
        <Col md={3} xl={2}>
          <Info />
        </Col>
        <Col md={9} xl={10}>
          <RecipeList recipes={recipes} />
        </Col>
      </Row>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <div>
      <h1>Welcome to Recipe Sharing app</h1>
      <Container className="mt-3">{content}</Container>
    </div>
  );
};

export default HomePage;
