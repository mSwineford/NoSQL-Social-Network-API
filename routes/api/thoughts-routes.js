const router = require("express").Router();
const {
    getAllThoughts, getthoughtById, createThought, updateThought, deleteThought,
    createReaction, deleteReaction
} = require("../../controllers/thoughts-controller");

router.route("/").get(getAllThoughts).post(createThought);
router.route("/:id").get(getthoughtById).put(updateThought).delete(deleteThought);
router.route("/:id/reactions").post(createReaction);
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;