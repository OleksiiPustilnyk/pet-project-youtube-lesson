import React, { useState } from 'react'

import PostList from './components/PostList.jsx'
import PostForm from './components/PostForm.jsx'
import PostFilter from './components/PostFilter.jsx'

import '../src/styles/App.css'
import MyModal from './components/UI/modal/MyModal.jsx'
import MyButton from './components/UI/button/MyButton.jsx'
import { usePosts } from './hooks/usePost.js'
import axios from 'axios'

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    async function fetchPosts() {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        )
        setPosts(response.data)
    }

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }

    return (
        <div className="App">
            <button onClick={fetchPosts}>GET POSTS</button>
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: '15px 0' }} />

            <PostFilter filter={filter} setFilter={setFilter} />

            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={'Список'}
            />
        </div>
    )
}

export default App
