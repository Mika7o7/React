import React, { useEffect, useMemo, useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import "../styles/App.css";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePost";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/paggination/Paginattion";



function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setpage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


 
  

 

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit));
  }, []);

  console.log(totalPages)
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };


  const changePage = (page) => {
    setpage(page)
   
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Creat User
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px" }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      {postError ? (
        <h1>Error ${postError}</h1>
      ) : isPostsLoading ? (
        <div
          style={{
            display: "flex",
            marginTop: "50px",
            justifyContent: "center",
          }} 
        >
          <Loader />
        </div>
      ) : (
        <PostList remove={removePost} posts={sortedAndSearchedPosts} />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  );
}

export default Posts;
