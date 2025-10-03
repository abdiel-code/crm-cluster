// hooks/useTeamCleanup.js
import { useEffect } from 'react';
import { socket } from '../../core/socketInstance.js';
import { useTeam } from '../../context/TeamContext.jsx';

const useTeamCleanup = () => {
  const { activeTeam, setActiveTeam } = useTeam();

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (activeTeam) {
        socket.emit('team:leave', { teamId: activeTeam.id });
        localStorage.removeItem('activeTeam');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && activeTeam) {
        socket.emit('team:leave', { teamId: activeTeam.id });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeTeam]);
};

export default useTeamCleanup;
