import "./SideBar.css";

export default function SideBar({ user, onEditProfile, onLogout }) {
  if (!user) return <p>Loading...</p>;

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <aside className="sidebar">

      {/* PROFILE HEADER */}
      <div className="sidebar__profile">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar-placeholder">
            {userInitial}
          </div>
        )}

        <h2 className="sidebar__name">{user.name}</h2>
      </div>

      {/* ACTION BUTTONS */}
      <div className="sidebar__actions">
        <p className="sidebar__link" onClick={onEditProfile}>
          Change profile data
        </p>

        <p className="sidebar__link" onClick={onLogout}>
          Log out
        </p>
      </div>

    </aside>
  );
}
