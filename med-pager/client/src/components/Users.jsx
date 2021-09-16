import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>Username</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [isSelected, setSelected] = useState(false);

  const selectUser = () => {
    if (isSelected) {
      setSelectedUsers((prev) => prev.filter((prevUser) => prevUser !== user.id));
    } else {
      setSelectedUsers((prev) => [...prev, user.id]);
    }

    setSelected(prev => !prev)
  };

  return (
    <div className="user-item__wrapper" onClick={selectUser}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>

      {isSelected ? (
        <InviteIcon />
      ) : (
        <div className="user-item__invite-empty" />
      )}
    </div>
  );
};
const Users = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async (users) => {
      if (loading) return;

      setLoading(true);

      try {
        const res = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (res.users.length) {
          setUsers(res.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) fetchUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">Error Loading, refresh</div>
      </ListContainer>
    );
  }
  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No Users Found</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading...</div>
      ) : (
        users?.map((user, index) => (
          <UserItem
            key={user.id}
            index={index}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default Users;
