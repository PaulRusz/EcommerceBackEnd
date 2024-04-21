// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Product belongs to Category, as a category can have multiple products but a product can only belong to one category.
Product.belongsTo(Category);

// Categories have many Products
// Category has many Product models.

Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
// Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products.

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  }
});

// Tags belongToMany Products (through ProductTag)
// Tag belongs to many Product models.
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: true,
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};


