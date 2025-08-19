const NotificationBar = ({ message, isVisible }) => {
    return (
        <div className={`w-[80%] fixed top-4 left-1/2 transform -translate-x-1/2 border-1 border-[#495867] rounded-2xl bg-white shadow-lg flex items-center justify-between z-50 transition-all duration-500 ease-out ${
            isVisible && message 
                ? 'translate-y-0 opacity-100' 
                : '-translate-y-full opacity-0'
        }`}>
            {/* Blue bar for decoration - left side */}
            <div className="bg-[#495867] w-4 h-12 rounded-l-2xl"></div>

            {/* Notification message */}
            <div className="text-center py-2 flex-1">
                {message}
            </div>        
            
            {/* Blue bar at the end for decoration - right side */}
            <div className="bg-[#495867] w-4 h-12 rounded-r-2xl"></div>
        </div>
    )
}

export default NotificationBar;