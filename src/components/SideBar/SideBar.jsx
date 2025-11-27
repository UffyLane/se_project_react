import "./SideBar.css";

export default function SideBar({ user, onEditProfile, onLogout }) {
  return (
    <aside className="sideBar">
      
      <div className="sideBar__user-container">
        <img
          src={user.avatar}
          alt={user.name}
          className="sideBar__avatar"
        />

        <div className="sideBar__user-info">
          <p className="sideBar__username">{user.name}</p>

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
