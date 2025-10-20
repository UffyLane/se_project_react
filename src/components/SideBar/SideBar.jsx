import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar({ onEditProfile, onLogout}) {
  return (
    <aside className="sideBar">
        <hr className="sideBar__divider" />
      <div className="sideBar__user-container">
           
        <img
          src={avatar}
          alt="User avatar"
          className="sideBar__avatar"
        />
        <div className="sideBar__side-container">
        <p className="sideBar__username">Terrence Tegegne</p>
        <div className="sideBar__buttons">
          <button className="sideBar__button" onClick={onEditProfile}>
            Change profile data
          </button>
          <button className="sideBar__button" onClick={onLogout}>
            Log out
          </button>         
        </div>
       </div>
      </div>

      <hr className="sideBar__divider" />
    </aside>
  );
}
