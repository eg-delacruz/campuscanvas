//See: https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Link from "next/link";
import Img from "react-cool-img";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (
        node.content.find((item) =>
          item.marks?.find((mark) => mark.type === "code")
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        );
      }

      return <p>{children}</p>;
    },

    //Allow to redirect to a post when a link redirects to a post of Campus Canvas
    [INLINES.ENTRY_HYPERLINK]: (node) => {
      if (node.data.target.sys.contentType.sys.id === "post") {
        return (
          <Link href={`/blog/${node.data.target.fields.slug}`}>
            {node.data.target.fields.titulo}
          </Link>
        );
      }
    },

    //Redirect user to an external link when a link redirects to an external link
    [INLINES.HYPERLINK]: (node) => {
      const text = node.content.find((item) => item.nodeType === "text")?.value;
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    },

    //Render external embeded videos
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node?.data?.target?.sys?.contentType?.sys?.id === "videoEmbed") {
        return (
          <iframe
            height="400"
            width="100%"
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.titulo}
            allowFullScreen={true}
          />
        );
      }
    },

    //Render embeded images
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <Img
          src={`https:${node.data.target.fields.file.url}`}
          alt={node.data.target.fields.titulo}
          style={{ width: "100%" }}
        />
      );
    },
  },
};

const ContentfulRichText = ({ content }) => {
  return <>{documentToReactComponents(content, options)}</>;
};

export default ContentfulRichText;
