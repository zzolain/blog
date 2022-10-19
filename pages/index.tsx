import type { NextPage } from "next";
import Link from "next/link";
import { PostInteractor } from "../interactor/postInteractor";
import { Post } from "../domain/post/entities/post";
import Seo from "../components/Seo";
import LocaleDate from "../components/LocaleDate";

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = (props: Props) => {
  const { posts } = props;
  return (
    <>
      <Seo title="홈" />
      <main>
        <ol>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`posts/${post.id}`}>
                <article className="post-list-item">
                  <header>
                    <h2>
                      <span>{post.title}</span>
                    </h2>
                    <small>
                      <LocaleDate
                        date={post.createdAt}
                        format="MMMM DD, YYYY"
                      />
                    </small>
                  </header>
                  <section>
                    <p>{post.description}</p>
                  </section>
                </article>
              </Link>
              <hr />
            </li>
          ))}
        </ol>
      </main>
      <style jsx>
        {`
          ol {
            list-style: none;
          }

          .post-list-item {
            margin-bottom: var(--spacing-8);
            margin-top: var(--spacing-8);
          }
          .post-list-item:hover {
            cursor: pointer;
          }

          .post-list-item h2 {
            font-size: var(--fontSize-4);
            margin-bottom: var(--spacing-2);
            margin-top: var(--spacing-0);
          }

          .post-list-item header {
            margin-bottom: var(--spacing-4);
            color: var(--color-heading);
          }

          .post-list-item small {
            color: var(--color-text-light);
          }

          .post-list-item p {
            font-size: var(--fontSize-1);
            color: var(--color-text-light);
            margin-bottom: var(--spacing-0);
          }
        `}
      </style>
    </>
  );
};

export async function getServerSideProps() {
  const NOT_FOUND = { notFound: true };
  const interactor = new PostInteractor();
  try {
    const posts = await interactor.getList();
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e) {
    console.log(e);
    return NOT_FOUND;
  }
}

export default Home;
