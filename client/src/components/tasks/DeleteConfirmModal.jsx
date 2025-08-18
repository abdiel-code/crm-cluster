const DeleteConfirmModal = ({ task, deleteConfirm, toggleDeleteModal, handleDelete }) => {


  const onDelete = () => {
    handleDelete(task.id);
    toggleDeleteModal();
  };

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-out w-[90%] max-w-xl
    ${deleteConfirm ? 'bottom-1/2 opacity-100 translate-y-1/2' : 'bottom-0 opacity-0 translate-y-0 pointer-events-none'}
  `}
    >
      <p>Are you sure you want to delete this task?</p>
      <div className="flex justify-end mt-4">

        <button
          className="mr-2 px-4 py-2 bg-[#F7B1AB] text-white rounded-md cursor-pointer hover:bg-[#FF847E]"
          onClick={onDelete}
        >
          Delete
        </button>

        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-[#495867] cursor-pointer"
          onClick={toggleDeleteModal}
        >
          Cancel
        </button>
      </div>
    </div>
  )


}

export default DeleteConfirmModal
