const postSchema = require("../models/post")

const createPosts = async(req,res) =>{
  try {
    const newPost = await postSchema.create(req.body);
    res.status(201).json({newPost})
  } catch (err) {
    return res.status(400).json({message : err.message})
  }
}

const getPosts = async(req,res) =>{
  try {
    const getPosts = await postSchema.find();
    res.status(201).json({
      getPosts
    })
  } catch (err) {
    return res.status(400).json({message : err.message})
  }
}

const getDetail = async(req,res) =>{
  try {
    const { id } = req.params;
    const detailPost = await postSchema.findById(id);
    res.status(200).json({detailPost})
  } catch (err) {
    return res.status(400).json({message : err.message})
  }
}

const getUpdate = async(req,res) =>{
  try {
    const { id } = req.params;
    const updatePost = await postSchema.findByIdAndUpdate(id,req.body, {new: true});
    res.status(201).json({updatePost})
  } catch (err) {
    return res.status(400).json({message : err.message})
  }
}

const deletePosts = async(req,res) =>{
  try {
    const { id } = req.params;
     await postSchema.findByIdAndRemove(id);
    res.status(201).json({message: "Deleted!"})
  } catch (err) {
    return res.status(400).json({message : err.message})
  }
}

const searchPost = async(req,res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search,"i");

    const posts = await postSchema.find({$or : [{title}],tag:{$in : tag.split(",")}})
    res.status(200).json({posts})
  } catch (err) {
    return res.status(400).json({message : err.message})
  }
}

module.exports = {
  createPosts,
  getDetail,
  getPosts,
  getUpdate,
  deletePosts,
  searchPost
}