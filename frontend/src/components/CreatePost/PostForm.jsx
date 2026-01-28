import { useState } from "react";
import { MarkdownComponents } from "../App/MarkDownComponent";
import ReactMarkdown from 'react-markdown'

export default function PostForm({next}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nextBtnDisabled = (title != "" && content != "");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(title == "" || content == "") {
        return;
    }
    next(title, content);
  }
  return (
    //   {/* form */}
    <div className="p-4 grid grid-cols-1 space-x-2 space-y-2 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col rounded-md h-[80vh] p-2 bg-slate-400"
      >
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="Post Title"
          className="w-full px-4 py-2 mb-2 border rounded-md"
          onChange={(e) => setTitle(e.target.value)}
          minLength={3}
          maxLength={200}
        />
        <textarea
          name="content"
          className="resize-none h-[60vh] px-4 py-2 rounded-md border bg-slate-500"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minLength={10}
          maxLength={50000}
        ></textarea>

        <div className="flex justify-end space-x-4 py-2 px-4">
          <button className="text-white bg-red-500 font-bold py-2 cursor-pointer px-4 rounded-md">
            Discard
          </button>
          <button
            className={`text-white font-bold py-2 cursor-pointer px-4 rounded-md ` +(nextBtnDisabled?"bg-blue-500":"bg-blue-400") }
            type="submit"
            disabled={!nextBtnDisabled}
          >
            Next
          </button>
        </div>
      </form>

      <div className="bg-slate-400 rounded-md h-[80vh] p-4 overflow-y-scroll">
        <ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
