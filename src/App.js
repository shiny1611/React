import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Newpost from './Newpost';
import { format } from 'date-fns';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PostPag from './Postpag';
import api from './api/url'
import Editpost from './Editpost';
import { DataProvider } from './context/DataContext';


function App() {
  
 /*  let [posts,setposts]= useState([
    {
      id:1,
      title:'hi',
      datetime:'october 02, 2023 11:18:43 Am',
      body:"hi all"
    },
    {
      id:2,
      title:'hi',
      datetime:'october 04, 2023 11:18:43 Am',
      body:"good mrng"
    }
  ]) */
  let[posts,setposts]=useState([])

  let [search,setSearch] =useState('')
  let [searchResult,setSearchResult]= useState('')
  let [postBody,setPostBody] = useState('')
  let [postTitle,setPostTitle] =useState('')
  let navigate=useNavigate()
  let [edittitle,setedittitle]=useState('')
  let [editbody,seteditbody]=useState('')

  let handleSubmit= async(e)=>{
    e.preventDefault()
    let id= posts.length ? posts[posts.length-1].id+1 : 1
//  npm i date-fns
    let datetime=format(new Date(), 'MMMM dd, yyyy pp')
    let newPost={id,title:postTitle,datetime,body:postBody}
    try{
      let response=await api.post('/posts',newPost)
      let allposts=[...posts,newPost]
      setposts(allposts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }
    catch(err){
      console.log(err.message)
    }
   
  }

useEffect(()=>{
    let filterResults = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filterResults.reverse()) 
  },[posts,search])

async function handledelete(id){
  try{
    let response=api.delete(`/posts/${id}`)
  let listitem= posts.filter((post)=>(post.id !==id))
  console.log(listitem)
  setposts(listitem)
  }
  catch(err){  
    console.log(err.message)
  
  }
  navigate('/')
}
async function handleEdit(id){
  try{
    let datetime=format(new Date(), 'MMMM dd, yyyy pp')
    let updatePost={id,title:edittitle,datetime,body:editbody}
    let response=await api.put(`/posts/${id}`,updatePost)
    //let listitem=posts.map((post1)=>post1.id===id? {...response.data}: post1) 
    //setposts(listitem) (OR)
    setposts(posts.map((post1)=>post1.id===id? {...response.data}: post1))
    seteditbody('')
    setedittitle('')
    navigate('/')
  }
  catch(err){
    console.log(err.message)

  }

}

useEffect(()=>{
  async function fetchPost(){
    try{
      let response=await api.get('/posts')
      console.log(response)
      setposts(response.data)
    }
    catch(err){
      console.log(err.msg)
    }
  }
  fetchPost()
},[])



  return (
    <div className="App">
      <DataProvider>
     <Header title='Media'/>
     <Nav 
     search={search}
     setSearch={setSearch}
     />
    <Routes>
      <Route path='/' element={<Home posts={searchResult} />}/>
      <Route path='/post'>
      <Route path='/post' element={
        <Newpost 
        handleSubmit={handleSubmit}
        postBody={postBody}
        postTitle={postTitle}
      
        setPostBody={setPostBody}
        setPostTitle={setPostTitle}
        />}
     />
     <Route path=':id' element={<PostPag posts={posts} handledelete={handledelete}/>} />
     </Route>
     <Route path='edit/:id' element={<Editpost 
      posts={posts} editBody={editbody} editTitle={edittitle} setEditBody={seteditbody} setEditTitle={setedittitle} handleEdit={handleEdit}/>}/>
    </Routes>
    </DataProvider>
    </div>
  );
}
//<home posts={posts} />
export default App;