import "./SideBar.css";

export default function SideBar({ user, onEditProfile, onLogout }) {
  if (!user) return <p>Loading...</p>;

  // 🔥 Generate fallback initial (first letter of name)
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <aside className="sideBar">
      <hr className="sideBar__divider" />

      <div className="sideBar__user-container">

        {/* 🔥 Avatar or fallback letter */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User avatar"
            className="sideBar__avatar"
          />
        ) : (
          <div className="sideBar__avatar-placeholder">
            {userInitial}
          </div>
        )}

        <div className="sideBar__side-container">
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
