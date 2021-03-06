// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

// // Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
  as: "product_tags"
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  as: "product_tags"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
