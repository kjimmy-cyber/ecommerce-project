// ADD MANY PRODUCTS TO DATABASE
// Put this code in a new file called seed.js

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  await prisma.product.createMany({
    data: [

      {
        name: "Samsung Galaxy S24 Ultra",
        price: 1800000,
        quantity: 10,
        description: "Premium Samsung smartphone",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200"
      },

      {
        name: "iPhone 15 Pro Max",
        price: 2100000,
        quantity: 8,
        description: "Apple flagship phone",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200"
      },

      {
        name: "HP Pavilion Laptop",
        price: 950000,
        quantity: 6,
        description: "Powerful laptop for work",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200"
      },

      {
        name: "MacBook Pro M3",
        price: 3200000,
        quantity: 5,
        description: "Professional Apple laptop",
        image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200"
      },

      {
        name: "Dell Gaming Laptop",
        price: 1500000,
        quantity: 4,
        description: "Gaming performance laptop",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1200"
      },

      {
        name: "Sony Headphones",
        price: 250000,
        quantity: 20,
        description: "Wireless headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200"
      },

      {
        name: "Apple Watch",
        price: 650000,
        quantity: 12,
        description: "Smart watch",
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1200"
      },

      {
        name: "Samsung Smart TV",
        price: 1200000,
        quantity: 7,
        description: "4K Smart Television",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200"
      },

      {
        name: "Canon Camera",
        price: 890000,
        quantity: 5,
        description: "Professional camera",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200"
      },

      {
        name: "PlayStation 5",
        price: 950000,
        quantity: 9,
        description: "Gaming console",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200"
      },

      {
        name: "Bluetooth Speaker",
        price: 120000,
        quantity: 15,
        description: "Portable speaker",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1200"
      },

      {
        name: "iPad Air",
        price: 980000,
        quantity: 11,
        description: "Apple tablet",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200"
      }

    ]
  });

  console.log("✅ Products added successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });