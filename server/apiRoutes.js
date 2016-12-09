const tumblr =require('tumblr.js')
var client = new tumblr.Client({
  consumer_key: 'a5ST0wA1KOQEc84vcOOHtMjc3TI8G9qU39oexSEb0IInkDYp5W',
  consumer_secret: 'fO2eKcJ02WuujGGq6r18AnEEvJIfDCwt6vjTpItbuSLUyP125O',
  returnPromises: true
})

module.exports = function(app) {
  app.get('/search', (req, res)=>{ 
    const {tag, blogName} = req.query
    console.log('bname',blogName, tag)
    
    if(blogName.length >= 1) {
      const options = {tag}
      client.blogPosts(blogName, options)
      .then((tumblrRes)=>{  
        console.log(tumblrRes.posts.length)
        res.status(200).send(tumblrRes)
      } )      
    } else{
      console.log('tag', tag)
      client.taggedPosts(tag)
      .then((tumblrRes)=>{ 
        console.log(tumblrRes)
        res.status(200).send(tumblrRes)
      })
    }
  })
};