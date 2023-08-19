export interface video {
  _id: string;
  mobile_image: string;
  desktop_image: string;
  title: string;
  icon: string;
  total_clicks: number;
  total_votes: number;
  content_above: string;
  thumbnail: string;
  description: string;
  store: any;
  category: any;
  content_below: any;
}

export interface review {
  _id: string;
  images: [string];
  comment: string;
  user_id: any;
  ratings: number;
  createdAt: any;
}

export interface coupon {
  _id: string;
  mobile_image: string[];
  desktop_image: string[];
  title: string;
  icon: string;
  content_below: any;
  content_above: string;
  affiliate_url: string;
  clicks: number;
  votes: number;
  description: string;
  category: any;
  store: any;
  actual_clicks: number;
  actual_votes: number;
  admin_clicks: number;
  admin_votes: number;
  image_format_mobile: string;
  image_format_desktop: string;
  is_content_above: boolean;
  is_content_below: boolean;
  text: string;
  total_reviews: number;
  coupon_format: string;
}

export interface faqs {
  question: string;
  answer: string;
}
