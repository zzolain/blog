import { FC } from "react";
import Head from "next/head";

type Props = {
  title: string;
  description?: string;
};

const Seo: FC<Props> = ({ title = "", description = "" }) => {
  return (
    <Head>
      <title>{`${title} | Jinsol Kim`}</title>
      <meta
        name="description"
        content={`개발자 김진솔 블로그 ${description}`}
      />
    </Head>
  );
};

export default Seo;
