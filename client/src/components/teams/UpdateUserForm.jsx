import { useEffect, useState } from "react";

const UpdateUserForm = ({ user, toggleUpdateModal, onRoleUpdate }) => {
  const [role, setRole] = useState("admin");

  const handleClick = async () => {
    await onRoleUpdate(user.user_id, user.team_id, role);
    toggleUpdateModal();
  };

  return (
    <div className=" flex flex-col items-center justify-around rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-4 px-4 text-2xl gap-4">
      <h1>Update user role</h1>
      <label htmlFor="role">Role:</label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>
      <button
        type="submit"
        onClick={handleClick}
        className="bg-[#577399] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#3c587b] py-2 px-3 text-white"
      >
        Update
      </button>
      <button
        type="button"
        onClick={toggleUpdateModal}
        className="bg-[#F7B1AB] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#FF847E] py-2 px-3 text-white"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateUserForm;
