import React, { useEffect, useState } from "react";
import DraftPostList from "../../components/UserDashboard/DraftPostList";
import PublicPostList from "../../components/UserDashboard/PublicPostList";
import { apiService } from "../../service/apiService";
import Navbar from "../../components/App/Navbar";

export default function UserDashboard() {
  const [showPublicPost, setShowPublicPost] = useState(true);
  const [publishedList, setPublishedList] = useState([]);
  const [draftList, setDraftList] = useState([]);

  const fetchData = async () => {
    const publishedData = await apiService.getPublishedList();
    setPublishedList(publishedData);
    const draftData = await apiService.getDraftList();
    setDraftList(draftData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="p-4">
        {/* draft posts & published posts sections different different */}
        <div className="bg-slate-600 min-h-80 max-w-4xl mx-auto rounded-md">
          <div className="flex border-b-2">
            <button
              onClick={() => setShowPublicPost(true)}
              className={`flex-1 cursor-pointer py-2 font-bold ${showPublicPost ? "bg-slate-300 rounded-md" : ""}`}
            >
              Public
            </button>
            <button
              onClick={() => setShowPublicPost(false)}
              className={`flex-1 cursor-pointer py-2 font-bold ${!showPublicPost ? "bg-slate-300 rounded-md" : ""}`}
            >
              Drafts
            </button>
          </div>

          {showPublicPost ? (
            <PublicPostList list={publishedList} />
          ) : (
            <DraftPostList list={draftList} />
          )}
        </div>
      </div>
    </div>
  );
}
