const router = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const userExtractor = require('../utils/middleware').userExtractor

router.post('/:id/comments', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = await Blog.findById(id)
  if (!blog) {
    response.status(404).end()
  }

  const comment = new Comment({
    text: body.comment,
    blog: blog,
  })
  const saved = await comment.save()

  blog.comments.push(saved._id)
  await blog.save()

  response.status(201).json(saved)
})

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 })

  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  await blog.remove()

  user.blogs = user.blogs.filter((b) => b._id.toString() !== blog.id)
  await user.save()
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 })
  response.json(updated)
})

module.exports = router
