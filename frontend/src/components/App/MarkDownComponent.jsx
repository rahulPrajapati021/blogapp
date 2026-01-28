import ReactMarkdown from "react-markdown";

export const MarkdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-6 mb-3 text-slate-900">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-5 mb-2 text-slate-800">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-base leading-7 text-slate-700 mb-3">
      {children}
    </p>
  ),

  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {children}
    </a>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-3 space-y-2">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-3 space-y-2">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="text-slate-700">{children}</li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-slate-400 pl-4 italic text-slate-600 my-4">
      {children}
    </blockquote>
  ),

  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-slate-200 px-1 py-0.5 rounded text-sm">
        {children}
      </code>
    ) : (
      <pre className="bg-slate-900 text-white p-4 rounded-lg overflow-x-auto my-4">
        <code>{children}</code>
      </pre>
    ),

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="max-w-full rounded-xl shadow-md my-6 mx-auto"
    />
  ),
};
