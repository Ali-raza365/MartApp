
import mongoose from 'mongoose';
 // Adjust the path as necessary
import { categories, products } from './seedData.js';
import { config } from './src/config/config.js';
import { Category, Product } from './src/models/index.js';

const seedData = async () => {
    await mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


    await Category.deleteMany({});
    await Product.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    const categoryMap = createdCategories.reduce((map, category) => {
        map[category.name] = category._id;
        return map;
    }, {});

    const productsWithCategoryIds = products.map(product => ({
        ...product,
        category: categoryMap[product.category],
    }));

    await Product.insertMany(productsWithCategoryIds);

    console.log('Data seeded successfully');
    mongoose.connection.close();
};

const fetchData = async () => {
    await mongoose.connect('mongodb://localhost:27017/martapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const products = await Product.find().populate('category');
    const categories = await Category.find();

    console.log('Products:', products);
    console.log('Categories:', categories);

    mongoose.connection.close();
};

seedData().catch(err => {
    console.error(err);
    mongoose.connection.close();
}).then(() => {
    fetchData().catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
});