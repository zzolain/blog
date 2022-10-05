import { ReactElement } from "react";
import meta from "../meta";
import Image from "next/image";
import Link from "next/link";

export default function Bio(): ReactElement {
  const author = meta.author;
  const social = meta.social;

  return (
    <div className="bio">
      <div className="left">
        <Image
          src="/assets/profile-pic.png"
          width={58}
          height={58}
          quality={100}
          alt="Profile picture"
          className="bio-avatar"
        />

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
  );
}
