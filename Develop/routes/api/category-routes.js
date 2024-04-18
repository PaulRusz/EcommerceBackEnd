const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// find all categories
router.get('/', async (req, res) => {
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// find one category by its `id` value
router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      //
      // IS THIS RIGHT?!
      //
      include: [{ model: Product }]
    })
    if (!categoryData) {
      return res.status(404).json({ message: 'Category not found!' })
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});


// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.json(400).json(err);
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {

  try {
    const categoryData = await Category.update(
      { name: req.body.name },
      { where: { id: req.params.id }, }
    );
    if (!categoryData[0] === 0) {
      res.status(404).json({ message: 'No category with this id!' })
      return;
    }
    res.status(202).json({ message: 'Category updated!' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' })
  }
});


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.delete({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id was found!' })
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
