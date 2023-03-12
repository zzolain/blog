import { FC } from "react";
import { Post } from "../../domain/post/entities/post";
import Seo from "../../components/Seo";
import Bio from "../../components/Bio";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { marked } from "marked";
import hljs from "highlight.js";
import { GetStaticPropsContext } from "next";
import LocaleDate from "../../components/LocaleDate";
import { getAllPostIds } from "../../data/PostLoader";
import { PostUseCase } from "../../domain/post/usecases/postUseCase";

type Props = {
  post: Post;
};

const PostView: FC<Props> = (props: Props) => {
  const { post } = props;
  return (
    <>
      <Seo title={post.title} description={post.subTitle} />
      <article className="blog-post">
        <header>
          <h1>{post.title}</h1>
          <p className="date">
            <LocaleDate date={post.createdAt} />
          </p>
          {post.subTitle.length > 0 && (
            <p className="description">{post.subTitle}</p>
          )}
          {post.tags.length && (
            <p className="tags">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </p>
          )}
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.body }} />
        <p className="bottom-date">
          <LocaleDate date={post.createdAt} />
        </p>
      </article>
      <hr />
      <footer>
        <Bio />
      </footer>
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
            word-break: break-word;
            background-color: #f5f2f0;
            padding: 0;
            border-radius: 0.3em;
          }
          section p {
            font-size: var(--fontSize-1);
            white-space: pre-wrap;
          }
          section img {
            max-width: 100%;
          }
          ul,
          ol {
            margin-left: var(--spacing-5);
          }
        `}
      </style>
      <style jsx>
        {`
          .blog-post header h1 {
            margin: var(--spacing-0) var(--spacing-0) var(--spacing-4)
              var(--spacing-0);
          }

          .blog-post header .date {
            font-size: var(--fontSize-2);
            font-family: var(--font-heading);
            margin-bottom: var(--spacing-8);
          }
          .blog-post header .tags {
            display: flex;
            font-size: var(--fontSize-0);
            color: var(--color-text-light);
            column-gap: 0.4em;
          }
          .blog-post header .description {
            font-size: var(--fontSize-1);
            margin-bottom: var(--spacing-1);
          }

          .blog-post section {
            margin-top: var(--spacing-10);
            margin-bottom: var(--spacing-14);
          }

          .blog-post ul,
          .blog-post ol {
            margin-left: var(--spacing-6);
          }

          .blog-post-nav ul {
            margin: var(--spacing-0);
          }
          .bottom-date {
            text-align: right;
            font-size: var(--fontSize-0);
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

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const NOT_FOUND = { notFound: true };
  const id = String(context.params?.id);
  if (!id) return NOT_FOUND;

  const postUseCase = new PostUseCase();

  const post = await postUseCase.get(id);

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}

export default PostView;
