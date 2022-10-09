import { ReactElement } from "react";
import meta from "../meta";
import Image from "next/image";
import Link from "next/link";

export default function Bio(): ReactElement {
  const author = meta.author;
  const social = meta.social;

  return (
    <>
      <div className="bio">
        <div className="left">
          <div className="bio-avatar">
            <Image
              src="/assets/profile-pic.png"
              width={58}
              height={58}
              alt="Profile picture"
              quality={100}
            />
          </div>

          <div>
            <p className="title">
              <strong>{author?.name}</strong>
            </p>
            <p className="description">
              <small>{author?.summary || null}</small>
            </p>
            <p className="description">
              <small>{author?.stacks}</small>
            </p>
          </div>
        </div>
        <div className="right">
          <Link href={`https://github.com/${social?.github}`}>GitHub</Link>
        </div>
      </div>
      <style global jsx>
        {`
          .bio {
            display: flex;
            margin-bottom: var(--spacing-16);
            align-items: center;
            justify-content: space-between;
          }

          .bio .left {
            display: flex;
            align-items: center;
            column-gap: 16px;
          }

          .bio .left .title {
            margin-bottom: var(--spacing-0);
          }
          .bio .left .description {
            margin-bottom: 1px;
            line-height: var(--lineHeight-none);
          }

          .bio .right a {
            font-size: var(--fontSize-0);
          }

          .bio small {
            color: var(--color-text-light);
          }

          .bio-avatar img {
            border-radius: 50%;
          }
        `}
      </style>
    </>
  );
}
