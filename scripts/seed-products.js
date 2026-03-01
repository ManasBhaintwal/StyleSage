const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function seed() {
    try {
        // Load env vars FORCEFULLY from .env.local to match fix-db-indexes.js behavior
        const envPath = path.resolve(process.cwd(), '.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const match = envFile.match(/MONGODB_URI=(.+)/);

        let uri;
        if (match) {
            uri = match[1].trim();
            console.log('Read URI from .env.local');
        } else {
            console.error('MONGODB_URI not found in .env.local');
            process.exit(1);
        }

        console.log('Connecting to MongoDB...');
        // console.log('URI:', uri.replace(/:([^:@]+)@/, ':****@')); // Debug log (masked)
        await mongoose.connect(uri);
        console.log('Connected.');

        // Schema Definition
        const ProductSchema = new mongoose.Schema({
            name: { type: String, required: true },
            slug: { type: String, required: true, unique: true },
            description: String,
            price: Number,
            originalPrice: Number,
            images: [String],
            category: [String], // e.g., ["anime", "naruto"]
            tags: [String],     // e.g., ["naruto", "trending"]
            sizes: [String],
            colors: [
                {
                    id: String,
                    label: String,
                    hex: String
                }
            ],
            stock: {
                type: Map,
                of: Number,
                default: {}
            },
            isActive: { type: Boolean, default: true },
            isFeatured: { type: Boolean, default: false },
            rating: { type: Number, default: 4.5 },
            reviews: { type: Number, default: 0 },
        }, { timestamps: true });

        const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

        const SIZES = ["S", "M", "L", "XL", "2XL"];
        const DEFAULT_STOCK = { "S": 10, "M": 20, "L": 15, "XL": 5, "2XL": 2 };
        const DEFAULT_COLORS = [{ id: "black", label: "Black", hex: "#000000" }];

        const MOCK_PRODUCTS = [
            // --- ANIME: Naruto ---
            {
                name: "Hidden Leaf Village Tee",
                slug: "hidden-leaf-tee",
                description: "Premium oversized tee featuring the Konoha symbol. 100% Cotton, 240GSM.",
                price: 1299,
                originalPrice: 1999,
                images: ["https://images.unsplash.com/photo-1572495641362-e1c070fe931f?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["naruto", "collection-start"],
            },
            {
                name: "Sage Mode Hoodie",
                slug: "sage-mode-hoodie",
                description: "Enter Sage Mode with this ultra-comfortable hoodie. Features embroidery on sleeve.",
                price: 2499,
                originalPrice: 3499,
                images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["naruto", "trending"],
            },
            {
                name: "Akatsuki Cloud Pattern",
                slug: "akatsuki-cloud-tee",
                description: "Join the organization. Red cloud puff print on high-quality black tee.",
                price: 1399,
                images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["naruto", "bestseller"],
            },

            // --- ANIME: Attack on Titan ---
            {
                name: "Scout Regiment Jacket",
                slug: "scout-regiment-jacket",
                description: "Dedicate your heart. Authentic scout regiment styling with Wings of Freedom.",
                price: 2999,
                originalPrice: 3999,
                images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["attack-on-titan", "aot", "new"],
            },
            {
                name: "Titan Form Tee",
                slug: "titan-form-tee",
                description: "Eren's attack titan form screen printed in high detail.",
                price: 1299,
                images: ["https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["attack-on-titan", "aot"],
            },
            {
                name: "Levi Ackerman Captain",
                slug: "levi-captain-tee",
                description: "Humanity's strongest soldier. Minimalist aesthetic design.",
                price: 1499,
                originalPrice: 1999,
                images: ["https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["attack-on-titan", "aot", "bestseller"],
            },

            // --- ANIME: One Piece ---
            {
                name: "Straw Hat Crew",
                slug: "straw-hat-crew-tee",
                description: "The whole crew on one shirt. Set sail for the Grand Line.",
                price: 1199,
                images: ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["one-piece", "op"],
            },
            {
                name: "Gear 5 Luffy",
                slug: "gear-5-luffy-oversized",
                description: "The drums of liberation. Gear 5 joyboy aesthetic print.",
                price: 1599,
                originalPrice: 2199,
                images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["one-piece", "op", "trending", "new"],
            },

            // --- ANIME: Jujutsu Kaisen ---
            {
                name: "Gojo Satoru Domain Expansion",
                slug: "gojo-domain-tee",
                description: "Infinite Void. High density print featuring the strongest sorcerer.",
                price: 1499,
                images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["jujutsu-kaisen", "jjk", "viral"],
            },
            {
                name: "Sukuna Finger",
                slug: "sukuna-finger-tee",
                description: "The King of Curses. Subtle darker aesthetics.",
                price: 1299,
                images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["jujutsu-kaisen", "jjk"],
            },

            // --- ANIME: Demon Slayer ---
            {
                name: "Tanjiro Water Breathing",
                slug: "tanjiro-water-tee",
                description: "Water breathing tenth form. Dynamic art style print.",
                price: 1399,
                images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["demon-slayer", "ds"],
            },

            // --- ANIME: Dragon Ball Z ---
            {
                name: "Goku Super Saiyan",
                slug: "goku-ssj-tee",
                description: "Legendary Super Saiyan. Classic orange and blue print.",
                price: 1299,
                images: ["https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800"],
                category: ["anime"],
                tags: ["dragon-ball-z", "dbz", "classic"],
            },

            // --- MEME: Classic ---
            {
                name: "Doge Much Wow",
                slug: "doge-much-wow-tee",
                description: "Such t-shirt. Much style. Very cotton.",
                price: 999,
                images: ["https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800"],
                category: ["meme"],
                tags: ["classic-meme", "classic", "doge"],
            },
            {
                name: "This Is Fine",
                slug: "this-is-fine-tee",
                description: "Everything is burning, but you look good.",
                price: 1099,
                images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800"],
                category: ["meme"],
                tags: ["classic-meme", "classic"],
            },

            // --- MEME: Viral ---
            {
                name: "Gigachad Sigma",
                slug: "gigachad-sigma-tee",
                description: "Average StyleSage enjoyer. Enhance your jawline with this tee.",
                price: 1199,
                images: ["https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800"],
                category: ["meme"],
                tags: ["viral", "chad", "trending"],
            },
            {
                name: "Sad Pepe",
                slug: "sad-pepe-tee",
                description: "Feels bad man. Iconic internet culture.",
                price: 1099,
                images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800"],
                category: ["meme"],
                tags: ["pepe", "viral"],
            },
            {
                name: "Stonks Only Go Up",
                slug: "stonks-tee",
                description: "Invest in your drip. To the moon.",
                price: 1199,
                images: ["https://images.unsplash.com/photo-1611974765270-ca12588072b2?auto=format&fit=crop&q=80&w=800"],
                category: ["meme"],
                tags: ["viral", "stonks"],
            },
            {
                name: "Surprised Pikachu",
                slug: "surprised-pikachu-tee",
                description: ":o when you see the quality of this print.",
                price: 1099,
                images: ["https://images.unsplash.com/photo-1605553560616-86113db1d181?auto=format&fit=crop&q=80&w=800"],
                category: ["meme"],
                tags: ["viral", "classic-meme"],
            },
        ];

        console.log('Clearing existing products...');
        await Product.deleteMany({});

        console.log('Seeding products...');
        for (const prod of MOCK_PRODUCTS) {
            await Product.create({
                ...prod,
                sizes: SIZES,
                colors: DEFAULT_COLORS,
                stock: DEFAULT_STOCK,
            });
            console.log(`Created: ${prod.name}`);
        }

        console.log('Seeding complete!');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
