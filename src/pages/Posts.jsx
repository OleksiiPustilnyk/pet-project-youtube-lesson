import React, { useEffect, useState } from 'react'
import { usePosts } from '../hooks/usePost.js'
import { useFetching } from '../hooks/useFetching.js'
import { getPageCount } from '../utils/page.js'

import PostService from '../API/PostService.js'

import PostList from '../components/PostList.jsx'
import PostForm from '../components/PostForm.jsx'
import PostFilter from '../components/PostFilter.jsx'
import MyModal from '../components/UI/modal/MyModal.jsx'
import MyButton from '../components/UI/button/MyButton.jsx'
import Loader from '../components/UI/loader/Loader.jsx'
import Pagination from '../components/UI/pagination/Pagination.jsx'

import '../styles/App.css'

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page)
            setPosts(response.data)
            const totalCount = response.headers['x-total-count']
            setTotalPages(getPageCount(totalCount, limit))
        }
    )

    useEffect(() => {
        fetchPosts(limit, page)
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: '15px 0' }} />

            <PostFilter filter={filter} setFilter={setFilter} />

            {postError && <h1>Произошла ошибка {postError}</h1>}

            {isPostsLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            ) : (
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    title={'Список'}
                />
            )}

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default Posts
