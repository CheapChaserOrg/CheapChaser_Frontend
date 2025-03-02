import { useNotifications } from '@/contexts/NotificationContext';
import { NotificationCard } from './NotificationCard';

export const NotificationList = () => {
  const { state } = useNotifications();

  return (
    <div className="space-y-4">
      {state.notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};