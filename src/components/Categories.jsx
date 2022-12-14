import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (index) => {
    setActiveCategory(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={activeCategory === i ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
