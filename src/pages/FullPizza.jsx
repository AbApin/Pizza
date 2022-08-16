import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Skeleton';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const typeNames = ['тонкое', 'традиционное'];

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62cbddfba080052930a03320.mockapi.io/items/' + id);
        setPizza(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <img src={pizza.imageUrl} alt="" />
        <h2>{pizza.name}</h2>
        <p>{typeNames[pizza.types]}</p>
        <h4>{pizza.price}</h4>
      </div>
    </div>
  );
};

export default FullPizza;
