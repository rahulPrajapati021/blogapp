import { useEffect, useState } from "react";
import { publicPagePostsDataList } from "../../mocks/posts.mocks";
import { Link } from "react-router";
import { apiService } from "../../service/apiService";
import Navbar from "../../components/App/Navbar";

export default function PublicHomePage() {
  const [postsData, setPostsData] = useState(publicPagePostsDataList);
  const fetchData = async () => {
    const response = await apiService.getPublishedList();
    setPostsData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <div>

      <div className="max-w-4xl mx-auto py-2 space-y-2 bg-slate-600 rounded-md h-1/2 ">
        {postsData.map((e) => (
          <PostBox key={e.id} Post={e} />
        ))}
      </div>
      </div>
    </div>
  );
}

function PostBox({ Post }) {
  return (
    <div className="bg-slate-400 rounded-2xl px-4 py-2 hover:bg-slate-300">
        <div className="flex justify-between">
          <p>by {Post.author.name}</p>
          <p>{Post.readingTime}m long</p>
        </div>
        <Link className="text-2xl inline-block my-2" to={"/post/" + Post.id}>
          {Post.title}
        </Link>

        <div>
          <p>Category: {Post.category.name}</p>
        </div>
      </div>
  );
}

// {
//     id: "f3551e4f-e912-4128-a3eb-0b0eddcb9786",
//     title: "My First post let's see how it works",
//     author: {
//       id: "a97f0b33-09c6-4840-8754-98c74b3a9a88",
//       name: "test user",
//     },
//     category: {
//       id: "9ca7a15e-d271-4c85-a5b4-0c34fcd62461",
//       name: "category",
//       postCount: 0,
//     },
//     tags: [
//       {
//         id: "9d7b344c-421a-4ffb-bcfd-0d96cf2282f3",
//         name: "add",
//         postCount: 0,
//       },
//     ],
//     readingTime: 1,
//     createdAt: "2025-12-30T16:52:56.342246",
//     updatedAt: "2025-12-30T16:52:56.342246",
//     status: "PUBLISHED",
//   },
