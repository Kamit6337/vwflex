import Link from "next/link";
import Home from "./Home";
import Categories from "./Categories";
import MyStuff from "./MyStuff";
import Search from "./Search";
import Profile from "./Profile";
import Store from "./Store";

const Navbar = () => {
  return (
    <nav className="w-full h-full flex justify-center items-center ">
      <div className="flex items-center gap-20 w-max relative">
        <p className="cursor-pointer text-xl font-semibold tracking-wider text-white">
          <Link href={`/`} prefetch={false}>
            VwFlex
          </Link>
        </p>
        <div className="self-center flex justify-between h-full whitespace-nowrap ">
          {/* MARK: HOME COMPONENT */}
          <Home />
          <Store />
          <Categories />

          {/* MARK: MY STUFF COMPONENT */}
          <MyStuff />
        </div>
        <div className="flex h-full items-center gap-4">
          <Search />
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
