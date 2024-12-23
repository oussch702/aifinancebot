import React, { useEffect, useState } from 'react';
import { getRecentUsers } from '../../lib/adminUtils';
import { User, Calendar } from 'lucide-react';

type UserData = {
  id: string;
  email: string;
  displayName: string;
  createdAt: { toDate: () => Date };
  subscriptionStatus?: string;
};

export default function AdminUsersList({ limit = 5 }) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getRecentUsers(limit);
        setUsers(data as UserData[]);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [limit]);

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Recent Users</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {users.map((user) => (
          <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 p-2 rounded-full">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user.displayName || user.email}</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  <p className="text-xs text-gray-400">
                    Joined {user.createdAt.toDate().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.subscriptionStatus === 'active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {user.subscriptionStatus || 'Free'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}