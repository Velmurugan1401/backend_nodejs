const express = require("express");
const Post = require("../module/module");
const router = express.Router();
const ytdl = require('ytdl-core');
const download = require("./download")

router.post('/download', (req, res) => {
    var url = req.body.data;
    console.log(req.body)
    download(url)
    res.header("Content-Disposition", 'attachment; filename="Video.mp4');
    ytdl(url, { format: 'mp4' }).pipe(res);
});
router.get("/get", async(req, res) => {
    console.log("gett")
    const posts = await Post.find();
    res.send(posts);
});
router.post("/add", async(req, res) => {

    const post = new Post({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    await post.save()
        .then(() => {
            res.send(post);
        })
        .catch(err => {
            console.log(`db error ${err.message}`);
            process.exit(-1)
        })

});

router.get("/update/:id", async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        res.send(post);
    } catch {
        res.status(404);
        res.send({ error: "Failed to update!" });
    }
});

router.patch("/updates/:id", async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });

        if (req.body.title) {
            post.title = req.body.title;
        }

        if (req.body.content) {
            post.content = req.body.content;
        }

        await post.save();
        res.send(post);
    } catch {
        res.status(404);
        res.send({ error: "Fail to update!" });
    }
});

router.delete("/delete/:id", async(req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Failed to delete post dosn't exits!" });
    }
});

module.exports = router;