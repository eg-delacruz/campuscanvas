//CLARIFICATIONS:
//1. The strings have to be very specific and unique to avoid conflicts with other queries
const discountKeys = {
  discounts: {},
  cards: {
    show_first_in_all_discounts_count: 'show_card_first_in_all_discounts_count',
    get_mini_cards_searchbar_results: 'get_mini_cards_searchbar_results',
    get_by_category: (category) => `get_cards_by_category_${category}`,
    get_by_discount_id: (discount_id) =>
      `get_card_by_discount_id_${discount_id}`,
  },
  banners: {},
  brands: {
    get_discounts_attached: (brand_id) =>
      `get_discounts_attached_to_brand_${brand_id}`,
  },
  generalKeys: {},
};

export default discountKeys;
