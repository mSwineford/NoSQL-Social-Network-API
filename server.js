const mongoose = require("mongoose");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/social-network-API", {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser
    }
);

mongoose.set("debug", true);

app.use(require("./routes"));
app.listen(PORT, () => 
    console.log(`Connected to localhost:${PORT}!`)
);