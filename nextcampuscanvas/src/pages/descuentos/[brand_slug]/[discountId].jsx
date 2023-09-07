import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import DiscountTemplate from '@components/UsedInSpecificRoutes/Descuentos/DiscountTemplate/DiscountTemplate.jsx';
import DiscountDisplayerBtn from '@components/UsedInSpecificRoutes/Descuentos/DiscountDisplayerBtn/DiscountDisplayerBtn.jsx';

//Assets
import edit_pencil from '@assets/GeneralUse/IconsAndButtons/edit_pencil.svg';

//Styles
import styles from '@styles/pagestyles/descuentos/DisplayDiscount.module.scss';

//Endpoints
import endPoints from '@services/api/index';

//Hooks
import useDisplayIfAdmin from '@hooks/useDisplayIfAdmin';

//Services
import axiosFetcher from '@services/axiosFetcher';

const Discount = ({ discount }) => {
  const { allowDisplay } = useDisplayIfAdmin('all');

  useEffect(() => {
    const callbackURL = sessionStorage.getItem('callbackURL');
  }, []);

  return (
    <>
      <SEOHeader
        tabTitle={discount.SEO_meta_title}
        metaName={discount.SEO_meta_title}
        description={discount.description}
      />

      <Layout>
        {/* Edit icon if user is an admin */}
        {allowDisplay && (
          <Link
            href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${discount._id}`}
          >
            <div className={styles.edit_icon_container}>
              <div className={styles.icon}>
                <Image src={edit_pencil} />
              </div>
            </div>
          </Link>
        )}
        <DiscountTemplate discount={discount}>
          <DiscountDisplayerBtn discount={discount} />
        </DiscountTemplate>
      </Layout>
    </>
  );
};

export default Discount;

//Pre-render these paths when building the app and fallback: 'blocking' to build new added discounts on demand in production.
export async function getStaticPaths() {
  const response = await axiosFetcher({
    url: endPoints.discounts.getCards,
    method: 'get',
    extraHeaders: { required_cards: 'all_available', page: 1, limit: 2000 },
  });

  const paths = response.body.cards.map((card) => ({
    params: {
      brand_slug: card.brand_slug.brand_slug,
      discountId: card._id,
    },
  }));

  return {
    paths,
    // true | false | blocking
    // true: Si no fue pre-renderizado en getStaticPaths, lo renderiza en el client, con lo cual podemos mostrar un estado de carga en el cliente con router.isFallback (lo cual vendría siendo como un estado de cargando)
    // false: Si no fue pre-renderizado en getStaticPaths, muestra un 404
    // blocking: Si no fue pre-renderizado en getStaticPaths, renderiza en el server
    fallback: 'blocking',
  };
}

//Pre-render the discount with the id passed in the path
export async function getStaticProps({ params }) {
  //with the optional chaining, since params could be undefined
  const brand_slug = params?.brand_slug;
  const discountId = params?.discountId;

  //Necesitamos que sea un string, pues puede venir un array o undefined, dependiendo de cuántos parámetros ponemos en el slug separados por un /, o si directamente no ponemos nada. (Creo)
  if (typeof discountId !== 'string' || typeof brand_slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const response = await axiosFetcher({
    url: endPoints.discounts.getDiscountById(discountId),
    method: 'get',
  });

  if (response.error || response.body.status === 'unavailable') {
    return {
      notFound: true,
    };
  }

  //If the brand_slug in the url doesn't match the brand_slug in the discount, redirect to the correct url
  if (response.body.brand.brand_slug !== brand_slug) {
    return {
      redirect: {
        destination: `/descuentos/${response.body.brand.brand_slug}/${discountId}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      //Should be returned like this to avoid errors on next js production build
      discount: response?.body || null,
    },
  };
}
