import React from 'react'

const wrapper = (post, i, html, handleClick, onFavorites)=>{
  return <div className={onFavorites? 'card' : 'card col-sm-6'} key={i}>
    <a href={post.post_url} target='_blank' className=''> 
      <div className="card-block">
        {html}
      </div>
    </a>
    <button onClick={()=>{handleClick(i)}} className="btn btn-primary add">{onFavorites? 'Remove' : 'Add'}</button>
  </div>
}

const handlePosts = (posts, handleClick, onFavorites)=>{
  return posts.map((post, i)=>{ 
    if(post.type==='text' ) {
      let html = <h6 className="overflow text-muted">{post.title}</h6>
      return wrapper(post, i, html, handleClick, onFavorites)
    }
    if(post.type==='photo') {
      const url = post.photos[0].alt_sizes[1].url
      let html = <img src={url} className=' photo mx-auto d-block'/>
      return wrapper(post, i, html, handleClick, onFavorites)
    }
    if(post.type==='link') {
      let html = post.link_image? 
        <img src={post.link_image} className=' photo mx-auto d-block'/>
      : <h6 className="overflow text-muted">{post.title}</h6>
      return wrapper(post, i, html, handleClick, onFavorites)
    }
    if(post.type==='audio') {
      let html = <img src={post.album_art} className=' photo mx-auto d-block'/>
      return wrapper(post, i, html, handleClick, onFavorites)
    }
    if(post.type==='quote') {
      let html = <h6 className="overflow text-muted">{`"${post.text}"`}</h6>
      return wrapper(post, i, html, handleClick, onFavorites)
    }
    if(post.type==='chat') {
      let html = <h6 className="overflow text-muted">{`"${post.body}"`}</h6>
      return wrapper(post, i, html, handleClick, onFavorites)
    }
    if(post.type==='video') {
      let html = <img src={post.thumbnail_url} className=' photo mx-auto d-block'/>
      return wrapper(post, i, html, handleClick, onFavorites)
    }
  })
}

const Cards =  ({posts, handleClick, onFavorites})=>{
  return (
    <div className={!onFavorites? 'row posts' : null}>
      {onFavorites? <h4>Favorites:</h4> : null}
      {handlePosts(posts, handleClick, onFavorites)}
    </div>
  )
}

export default Cards