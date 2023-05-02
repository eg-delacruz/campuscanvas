const discountKeys = {
  discounts: {},
  cards: {
    show_first_in_all_discounts_count: 'show_first_in_all_discounts_count',
    get_mini_cards_searchbar_results: 'get_mini_cards_searchbar_results',
    get_by_category: (category) => `get_by_category_${category}`,
  },
  banners: {},
  brands: {
    get_discounts_attached: (brand_id) =>
      `get_discounts_attached_to_brand_${brand_id}`,
  },
  generalKeys: {},
};

export default discountKeys;
