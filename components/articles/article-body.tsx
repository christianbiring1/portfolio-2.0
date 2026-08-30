import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          img: ({ alt, ...props }) => (
            // Markdown authors control these image URLs through the private editor.
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={alt ?? ""} loading="lazy" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
