
const router = require('express').Router();

const { getThoughts, getSingleThought, createThought, deleteThought, updateThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtid').get(getSingleThought).put(updateThought).delete(deleteThought);


// 
router.route('/:thoughtid/reactions').post(addReaction);

router.route('/:thoughtid/reactions/:reactionid').delete(removeReaction);

module.exports = router;