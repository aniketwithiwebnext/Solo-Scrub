import { Product, Review } from "./types";
// @ts-ignore
import shieldImage from "./assets/images/solo_scrub_shield_1780348568949.png";

export const PRODUCTS: Product[] = [
  {
    id: "solo-scrub-comfort",
    sku: "SS-COMFORT-01",
    name: "COMFORT",
    fullName: "SOLO SCRUB COMFORT",
    tagline: "Caregiving Made Gentler.",
    price: 18.99,
    rating: 4.9,
    reviewsCount: 148,
    category: "family",
    categoryLabel: "Family Caregiving",
    availability: "In Stock",
    stockCount: 85,
    pouchSize: "25 Rinse-Free Sponges",
    headline: "EVERYDAY CARE SUPPORT",
    corePromise: "A simpler way to help loved ones feel fresh, comfortable, and cared for.",
    benefitStack: [
      "Warm rinse-free cleansing",
      "Soft comfort sponge",
      "Easy daily care",
      "No messy cleanup"
    ],
    description: "Caregiving is demanding, emotional, and exhausting. SOLO SCRUB COMFORT was created to simplify one of the hardest daily tasks with a warm, soft, rinse-free cleansing experience designed to bring comfort to both caregiver and loved one.",
    backOfPackHeadline: "Created for Caregivers",
    backOfPackCopy: "We believe caregiving should be defined by moments of connection, not conflict or struggle. SOLO SCRUB COMFORT combines our signature needle-punched cotton-soft sponge technology with a premium aloe, oat, and vitamin E moisture blend. Simply activate with a splash of warm water, massage gently to release rich foam, and wash with comforting ease.",
    colorScheme: {
      primary: "bg-[#F6F1E7]",
      text: "text-[#14263F]",
      bg: "bg-[#FBF9F6]",
      accent: "bg-[#9BAF9B]",
      hexPrimary: "#F6F1E7",
      hexBg: "#FBF9F6"
    },
    scent: "Gentle natural aloe & light oat extract",
    features: [
      {
        title: "Needle-Punched Soft Sponge Technology",
        description: "Our signature cotton-soft comfort sponge holds warmth twice as long as competitor mesh, feels gentle on thin fragile skin, and produces an incredibly rich lather with minimal water."
      },
      {
        title: "Skin Respect Formula",
        description: "Formulated with ultra-gentle, skin-loving surfactants that are 100% soap-free. Maintains the skin's natural pH and is completely non-drying."
      },
      {
        title: "Warm Water Activated Foam",
        description: "A small splash of warm water instantly activates our highly concentrated formula, transforming the compact sponge into a creamy comfort lather."
      },
      {
        title: "Dignity-First Design",
        description: "Specifically engineered to provide a soothing, low-stress, and deeply respectful cleansing experience that protects emotional well-being."
      }
    ],
    ingredients: [
      "Sodium Cocoyl Isethionate (SCI) — Soap-Free Gentle Cleansing System",
      "Colloidal Oat Extract — Oat Comfort Complex to soothe dry fragile skin",
      "Aloe Vera — Cooling hydration",
      "Vitamin E — Moisture support and skin conditioning",
      "Lactic Acid — pH Defense Support to protect the acid mantle",
      "Disodium Cocoamphodiacetate — Sensitive Skin Support Formula"
    ],
    formulaClaims: [
      "Dermatologist Tested",
      "Soft Comfort Sponge",
      "Dye Free & Paraben Free",
      "Gentle Daily Formula for All Skin Types"
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    heroImageDesc: "An emotional lifestyle design showing an adult daughter gently holding her mother's hand under warm, diffused light, conveying comfort and close human connection."
  },
  {
    id: "solo-scrub-pure",
    sku: "SS-PURE-01",
    name: "PURE",
    fullName: "SOLO SCRUB PURE",
    tagline: "Recovery Without the Struggle.",
    price: 19.99,
    rating: 4.8,
    reviewsCount: 92,
    category: "post-op",
    categoryLabel: "Post-Operative Recovery",
    availability: "In Stock",
    stockCount: 112,
    pouchSize: "25 Rinse-Free Sponges",
    headline: "POST-OP RECOVERY CARE",
    corePromise: "Comfortable cleansing when showering isn't possible.",
    benefitStack: [
      "Soft on fragile skin",
      "Rich rinse-free foam",
      "No harsh residue",
      "Comfortable warm sponge experience"
    ],
    description: "Designed for moments when traditional bathing feels difficult, exhausting, or unsafe. SOLO SCRUB PURE delivers a warm, comforting cleanse without requiring a shower.",
    backOfPackHeadline: "Made for Recovery",
    backOfPackCopy: "The soft nonwoven sponge helps minimize friction on sensitive post-procedure skin while the gentle pH balanced formula leaves skin feeling clean and refreshed. Perfect for orthopedic surgery, C-section recovery, spinal procedures, shoulder surgery, mastectomy recovery, and limited mobility patients.",
    colorScheme: {
      primary: "bg-[#FFFFFF]",
      text: "text-[#14263F]",
      bg: "bg-[#F3F4F6]",
      accent: "bg-[#B0B3B8]",
      hexPrimary: "#FFFFFF",
      hexBg: "#F3F4F6"
    },
    scent: "100% Fragrance-Free (Sterile but not cold)",
    features: [
      {
        title: "Non-Abrasion Touch",
        description: "Directly counters polyester mesh complaints. Perfect for post-operative recovering areas where abrasive scrubbing must be strictly avoided."
      },
      {
        title: "Clean Rinse-Free Cleansing",
        description: "Cleanses thoroughly with zero soapy film, residue, or tacky finish. No towel drying or rinsing required."
      },
      {
        title: "Surgical Recovery Support",
        description: "Formulated specifically for individuals recovering from spinal, orthopedic, abdominal, or cardiac interventions who are temporarily restricted from traditional showers."
      }
    ],
    ingredients: [
      "Sodium Cocoyl Isethionate (SCI) — Soap-Free Gentle Cleansing System",
      "Colloidal Oat Extract — Soothes irritated areas",
      "Aloe Vera — Hydration for post-surgical dry skin",
      "Vitamin E — Promotes healthy skin barrier",
      "Lactic Acid — Balanced pH defense"
    ],
    formulaClaims: [
      "100% Fragrance Free",
      "Dye Free & Alcohol Free",
      "Dermatologist Tested",
      "Clinically Neutral pH 5.5 Balanced"
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    heroImageDesc: "Clean, premium minimalist photography of a folded warm sponge with subtle rising team, creating a high-end skincare aesthetic while avoiding cold, fear-based clinical hospital cues."
  },
  {
    id: "solo-scrub-shield",
    sku: "SS-SHIELD-01",
    name: "SHIELD",
    fullName: "SOLO SCRUB SHIELD",
    tagline: "Protect Comfort. Protect Skin.",
    price: 21.99,
    rating: 4.9,
    reviewsCount: 76,
    category: "incontinence",
    categoryLabel: "Incontinence Care",
    availability: "Low Stock",
    stockCount: 14,
    pouchSize: "25 Rinse-Free Sponges",
    headline: "SKIN BARRIER SUPPORT",
    corePromise: "Gentle cleansing for delicate, frequently cleansed skin.",
    benefitStack: [
      "pH defense support",
      "No sting formula",
      "Soft friction-reducing sponge",
      "Comfort-focused cleansing"
    ],
    description: "For fragile skin exposed to frequent cleansing. SOLO SCRUB SHIELD combines a soft comfort sponge with a skin-respecting cleansing system designed to help support moisture balance while delivering a fresh, effective clean.",
    backOfPackHeadline: "Designed for Frequent Cleansing Needs",
    backOfPackCopy: "Frequent washing can leave fragile skin dry, irritated, and uncomfortable. Our Shield formulation is buffered with lactic acid to support the acid mantle, reinforced with colloidal oats to lock in moisture, and contains absolutely zero alcohol, artificial colors, or irritating sulfates.",
    colorScheme: {
      primary: "bg-[#14263F]",
      text: "text-[#FFFFFF]",
      bg: "bg-[#E2E8F0]",
      accent: "bg-[#9BAF9B]",
      hexPrimary: "#14263F",
      hexBg: "#E2E8F0"
    },
    scent: "Dye-free & Fragrance-free clinical pH support",
    features: [
      {
        title: "pH Defense Barrier",
        description: "Maintains absolute chemical compatibility with the skin's outer lipid coat, preventing dry peeling caused by frequent incontinence cleanses."
      },
      {
        title: "Zero Alcohol No-Sting Formula",
        description: "Will not sting raw, chafed, or highly irritated skin, offering supreme comforting relief."
      },
      {
        title: "Double-Thickness Non-abrasive Pouch Sponges",
        description: "Dense structure creates thicker, denser luxury foam buffer between the active hand and delicate skin regions."
      }
    ],
    ingredients: [
      "Lactic Acid — Supports healthy skin pH & maintains acid mantle",
      "Aloe Vera — Hydration and dry-skin cooling",
      "Vitamin E — Barrier support",
      "Oat Extract — Calms micro-irritations",
      "Disodium Cocoamphodiacetate — Sensitive Cleanse Support"
    ],
    formulaClaims: [
      "Fragrance Free (No clinical scents)",
      "Dye Free & Bleach Free",
      "Physiological pH 5.5 Balanced",
      "Gentle Daily Incontinence Protection Formula"
    ],
    image: shieldImage,
    heroImageDesc: "Premium studio photograph of the SOLO SCRUB SHIELD pouch and warm, water-activated luxury wash sponge on clean slate stone."
  },
  {
    id: "solo-scrub-calm",
    sku: "SS-CALM-01",
    name: "CALM",
    fullName: "SOLO SCRUB CALM",
    tagline: "More Peaceful Care Moments.",
    price: 22.99,
    rating: 4.9,
    reviewsCount: 114,
    category: "dementia",
    categoryLabel: "Dementia & Memory Care",
    availability: "In Stock",
    stockCount: 45,
    pouchSize: "25 Rinse-Free Sponges",
    headline: "CALMING CARE SPONGES",
    corePromise: "Designed for gentler bathing experiences.",
    benefitStack: [
      "Warm comfort sponge",
      "Soft-touch cleansing",
      "Gentle calming aroma",
      "Designed for dignity-centered care"
    ],
    description: "Bathing can become overwhelming for individuals living with memory loss or cognitive decline. SOLO SCRUB CALM is designed for dementia caregivers to reduce stress and bathing resistance.",
    backOfPackHeadline: "Created for Sensitive Care Moments",
    backOfPackCopy: "Bathing can become overwhelming for individuals living with memory loss or cognitive decline. SOLO SCRUB CALM was thoughtfully designed to help create gentler, lower-stress care routines through soft textures, warm water activation, and a calming sensory experience.",
    colorScheme: {
      primary: "bg-[#9BAF9B]",
      text: "text-[#14263F]",
      bg: "bg-[#F5F2EB]",
      accent: "bg-[#E4DFF0]",
      hexPrimary: "#9BAF9B",
      hexBg: "#F5F2EB"
    },
    scent: "VERY light natural lavender extraction (Subtle & calming, never heavy or perfumed)",
    features: [
      {
        title: "Sensory Calm Integration",
        description: "Infused with a therapeutic, ultra-subtle trace of pure natural lavender to aid neurological relaxation and create warm triggers for sleep."
      },
      {
        title: "Non-Threatening Routine",
        description: "Eliminates the fear of cold drafts, running showers, noisy spray nozzles, and slipping dangers that cause intense bathing resistance."
      },
      {
        title: "Warm Sponge Sensation",
        description: "Holds comforting micro-steam insulation within the needle-punched fibers, ensuring the sponge remains warm throughout the entire washing ritual."
      }
    ],
    ingredients: [
      "Naturally Derived Lavender — Calming sleep-aid aroma",
      "Oat Extract — Relieves itchy dry skin frequently experienced by seniors",
      "Aloe Vera — Natural botanical skin calm",
      "Vitamin E — Essential skin nutrition support",
      "Sodium Cocoyl Isethionate (SCI) — Soap-Free Natural Cleanser"
    ],
    formulaClaims: [
      "Soft Nonwoven Sponge Patterning",
      "Physiological pH Balanced",
      "No Artificial Fragrances or Dyes",
      "Zero Harsh Sulfates & Parabens"
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    heroImageDesc: "Warm domestic light showcasing a caregiver holding a warm towel, signaling dignity, safety, emotional warmth, and complete peace of mind."
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Margaret T., Vancouver, BC",
    rating: 5,
    date: "2026-05-18",
    title: "A miracle for family caregiving",
    content: "My 84-year-old husband has severe dementia and bathing had become a daily source of tears and struggle. SOLO SCRUB CALM has completely changed that. The mild scent and warm comforting lather calm him down immediately. No more cold transfers to the shower. This product is a gift.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Dr. David K., Richmond, BC",
    rating: 5,
    date: "2026-04-20",
    title: "Clinically superb recovery asset",
    content: "Following orthopedic shoulder surgery, I was unable to moisten my incisions or use my left arm for daily care. I ordered SOLO SCRUB PURE. It is absolutely residue-free, lacks any harsh hospital odor, and cleanses the skin beautifully with zero oily build-up. Highly recommended for any post-op patients.",
    verified: true
  },
  {
    id: "rev-3",
    author: "Sarah L., North Vancouver, BC",
    rating: 5,
    date: "2026-05-11",
    title: "Unbelievable foam and warmth retention",
    content: "I've tried other sponge packets, but their materials are thin and get cold within 30 seconds. Solo Scrub is thick, soft, and keeps the warm water heat throughout the process. Plus, the soap-free formula does not dry out my mother's extremely thin, delicate skin.",
    verified: true
  },
  {
    id: "rev-4",
    author: "Robert F., Burnaby, BC",
    rating: 5,
    date: "2026-05-25",
    title: "Gentle and completely no-sting",
    content: "Using Solo Scrub Shield for my grandfather's incontinence routines has made care incredibly swift and respectful. Standard wipes used to cause red chafing and stings, but this sponge is soft, holds a wonderful volume of warm foam, and leaves his skin perfectly protected.",
    verified: true
  }
];
