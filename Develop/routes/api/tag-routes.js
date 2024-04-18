const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err)
  }
});



router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!tagData) {
      return res.status(404).json({ message: 'Tag not found!' })
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});


// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.json(400).json(err)
  }
});



// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { name: req.body.name }, // updates the name property with the new value from req.body
      { where: { id: req.params.id } } // find the tag by id
    );
    if (!tagData[0] === 0) {
      res.status(404).json({ message: 'No tag with this id!' })
      return;
    }
    res.status(200).json({ message: 'Tag updated!' })
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' })
  }
});



// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {

});

module.exports = router;
