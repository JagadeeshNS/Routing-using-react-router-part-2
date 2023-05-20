import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {Component} from 'react'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsDate()
  }

  getBlogsDate = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedDate = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      author: eachItem.author,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      topic: eachItem.topic,
    }))
    this.setState({
      blogData: updatedDate,
      isLoading: false,
    })
  }

  render() {
    const {blogData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
