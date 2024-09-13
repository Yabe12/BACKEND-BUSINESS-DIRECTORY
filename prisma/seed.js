const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: 'Technology and Software' },
        { name: 'Healthcare and Pharmaceuticals' },
        { name: 'Food and Beverage' },
        { name: 'Agriculture and Farming' },
        { name: 'Finance and Banking' },
        { name: 'Retail and E-commerce' },
        { name: 'Energy and Utilities' },
        { name: 'Automotive and Transportation' },
        { name: 'Telecommunications' },
        { name: 'Entertainment and Media' },
        { name: 'Real Estate' },
        { name: 'Fashion and Apparel' },
        { name: 'Education and E-learning' },
        { name: 'Hospitality and Tourism' },
        { name: 'Aerospace and Defense' },
    ];

    for (const category of categories) {
        // Check if the category already exists
        const existingCategory = await prisma.category.findUnique({
            where: { name: category.name },
        });

        if (!existingCategory) {
            // Create the category if it does not exist
            await prisma.category.create({
                data: category,
            });
            console.log(`Category "${category.name}" created.`);
        } else {
            console.log(`Category "${category.name}" already exists.`);
        }
    }

    console.log('Categories seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
