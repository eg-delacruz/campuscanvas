const adminKeys = {
  admin_settings: 'admin_settings',
  check_if_pending_validations_available:
    'check_if_pending_validations_available',
  all_admin_users: 'all_admin_users',
  discounts: {
    most_liked_discounts_data: 'most_liked_discounts_data',
    most_disliked_discounts_data: 'most_disliked_discounts_data',
    all_discounts: 'all_discounts',
  },
  brands: {
    all_brands: 'all_brands',
  },
  homeBanner: {
    getHomeSliderBannersInfo: 'getHomeSliderBannersInfo',
    getHomeBannerByDiscountId: (discountId) =>
      `getHomeBannerByDiscountId_${discountId}`,
  },
  //////////////////Student//////////////////
  students: {
    get_verified_students_count: 'get_verified_students_count',
    unhandled_stu_emails_list: 'unhandled_stu_emails_list',
    get_verified_students: 'get_verified_students',
  },
};

export default adminKeys;
