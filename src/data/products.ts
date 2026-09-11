export interface ProductStory {
    id: string;
    name: string;
    vendor?: string;
    tagline: string;
    description: string;
    origin: string;
    history: string;
    image: string;
    packaging?: string;
    isRevealed?: boolean;
}

export const productStories: ProductStory[] = [
    {
        id: 'lehsun-chutney',
        name: 'Rajasthani Lehsun Chutney',
        vendor: 'Vijaylal Aachar Wale, Jaipur',
        tagline: 'Fiery Royal Stone-Ground Garlic Relish',
        description: 'Authentic stone-ground garlic and fiery Mathania red chili relish, prepared with cold-pressed mustard oil and secret generational spice blends in a 100ml glass jar.',
        origin: 'Jaipur, Rajasthan',
        history: 'Hailing from the storied heritage lanes of Jaipur, Vijaylal Aachar Wale has preserved the ancestral art of authentic Rajasthani relish and achar craftsmanship across generations. Their iconic Lehsun Chutney is handcrafted by stone-pounding native pungent garlic with sun-dried Mathania red chilies, roasted cumin, and cold-pressed pure mustard oil. Slow-simmered in small batches with zero artificial additives, it delivers the signature fiery warmth and earthy undertone that has crowned Rajasthani royal banquets, Dal Baati Churma, and heritage thalis for decades.',
        image: '/products/lehsun_chutney.jpg',
        packaging: '100ml Premium Glass Jar',
        isRevealed: true
    },
    {
        id: 'mohanthal',
        name: 'Royal Mohanthal (Moongthal)',
        vendor: 'Sondhya Halwai',
        tagline: 'The Gilded Confection of Royal Feasts',
        description: 'A melt-in-the-mouth, slow-roasted heritage fudge made from coarsely roasted golden flour, simmered in pure A2 bilona desi ghee, saffron kesar, and slivered pistachios, presented in a royal SwadDesh gift box.',
        origin: 'Rajasthan',
        history: 'Mohanthal (Moongthal) is an iconic heritage delicacy deeply embedded in the regal culinary lore of Rajasthan. Prepared with extraordinary patience and artisanal technique by Sondhya Halwai, the recipe requires slow-roasting coarsely ground grain in copious amounts of fragrant pure bilona ghee until it achieves a deep golden amber hue. Infused with freshly pounded green cardamom, threads of Kashmiri saffron (kesar), and garnished with delicate silver vark and crushed dry fruits, every bite dissolves like velvet on the tongue.',
        image: '/products/mohanthal.jpg',
        packaging: 'Royal SwadDesh Gift Box',
        isRevealed: true
    },
    {
        id: 'padukiya',
        name: 'Padukiya',
        tagline: 'The Crescent of Holi',
        description: 'A crescent-shaped fried pastry filled with sweetened khoya and dry fruits.',
        origin: 'Bihar & Uttar Pradesh',
        history: 'Known as "Padukiya" in Bihar, this sweet is synonymous with the festival of Holi. The crescent shape is said to mimic the moon. Historically, preparing Padukiya was a social event where women of the household shares stories and bonds. It symbolizes joy, love, and the festival of colors.',
        image: '/products/padukiya_v2.png'
    },
    {
        id: 'thekua',
        name: 'Thekua',
        tagline: 'The Sacred Prasad of Chhath',
        description: 'A deep-fried, earthen cookie made of whole wheat flour, melted jaggery, and fennel, marked with intricate wooden motifs.',
        origin: 'Bihar & Jharkhand',
        history: 'Thekua is not just a sweet; it is an emotion for the people of Bihar. Its history is tied to the ancient Vedic festival of Chhath Puja, dedicated to the Sun God. For centuries, devotees have prepared this prasad on earthen stoves (chulhas) using mango wood, maintaining absolute purity. The dough is pressed against wooden molds (sanchas) carved with floral or geometric patterns before being fried in pure ghee. It is believed that the blessings of the Sun God are infused in every bite, making it a powerful symbol of devotion and harvest.',
        image: '/products/thekua_v2.png'
    },
    {
        id: 'khajur',
        name: 'Sweet Khajur',
        tagline: 'The Traditional Delight of Teej',
        description: 'A crunchy, cardamom-infused traditional Bihari sweet made from golden semolina, meticulously shaped and deep-fried to perfection.',
        origin: 'Bihar',
        history: 'Khajur, also affectionately known as Khajuria, is a beloved traditional sweet from the heart of Bihar, specifically synonymous with the festival of Teej. Unlike its namesake fruit, this Khajur is a handcrafted delicacy made predominantly from semolina (suji), whole wheat flour, and sugar. It is characterized by its unique \'Khajur\' (date) shape or diamond patterns, traditionally achieved using wooden molds. For generations, it has been an essential part of \'Teej\' festival celebrations, where women prepare it with devotion for the \'Vrat\' (fast), making it a symbol of marital bliss and heritage. The magic of Bihari Khajur lies in its texture—a perfect balance of a crunchy, golden exterior and a crumbly, aromatic heart, often infused with the scent of cardamom and fennel seeds.',
        image: '/products/khajur_v2.png'
    }
];
