
import { Notification } from '@/contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { Bell, BellDot, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
    <Navbar />
  const { dispatch } = useNotifications();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMarkAsRead = () => {
    dispatch({ type: 'MARK_AS_READ', payload: notification.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_NOTIFICATION', payload: notification.id });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm mb-4 overflow-hidden transition-all duration-300 transform hover:shadow-md ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } animate-notification-in`}
      style={{ borderBottom: '2px solid hsl(169, 33%, 46%)' }}
    >
      <div className="flex items-start p-4 space-x-4">
        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
          {notification.image ? (
            <img
              src={notification.image}
              alt=""
              className="w-full h-full object-cover transition-opacity duration-300 hover:scale-105 transform"
              onLoad={() => setIsLoaded(true)}
            />
          ) : (
            <div className="w-full h-full bg-notification flex items-center justify-center">
              {notification.read ? (
                <Bell className="w-6 h-6 text-white" />
              ) : (
                <BellDot className="w-6 h-6 text-white animate-pulse" />
              )}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                {!notification.read && (
                  <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'hsl(169, 33%, 96%)', color: 'hsl(169, 33%, 46%)' }}>
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
              </p>
            </div>
            <div className="flex space-x-2">
              {!notification.read && (
                
                  <Check className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
