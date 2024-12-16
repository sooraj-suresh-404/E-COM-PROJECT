const fs = require('fs');
const path = require('path');

// Define the folder structure
const structure = [
    'public/assets/images',
    'public/assets/fonts',
    'src/components',
    'src/contexts',
    'src/features/user/pages',
    'src/features/admin/pages',
    'src/api',
    'src/styles',
    'src/data',
    'src/utils'
];

// Define the files to be created
const files = [
    'src/components/Navbar.jsx',
    'src/components/Footer.jsx',
    'src/contexts/CartContext.jsx',
    'src/contexts/UserContext.jsx',
    'src/features/user/pages/Home.jsx',
    'src/features/user/pages/ProductList.jsx',
    'src/features/user/pages/ProductDetail.jsx',
    'src/features/user/pages/Cart.jsx',
    'src/features/user/pages/Checkout.jsx',
    'src/features/user/UserRouter.jsx',
    'src/features/admin/pages/Dashboard.jsx',
    'src/features/admin/pages/ManageProducts.jsx',
    'src/features/admin/pages/ManageUsers.jsx',
    'src/features/admin/pages/Reports.jsx',
    'src/features/admin/AdminRouter.jsx',
    'src/api/axiosInstance.js',
    'src/api/productApi.js',
    'src/api/userApi.js',
    'src/styles/index.css',
    'src/styles/tailwind.css',
    'src/styles/variables.css',
    'src/data/products.json',
    'src/utils/formatPrice.js',
    'src/utils/validateForm.js',
    'src/utils/localStorage.js',
    'src/App.jsx',
    'src/index.js',
    '.env',
    'tailwind.config.js',
    'README.md'
];

// Create folders
structure.forEach((folder) => {
    fs.mkdirSync(path.join(__dirname, folder), { recursive: true });
    console.log(`Created folder: ${folder}`);
});

// Create files with placeholders
files.forEach((file) => {
    const filePath = path.join(__dirname, file);
    fs.writeFileSync(filePath, '// TODO: Implement this file\n');
    console.log(`Created file: ${file}`);
});

console.log('Project structure created successfully!');
