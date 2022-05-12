import { useEffect, useState } from 'react';
import { storefront } from '@services/storefront';

//Styles
import styles from '@pagestyles/student/CampusBox.module.scss';

const CampusBox = () => {
  const [product, setProduct] = useState({});
  const [state, setState] = useState({
    loading: false,
    error: '',
  });

  const id = 'gid://shopify/Product/7509431713980';

  const REQUIRED_BOX_DATA = `
  query Produc{
    product(id:"${id}"){
      title
      handle
      description
      totalInventory
      images(first:5){
        edges{
          node{
            url
            altText
          }
        }
      }
    }
  }
  `;

  async function fetchData() {
    setState({ ...state, loading: true });
    const response = await storefront(REQUIRED_BOX_DATA);
    setProduct(response);
    setState({ ...state, loading: false });
  }

  useEffect(() => {
    try {
      if (Object.keys(product).length === 0) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false, error: error });
    }
  }, []);

  return (
    <div>
      <h1>Component Template</h1>
    </div>
  );
};

export default CampusBox;
