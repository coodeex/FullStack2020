const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (best, blog) => {
    return best === {}
      ? blog
      : best.likes > blog.likes
        ? best
        : blog
  }

  if (blogs.length === 0) {
    return {}
  } else {
    let favorite = blogs.reduce(reducer, {});
    ['_id', 'url', '__v'].forEach(prop => delete favorite[prop])
    return favorite
  }
}

const mostBlogs = (blogs) => {
  let result = _.chain(blogs)
    .map(blog => (blog.author)).value();

  let res = _.head(_(result)
  .countBy()
  .entries()
  .maxBy(_.last));

  let num = 0
  for(i=0;i<result.length;i++){
    if(result[i]===res)num++;
  }
  
  return {author: res, blogs: num}
}

const mostLikes = (blogs) => {
  let res = _.chain(blogs)
  .groupBy('author')
  .map((group, author) => ({ author, likes: _.sumBy(group, 'likes') }))
  .maxBy('likes')
  .value();
  return res
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}