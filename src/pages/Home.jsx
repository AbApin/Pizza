import React, { useRef } from 'react';
import qs from 'qs';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, pizzaDataSelector } from '../redux/slices/pizzaSlice';

function Home() {
  // redux
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const skeletons = [...new Array(6)].map(() => <Skeleton key={crypto.randomUUID()} />);
  const pizzasArray = items.map((pizza) => (
    <Link to={`./pizza/${pizza.id}`} key={crypto.randomUUID()}>
      <PizzaBlock pizza={pizza} />
    </Link>
  ));

  // navigate
  const navigate = useNavigate();

  const onClickCategoryItem = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePageCount = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId === 0 ? '' : `category=${categoryId}`;
    const order = sort.sortBy.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortBy.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // Esli izmenenili parametri i bil pervi render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortBy,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortBy, searchValue, currentPage]);

  // Esli bil pervi render,to proveryayem Url-parametri i soxranyayem v redukse
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortBy === params.sortBy);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  // Esli bil pervi render to poluchayem pitci
  React.useEffect(() => {
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortBy, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategoryItem={onClickCategoryItem} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>
              Произошла ошибка <icon>😕</icon>
            </h2>
            <p>Не удалось получить пиццы</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzasArray}</div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePageCount} />
      </div>
    </>
  );
}

export default Home;
