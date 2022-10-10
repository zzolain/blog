import { FC } from "react";
import { Post } from "../../domain/post/entities/post";
import { PostInteractor } from "../../interactor/postInteractor";
import Seo from "../../components/Seo";
import Bio from "../../components/Bio";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { marked } from "marked";
import hljs from "highlight.js";
import { GetServerSidePropsContext } from "next";
import LocaleDate from "../../components/LocaleDate";

type Props = {
  post: Post;
};

const PostView: FC<Props> = (props: Props) => {
  const { post } = props;
  return (
    <>
      <Seo title={post.title} description={post.description} />
      <article className="blog-post">
        <header>
          <h2>{post.title}</h2>
          <p>
            <LocaleDate date={post.createdAt} />
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      {/*<nav className="blog-post-nav">*/}
      {/*  <ul*/}
      {/*    style={{*/}
      {/*      display: `flex`,*/}
      {/*      flexWrap: `wrap`,*/}
      {/*      justifyContent: `space-between`,*/}
      {/*      listStyle: `none`,*/}
      {/*      padding: 0,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <li>*/}
      {/*      {previous && (*/}
      {/*        <Link to={previous.fields.slug} rel="prev">*/}
      {/*          ← {previous.frontmatter.title}*/}
      {/*        </Link>*/}
      {/*      )}*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      {next && (*/}
      {/*        <Link to={next.fields.slug} rel="next">*/}
      {/*          {next.frontmatter.title} →*/}
      {/*        </Link>*/}
      {/*      )}*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</nav>*/}
      <style global jsx>
        {`
          code.hljs {
            border-radius: 10px;
          }
          code {
            background-color: #f5f2f0;
            padding: 0.1em 0.3em;
            border-radius: 0.3em;
          }
        `}
      </style>
      <style jsx>
        {`
          .blog-post header h1 {
            margin: var(--spacing-0) var(--spacing-0) var(--spacing-4)
              var(--spacing-0);
          }

          .blog-post header p {
            font-size: var(--fontSize-2);
            font-family: var(--font-heading);
          }

          .blog-post section {
            margin-top: var(--spacing-12);
            margin-bottom: var(--spacing-16);
          }

          .blog-post ul,
          .blog-post ol {
            margin-left: var(--spacing-6);
          }

          .blog-post-nav ul {
            margin: var(--spacing-0);
          }
        `}
      </style>
    </>
  );
};

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false,
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const NOT_FOUND = { notFound: true };
  const id = Number(context.params?.id);
  if (!id) return NOT_FOUND;
  const interactor = new PostInteractor();
  try {
    const post = await interactor.get(id);
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  } catch (e) {
    return NOT_FOUND;
  }
}

export default PostView;
