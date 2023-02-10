import React from "react";
import axios from "axios";
import qs from 'qs'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PIzzaBlock";
import Skeleton from "../components/PIzzaBlock/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const navigate = useNavigate(true);
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  ;

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

const onChangePage = number => {
  dispatch(setCurrentPage(number));  
}

const fetchPizzas = () => {
  setIsLoading(true);
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  axios
    .get(
      `https://6311cd0af5cba498da85c7e3.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    .then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
  


}

// Если изменили параметры и был первый рендер
React.useEffect(() => {
  if (isMounted.current) {
    const querryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    })
    
    navigate(`?${querryString}`);
  }
  isMounted.current = true;
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [categoryId, sort.sortProperty, currentPage])

// Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find(obj => obj.sortProperty === params.sortProperty)
      
      dispatch(setFilters({...params,
        sort, 
      })
      );
      isSearch.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Если был 1 рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
   
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  

  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
