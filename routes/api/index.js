const router = require("express").Router();
const thoughtsRoutes = require("./thoughts-Routes");
const userRoutes = require("./user-routes");

router.use("/thoughts", thoughtsRoutes);
router.use("/users", userRoutes);

module.exports = router;
