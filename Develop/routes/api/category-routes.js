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

router.get('/:id', async (req, res) => {
 
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {id: req.params.id
      }
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;
