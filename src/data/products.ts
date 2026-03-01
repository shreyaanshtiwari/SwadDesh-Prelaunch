export interface ProductStory {
    id: string;
    name: string;
    tagline: string;
    description: string;
    origin: string;
    history: string;
    image: string;
}

export const productStories: ProductStory[] = [
    {
        id: 'thekua',
        name: 'Thekua',
        tagline: 'The Sacred Prasad of Chhath',
        description: 'A deep-fried, earthen cookie made of whole wheat flour, melted jaggery, and fennel, marked with intricate wooden motifs.',
        origin: 'Bihar & Jharkhand',
        history: 'Thekua is not just a sweet; it is an emotion for the people of Bihar. Its history is tied to the ancient Vedic festival of Chhath Puja, dedicated to the Sun God. For centuries, devotees have prepared this prasad on earthen stoves (chulhas) using mango wood, maintaining absolute purity. The dough is pressed against wooden molds (sanchas) carved with floral or geometric patterns before being fried in pure ghee. It is believed that the blessings of the Sun God are infused in every bite, making it a powerful symbol of devotion and harvest.',
        image: '/products/Thekua.png'
    },
    {
        id: 'mathri',
        name: 'Mathri',
        tagline: 'The Warrior’s Sustenance',
        description: 'A flaky, savory biscuit infused with ajwain (carom seeds) and black pepper, perfect for long travels.',
        origin: 'Rajasthan',
        history: 'Originating in the royal desert kingdom of Rajasthan, Mathri was born out of necessity. In an era of long campaigns and trade caravans across the arid Thar Desert, travelers needed food that could stay fresh for weeks without preservatives. The royal cooks devised Mathri—a dense, fried cracker that could survive the heat. Over time, it evolved from a warrior’s ration to a beloved tea-time staple, often served with mango pickle to cut through the richness of the ghee.',
        image: '/products/Mathri.png'
    },
    {
        id: 'moa',
        name: 'Jaynagarer Moa',
        tagline: 'The Winter Jewel of Bengal',
        description: 'A delicate, ephemeral sphere made of Kanakchur khoi (popped rice) and Nolen Gur (date palm jaggery).',
        origin: 'Jaynagar, West Bengal',
        history: 'The legend of Jaynagarer Moa dates back to the 1904s. It is a strictly seasonal delicacy, available only in winter when the date palm trees produce their sweetest sap (Nolen Gur). The specific variant of rice, Kanakchur, is grown locally and is renowned for its aroma. The Moa is so fragile and culturally significant that it received a Geographical Indication (GI) tag. It represents the fleeting beauty of the Bengali winter—you have to catch it before the season fades.',
        image: '/products/Moa.png'
    },
    {
        id: 'dalmoth',
        name: 'Agra Dalmoth',
        tagline: 'The Mughal Savory',
        description: 'A spicy, crunchy mixture of fried lentils (masoor dal), premium nuts, and spices.',
        origin: 'Agra, Uttar Pradesh',
        history: 'Agra is world-famous for the sweet Petha, but Dalmoth is its fiery counterpart. Historians suggest that while the Mughal emperors enjoyed rich, sweet delicacies, they craved a savory snack to cleanse the palate during their long court sessions. Thus, Dalmoth was perfected in the bazaars of Agra—a mixture rich in dry fruits (a sign of royalty) and fried lentils (a staple of the common man). It is traditionally synonymous with "Sham-e-Awadh", the leisurely evenings of aristocratic North India.',
        image: '/products/DalMoth.png'
    },
    {
        id: 'besan-ladoo',
        name: 'Besan Ladoo',
        tagline: 'The Golden Sphere of Good Luck',
        description: 'Dense, aromatic balls of slow-roasted gram flour, ghee, sugar, and cardamom.',
        origin: 'North India',
        history: 'Besan Ladoo holds a sacred place in Indian culture. It is the first sweet offered to Lord Ganesha, the remover of obstacles, before beginning any new venture. The magic lies in the process—the chickpea flour (Besan) must be roasted in ghee over a slow flame for hours until it turns golden-brown and releases a nutty aroma. This process, known as "Bhunaai", cannot be rushed. It is the sweet of patience, love, and new beginnings.',
        image: '/products/Besan Ke Laddoo.png'
    },
    {
        id: 'arse',
        name: 'Arsa',
        tagline: 'The Sweet of Harmony',
        description: 'A deep-fried sweet bread made from rice flour, jaggery, and sesame seeds.',
        origin: 'Uttarakhand & Jharkhand',
        history: 'Arsa (or Anarsa) is an ancient sweet that finds mention in Buddhist literature. In Jharkhand and Uttarakhand, it is a mandatory part of wedding trousseaus. The preparation is a community affair—women gather to pound the rice, mix it with jaggery syrup, and fry the discs. It symbolizes the binding of families, just as the jaggery binds the rice.',
        image: '/products/Arse.png'
    },
    {
        id: 'gajak',
        name: 'Morena Gajak',
        tagline: 'The Winter Crunch',
        description: 'A brittle sweet made of sesame seeds and jaggery, famous for its crunch.',
        origin: 'Morena, Madhya Pradesh',
        history: 'Gajak is the pride of Morena. Unlike other sweets, its preparation takes 10-15 hours. The sesame and jaggery are hammered together repeatedly until they fuse into a layered, crispy texture. It was originally created as a high-energy food for soldiers in winter, but today it is the signature sweet of Lohri and Makar Sankranti festivals.',
        image: '/products/Gajak.png'
    },
    {
        id: 'padukiya',
        name: 'Padukiya / Gujiya',
        tagline: 'The Crescent of Holi',
        description: 'A crescent-shaped fried pastry filled with sweetened khoya and dry fruits.',
        origin: 'Bihar & Uttar Pradesh',
        history: 'Known as "Padukiya" in Bihar and "Gujiya" in UP, this sweet is synonymous with the festival of Holi. The crescent shape is said to mimic the moon. Historically, preparing Padukiya was a social event where women of the household shares stories and bonds. It symbolizes joy, love, and the festival of colors.',
        image: '/products/Padukiya.png'
    },
    {
        id: 'nariyal-laddoo',
        name: 'Nariyal Laddoo',
        tagline: 'The Coastal Delight',
        description: 'Soft, snow-white balls made of fresh grated coconut and condensed milk.',
        origin: 'Coastal India',
        history: 'Coconut is considered the "fruit of the gods" (Sriphala). Nariyal Laddoos are the simplest yet most divine offering in temples across India. From the coasts of Gujarat to the shores of Bengal, this sweet celebrates the abundance of the coconut palm. It is traditionally made during Raksha Bandhan as a symbol of pure, unconditional love.',
        image: '/products/Nariyal Laddoo.png'
    },
    {
        id: 'hare-moong-ke-laddoo',
        name: 'Hare Moong Laddoo',
        tagline: 'The Green Pearl',
        description: 'Nutritious balls made from green gram dal, ghee, and nuts.',
        origin: 'Rajasthan',
        history: 'In the royal households of Rajasthan, food was medicine. Hare Moong (Green Gram) is known for its cooling energy. These laddoos were traditionally made during the changing seasons to boost immunity. The green gram is slow-roasted in ghee until aromatic—a process that transforms a humble lentil into a royal dessert served on silver platters.',
        image: '/products/Hare Moong Ke Laddoo.png'
    }
];
