const express = require("express");
const { createPosts, getPosts, getDetail, getUpdate, deletePosts, searchPost } = require("../controllers/post");

const router = express.Router()

router.post('/createPost',createPosts)
router.get('/getPosts',getPosts)
router.get('/getDetail/:id',getDetail)
router.patch('/getUpdate/:id',getUpdate)
router.delete('/deletePost/:id',deletePosts)
router.get('/searchPost',searchPost)

module.exports = router;