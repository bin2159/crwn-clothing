import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as Crownlogo } from "../../assets/crown.svg";
import { UserContest } from "../../component/context/user.context";
import { signOutUser } from "../../util/firebase/firebaseutil";
import "./navigation.styles.scss";
const Navigation = () => {
  const { currentUser ,setCurrentUser} = useContext(UserContest);
   return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crownlogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link">SIGNOUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGNIN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
