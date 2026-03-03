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
