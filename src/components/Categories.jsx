import React from 'react';

function Categories({value,onChangeCategoryItem}) {

  const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((category, index) => {
          return (
            <li
              className={value === index ? 'active' : ''}
              onClick={() => onChangeCategoryItem(index)}
              key={index + crypto.randomUUID()}
              >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
