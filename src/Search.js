import React, { Component } from 'react';
import axios from 'axios'
import constants from './constants'
import Cards from './Cards'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blogName: '',
      tag: '',
      posts: [],
      favorites: []
    }
  }

  handleBlogSearch() {
    console.log('bs')
  }

  handleBlogChange(e) {
    this.setState({blogName: e.target.value})
  }

  handleTagChange(e) {
    this.setState({tag: e.target.value})
  }
  handleSubmit(e){
    e.preventDefault()
    const isBlog = this.state.blogName.length >= 1? true: false
    axios.get(constants.apiUrl+'/search', {
      params: {
        blogName: this.state.blogName,
        tag: this.state.tag
      }
    })
    .then((res)=>{ 
      if(isBlog) {
         this.setState({posts: res.data.posts})
      } else {
        this.setState({posts: res.data})
      }
    })
  }

  addCard(i){
    const newFavorite = this.state.posts.splice(i,1)
    const favorites = [...this.state.favorites, newFavorite[0]]
    const posts = this.state.posts
    this.setState({posts, favorites})
  }

  removeCard(i) {
    const newPost = this.state.favorites.splice(i,1)
    const posts = [...this.state.posts, newPost[0]]
    const favorites = this.state.favorites
    this.setState({posts, favorites})
    console.log('asdf')
  }

  render() {
    return (
      <div>
        <div className='col-sm-8'>
          <div className='row'>
            <form>
              <legend> Search for a</legend>
              
              <fieldset className="form-group col-sm-6">
                <label> Blog Name:</label>
                <input onChange={this.handleBlogChange.bind(this)} className="form-control" type="text" value={this.state.blogName} /> 
              </fieldset>

              <fieldset className="form-group col-sm-6">
                <label> Tag:</label>
                <input onChange={this.handleTagChange.bind(this)} className="form-control" type="text" value={this.state.tag} /> 
              </fieldset>
              
              <button onClick={this.handleSubmit.bind(this)}  className="btn btn-primary search">Search</button>
            </form>
          </div>
          <Cards posts={this.state.posts} onFavorites={false} handleClick={this.addCard.bind(this)} />
        </div>

        <div className='col-sm-4'>
          <Cards posts={this.state.favorites} onFavorites={true} handleClick={this.removeCard.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Search;
