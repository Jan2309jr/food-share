export interface FoodListing {
  id: string;
  title: string;
  description: string;
  foodType: string;
  quantity: string;
  donor: string;
  donorType: "restaurant" | "event" | "individual";
  location: string;
  area: string;
  pickupTime: string;
  expiresAt: string;
  image: string;
  claimed: boolean;
  urgent: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export const sampleListings: FoodListing[] = [
  {
    id: "1",
    title: "Fresh Biryani - 50 servings",
    description: "Leftover catering biryani from a corporate event. Freshly prepared today, vegetarian and non-veg available.",
    foodType: "Indian",
    quantity: "50 servings",
    donor: "Meghana Foods",
    donorType: "restaurant",
    location: "Yelahanka New Town, Bangalore",
    area: "Yelahanka",
    pickupTime: "Today, 3:00 PM - 5:00 PM",
    expiresAt: "Today, 6:00 PM",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    claimed: false,
    urgent: true,
  },
  {
    id: "2",
    title: "Assorted Sandwiches & Wraps",
    description: "Fresh sandwiches and wraps from today's lunch service. Mix of veg and chicken options.",
    foodType: "Continental",
    quantity: "30 pieces",
    donor: "Cafe Azzure",
    donorType: "restaurant",
    location: "Sahakara Nagar, Bangalore",
    area: "Sahakara Nagar",
    pickupTime: "Today, 4:00 PM - 6:00 PM",
    expiresAt: "Today, 8:00 PM",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
    claimed: false,
    urgent: false,
  },
  {
    id: "3",
    title: "Wedding Buffet Surplus",
    description: "Variety of dishes from a wedding reception: rice, dal, paneer, rotis, and desserts.",
    foodType: "Indian",
    quantity: "100+ servings",
    donor: "Grand Palace Convention",
    donorType: "event",
    location: "Jakkur, Bangalore",
    area: "Jakkur",
    pickupTime: "Today, 10:00 PM - 11:30 PM",
    expiresAt: "Tomorrow, 6:00 AM",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
    claimed: false,
    urgent: true,
  },
  {
    id: "4",
    title: "Fresh Idli & Dosa Batter",
    description: "Excess batter prepared for weekend rush. Can make approximately 200 idlis or 100 dosas.",
    foodType: "South Indian",
    quantity: "10 kg batter",
    donor: "Vidyarthi Bhavan Branch",
    donorType: "restaurant",
    location: "Yelahanka Old Town, Bangalore",
    area: "Yelahanka",
    pickupTime: "Tomorrow, 7:00 AM - 9:00 AM",
    expiresAt: "Tomorrow, 12:00 PM",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    claimed: false,
    urgent: false,
  },
  {
    id: "5",
    title: "Bakery Items - Bread & Pastries",
    description: "Day-old breads, croissants, muffins, and pastries. Still fresh and delicious.",
    foodType: "Bakery",
    quantity: "40 items",
    donor: "Oven Fresh Bakery",
    donorType: "restaurant",
    location: "Kogilu, Bangalore",
    area: "Kogilu",
    pickupTime: "Tomorrow, 8:00 AM - 10:00 AM",
    expiresAt: "Tomorrow, 6:00 PM",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    claimed: false,
    urgent: false,
  },
  {
    id: "6",
    title: "Dal & Rice Combo - 80 packs",
    description: "Packed dal rice from corporate cafeteria. Hygienically packed in individual containers.",
    foodType: "Indian",
    quantity: "80 packs",
    donor: "TCS Cafeteria",
    donorType: "event",
    location: "Thanisandra, Bangalore",
    area: "Thanisandra",
    pickupTime: "Today, 2:30 PM - 4:00 PM",
    expiresAt: "Today, 7:00 PM",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
    claimed: true,
    urgent: false,
  },
  {
    id: "7",
    title: "Fresh Fruit & Juice Surplus",
    description: "Excess fruits and freshly squeezed juices from a health camp. Oranges, apples, bananas.",
    foodType: "Fruits",
    quantity: "25 kg fruits + 20L juice",
    donor: "Apollo Clinic Yelahanka",
    donorType: "event",
    location: "Yelahanka, Bangalore",
    area: "Yelahanka",
    pickupTime: "Today, 5:00 PM - 7:00 PM",
    expiresAt: "Tomorrow, 8:00 AM",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400",
    claimed: false,
    urgent: false,
  },
  {
    id: "8",
    title: "Pizza & Pasta - Party Leftovers",
    description: "Untouched pizzas and pasta from a birthday party. Multiple flavors available.",
    foodType: "Italian",
    quantity: "15 pizzas, 10 pasta trays",
    donor: "Pizza Hut Yelahanka",
    donorType: "restaurant",
    location: "Yelahanka New Town, Bangalore",
    area: "Yelahanka",
    pickupTime: "Today, 9:00 PM - 10:30 PM",
    expiresAt: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    claimed: false,
    urgent: true,
  },
  {
    id: "9",
    title: "Chole Bhature & Puri Sabzi",
    description: "Surplus from weekend special menu. Freshly made chole bhature and puri sabzi.",
    foodType: "North Indian",
    quantity: "60 servings",
    donor: "Punjab Grill Express",
    donorType: "restaurant",
    location: "Hebbal, Bangalore",
    area: "Hebbal",
    pickupTime: "Today, 1:00 PM - 3:00 PM",
    expiresAt: "Today, 5:00 PM",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400",
    claimed: false,
    urgent: true,
  },
  {
    id: "10",
    title: "Mixed Rice Varieties",
    description: "Lemon rice, tamarind rice, and coconut rice prepared for a temple event.",
    foodType: "South Indian",
    quantity: "70 servings",
    donor: "Sri Venkateshwara Temple",
    donorType: "event",
    location: "Allalasandra, Bangalore",
    area: "Allalasandra",
    pickupTime: "Today, 12:00 PM - 2:00 PM",
    expiresAt: "Today, 4:00 PM",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400",
    claimed: false,
    urgent: false,
  },
  {
    id: "11",
    title: "Chapati & Curry - 45 servings",
    description: "Fresh chapatis with mixed vegetable curry. From Annapurna Meals catering service.",
    foodType: "Indian",
    quantity: "45 servings",
    donor: "Annapurna Meals",
    donorType: "restaurant",
    location: "Bagalur, Bangalore",
    area: "Bagalur",
    pickupTime: "Today, 7:00 PM - 9:00 PM",
    expiresAt: "Tomorrow, 6:00 AM",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    claimed: false,
    urgent: false,
  },
  {
    id: "12",
    title: "Sweets & Snacks Box",
    description: "Assorted Indian sweets and snacks from a Diwali celebration. Ladoo, barfi, mixture, murukku.",
    foodType: "Sweets",
    quantity: "50 boxes",
    donor: "Infosys Recreation Club",
    donorType: "event",
    location: "Hebbal, Bangalore",
    area: "Hebbal",
    pickupTime: "Tomorrow, 10:00 AM - 12:00 PM",
    expiresAt: "Day after tomorrow",
    image: "https://images.unsplash.com/photo-1666190440431-2f19198c30f5?w=400",
    claimed: false,
    urgent: false,
  },
];


export const stats = {
  mealsServed: 15420,
  foodSavedKg: 8750,
  activeDonors: 142,
  citiesCovered: 3,
};

export const foodTypes = ["All", "Indian", "South Indian", "North Indian", "Continental", "Italian", "Bakery", "Fruits", "Sweets"];
export const areas = ["All Areas", "Yelahanka", "Sahakara Nagar", "Jakkur", "Kogilu", "Thanisandra", "Hebbal", "Allalasandra", "Bagalur"];
