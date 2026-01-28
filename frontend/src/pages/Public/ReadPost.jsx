import { useEffect, useState } from "react"
import { mockSinglePost} from "../../mocks/posts.mocks"
import { useParams } from "react-router";
import ReactMarkdown from 'react-markdown'
import { MarkdownComponents } from "../../components/App/MarkDownComponent";
import { apiService } from "../../service/apiService";
import NotFound from "../../components/App/NotFound";
import Navbar from "../../components/App/Navbar";

export default function ReadPost() {
  const [post, setPost] = useState(mockSinglePost);
  const {id} = useParams();

  if(id == "") {
    return <NotFound />
  }
  const fetchPost = async (id) => {
    const response = await apiService.getPost(id);
    setPost(response);
  }
  useEffect(() => {
    fetchPost(id);
  }, [])
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="py-2 flex justify-center">

      <div className="bg-orange-200 flex-1 max-w-4xl py-5 px-4 rounded-md">
        {/* title */}
        <h1 className="text-3xl py-5">{post.title}</h1>
        <div className="py-4">Author - {post.author.name}, {post.readingTime}m total read.</div>
        <div className="min-h-80 block">
        <ReactMarkdown components={MarkdownComponents}>{post.content}</ReactMarkdown>
        </div>
        <div className="mt-4">
          <p>Category - {post.category.name}</p>
          <div className="flex">
            Tags -
            {post.tags.map(e => <p key={e.id}>#{e.name}</p>)}
          </div>
        </div>
      </div>

      </div>

    </div>
  )
}


// {
//   id: "f3551e4f-e912-4128-a3eb-0b0eddcb9786",
//   title: "My Second post let's see how it works",
//   content: "<p>this is my new post please help !!!</p>",
//   author: {
//     id: "a97f0b33-09c6-4840-8754-98c74b3a9a88",
//     name: "test user",
//   },
//   category: {
//     id: "9ca7a15e-d271-4c85-a5b4-0c34fcd62461",
//     name: "category",
//     postCount: 0,
//   },
//   tags: [
//     {
//       id: "9d7b344c-421a-4ffb-bcfd-0d96cf2282f3",
//       name: "add",
//       postCount: 0,
//     },
//   ],
//   readingTime: 1,
//   createdAt: "2025-12-30T16:54:56.342246",
//   updatedAt: "2025-12-30T16:54:56.342246",
//   status: "PUBLISHED",
// };
