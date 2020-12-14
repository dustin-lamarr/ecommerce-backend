const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  try {
    const categoryData = await Category.findAll({
      // include: [{model: Category, as: "category"}, {model: Tag, through: ProductTag, as: "products"}]
      include: { all: true }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
 
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // include: [{model: Category, as: "category"}, { model: Tag, through: ProductTag, as: 'product'}]
      include: { all: true }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
