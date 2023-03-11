import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import meta from "../meta";
import Bio from "./Bio";
import Link from "next/link";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const route = useRouter();
  const isRootPath = route.pathname === "/";

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {isRootPath ? (
          <Bio />
        ) : (
          <Link className="header-link-home" href="/">
            {meta.title}
          </Link>
        )}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} {meta.title}
      </footer>
    </div>
  );
};

export default Layout;
