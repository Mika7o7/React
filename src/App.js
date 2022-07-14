import React, {useMemo, useState} from 'react'
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './styles/App.css';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';


function App() {

  const [posts, setPosts] = useState([
    {id:1, title:'python', body:'strongest'},
    {id:2, title:'python 2', body:'power'},
    {id:3, title:'python 3', body:'Imposibale'},
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  

  

  const sortedPosts = useMemo(() => {
    console.log("it's work")
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])
  
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])
  
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  


  

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}}  onClick={() => setModal(true) }>
      Creat User
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      

      <hr style={{margin: '15px'}}/>
      
      <PostFilter
      filter={filter}
      setFilter={setFilter}
      />

      
      <PostList remove={removePost} posts={sortedAndSearchedPosts}/>
        
     
     
    </div>
  );
}

export default App;
