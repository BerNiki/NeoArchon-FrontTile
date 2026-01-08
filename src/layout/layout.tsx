import { Outlet } from "react-router";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { pageBackground } from "./layout.module.scss";

export const Layout: React.FC = () => (
  <>
    <Header />
    <main className={pageBackground}>
      <Outlet />
    </main>
    <Footer />
  </>
);
