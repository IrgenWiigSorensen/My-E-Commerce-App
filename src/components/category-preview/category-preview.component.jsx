import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading } from '../../store/categories/category.selector'

import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component'
import './category-preview.styles.scss'

const CategoryPreview = ( {title, products} ) => {

  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <div className='category-preview-container'>
      {
        isLoading ? (
          <Spinner /> 
        ) : (
        <>
          <h2>
            <Link className='title' to={title}>{title.toUpperCase()}</Link>
          </h2>
          <div className='preview'>
            {products
              .filter((_, idx) => idx < 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </>)
      }
    </div>
   )
};

export default CategoryPreview;