import { useState } from 'react';
import { Users, Plus, Search, Mail, Shield, ArrowLeft, Edit2, Trash2, Ban, CheckCircle, XCircle, MoreVertical, UserCheck } from 'lucide-react';
import type { User } from '../../App';
import { mockUsers } from '../../lib/mockData';
import { toast } from 'sonner@2.0.3';

interface UserManagementProps {
  user: User;
}

interface ExtendedUser extends User {
  status?: 'active' | 'suspended';
  lastActive?: string;
}

export function UserManagement({ user: currentUser }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [roleFilter, setRoleFilter] = useState<'all' | 'resident' | 'bfp' | 'admin'>('all');
  const [showConfirmDialog, setShowConfirmDialog] = useState<'delete' | 'suspend' | 'activate' | null>(null);
  const [actionUser, setActionUser] = useState<ExtendedUser | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'resident' as 'resident' | 'bfp' | 'admin',
    barangay: ''
  });

  // Extended mock users with status
  const extendedUsers: ExtendedUser[] = mockUsers.map(u => ({
    ...u,
    status: 'active' as const,
    lastActive: Math.random() > 0.5 ? '2 mins ago' : '1 hour ago'
  }));

  const filteredUsers = extendedUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.barangay?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      toast.success('User account created successfully! Temporary password sent to email.');
      setShowCreateForm(false);
      setNewUser({ name: '', email: '', role: 'resident', barangay: '' });
      setIsProcessing(false);
    }, 1000);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      toast.success('User information updated successfully!');
      setShowEditForm(false);
      setSelectedUser(null);
      setIsProcessing(false);
    }, 1000);
  };

  const handleDeleteUser = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.success(`User "${actionUser?.name}" has been deleted.`);
      setShowConfirmDialog(null);
      setActionUser(null);
      setIsProcessing(false);
    }, 1000);
  };

  const handleSuspendUser = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.success(`User "${actionUser?.name}" has been suspended.`);
      setShowConfirmDialog(null);
      setActionUser(null);
      setIsProcessing(false);
    }, 1000);
  };

  const handleActivateUser = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.success(`User "${actionUser?.name}" has been activated.`);
      setShowConfirmDialog(null);
      setActionUser(null);
      setIsProcessing(false);
    }, 1000);
  };

  const handleConfirmAction = () => {
    if (showConfirmDialog === 'delete') handleDeleteUser();
    else if (showConfirmDialog === 'suspend') handleSuspendUser();
    else if (showConfirmDialog === 'activate') handleActivateUser();
  };

  const openEditForm = (user: ExtendedUser) => {
    setSelectedUser(user);
    setShowEditForm(true);
  };

  // Create Form
  if (showCreateForm) {
    return (
      <div className="min-h-full bg-[#1E1E1E] p-4 pt-16 pb-24 space-y-4">
        <div>
          <button
            onClick={() => setShowCreateForm(false)}
            className="flex items-center gap-2 text-[#FF4500] text-[13px] font-semibold mb-4 hover:underline"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to users
          </button>
          <h1 className="text-[#F0F0F0] text-[20px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Create New User
          </h1>
          <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Add a new user account to the system
          </p>
        </div>

        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Full Name *
            </label>
            <input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Enter full name"
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>

          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Email Address *
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="user@example.com"
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>

          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Role *
            </label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <option value="resident">Resident</option>
              <option value="bfp">BFP/LGU Official</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Barangay *
            </label>
            <select
              value={newUser.barangay}
              onChange={(e) => setNewUser({ ...newUser, barangay: e.target.value })}
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <option value="">Select barangay</option>
              <option value="Tambacan">Tambacan</option>
              <option value="Poblacion">Poblacion</option>
              <option value="Saray">Saray</option>
              <option value="Santiago">Santiago</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-[#DC143C] to-[#FF4500] hover:from-[#B8112F] hover:to-[#DC143C] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[14px] font-bold transition-all disabled:opacity-50"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isProcessing ? 'Creating...' : 'Create User Account'}
          </button>
        </form>

        <div className="bg-[#2196F3]/10 border border-[#2196F3]/30 rounded-[12px] p-4">
          <p className="text-[#2196F3] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <strong>Note:</strong> A temporary password will be generated and sent to the user's email address.
          </p>
        </div>
      </div>
    );
  }

  // Edit Form
  if (showEditForm && selectedUser) {
    return (
      <div className="min-h-full bg-[#1E1E1E] p-4 pt-16 pb-24 space-y-4">
        <div>
          <button
            onClick={() => {
              setShowEditForm(false);
              setSelectedUser(null);
            }}
            className="flex items-center gap-2 text-[#FF4500] text-[13px] font-semibold mb-4 hover:underline"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to users
          </button>
          <h1 className="text-[#F0F0F0] text-[20px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Edit User
          </h1>
          <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Update user account information
          </p>
        </div>

        <form onSubmit={handleEditUser} className="space-y-4">
          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Full Name *
            </label>
            <input
              defaultValue={selectedUser.name}
              placeholder="Enter full name"
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>

          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Email Address *
            </label>
            <input
              type="email"
              defaultValue={selectedUser.email}
              placeholder="user@example.com"
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>

          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Role *
            </label>
            <select
              defaultValue={selectedUser.role}
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <option value="resident">Resident</option>
              <option value="bfp">BFP/LGU Official</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          <div>
            <label className="text-[#A0A0A0] text-[11px] font-semibold uppercase mb-2 block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Barangay *
            </label>
            <select
              defaultValue={selectedUser.barangay}
              required
              className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[13px] focus:outline-none focus:border-[#FF4500] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <option value="">Select barangay</option>
              <option value="Tambacan">Tambacan</option>
              <option value="Poblacion">Poblacion</option>
              <option value="Saray">Saray</option>
              <option value="Santiago">Santiago</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-[#DC143C] to-[#FF4500] hover:from-[#B8112F] hover:to-[#DC143C] text-[#F0F0F0] rounded-[12px] py-3 px-4 text-[14px] font-bold transition-all disabled:opacity-50"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isProcessing ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <div className="bg-[#FF4500]/10 border border-[#FF4500]/30 rounded-[12px] p-4">
          <p className="text-[#FF4500] text-[11px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <strong>Warning:</strong> Changing a user's role will immediately update their permissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#1E1E1E] p-4 pt-16 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#F0F0F0] text-[20px] font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            User Management
          </h1>
          <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {filteredUsers.length} of {extendedUsers.length} users
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-[#FF4500] hover:bg-[#DC143C] text-[#F0F0F0] rounded-[10px] px-4 py-2 text-[12px] font-bold flex items-center gap-2 transition-all"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0]" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, or barangay..."
          className="w-full bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px] py-3 pl-12 pr-4 text-[13px] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF4500] transition-colors"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        />
      </div>

      {/* Role Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setRoleFilter('all')}
          className={`px-4 py-2 rounded-[10px] text-[11px] font-bold uppercase whitespace-nowrap transition-all ${
            roleFilter === 'all'
              ? 'bg-[#FF4500] text-[#F0F0F0]'
              : 'bg-[#2C2C2C] border border-[#505050] text-[#A0A0A0] hover:border-[#FF4500]'
          }`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          All ({extendedUsers.length})
        </button>
        <button
          onClick={() => setRoleFilter('resident')}
          className={`px-4 py-2 rounded-[10px] text-[11px] font-bold uppercase whitespace-nowrap transition-all ${
            roleFilter === 'resident'
              ? 'bg-[#2196F3] text-[#F0F0F0]'
              : 'bg-[#2C2C2C] border border-[#505050] text-[#A0A0A0] hover:border-[#2196F3]'
          }`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Residents ({extendedUsers.filter(u => u.role === 'resident').length})
        </button>
        <button
          onClick={() => setRoleFilter('bfp')}
          className={`px-4 py-2 rounded-[10px] text-[11px] font-bold uppercase whitespace-nowrap transition-all ${
            roleFilter === 'bfp'
              ? 'bg-[#DC143C] text-[#F0F0F0]'
              : 'bg-[#2C2C2C] border border-[#505050] text-[#A0A0A0] hover:border-[#DC143C]'
          }`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          BFP/LGU ({extendedUsers.filter(u => u.role === 'bfp').length})
        </button>
        <button
          onClick={() => setRoleFilter('admin')}
          className={`px-4 py-2 rounded-[10px] text-[11px] font-bold uppercase whitespace-nowrap transition-all ${
            roleFilter === 'admin'
              ? 'bg-[#FF4500] text-[#F0F0F0]'
              : 'bg-[#2C2C2C] border border-[#505050] text-[#A0A0A0] hover:border-[#FF4500]'
          }`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Admins ({extendedUsers.filter(u => u.role === 'admin').length})
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-3 text-center">
          <div className="text-[#2196F3] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {extendedUsers.filter(u => u.role === 'resident').length}
          </div>
          <div className="text-[#A0A0A0] text-[10px] mt-1 font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Residents
          </div>
        </div>
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-3 text-center">
          <div className="text-[#DC143C] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {extendedUsers.filter(u => u.role === 'bfp').length}
          </div>
          <div className="text-[#A0A0A0] text-[10px] mt-1 font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            BFP/LGU
          </div>
        </div>
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-3 text-center">
          <div className="text-[#FF4500] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {extendedUsers.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-[#A0A0A0] text-[10px] mt-1 font-semibold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Admins
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4 hover:border-[#FF4500] transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                user.role === 'resident' ? 'bg-[#2196F3]/20' :
                user.role === 'bfp' ? 'bg-[#DC143C]/20' :
                'bg-[#FF4500]/20'
              }`}>
                {user.role === 'admin' ? (
                  <Shield className={`w-5 h-5 ${
                    user.role === 'resident' ? 'text-[#2196F3]' :
                    user.role === 'bfp' ? 'text-[#DC143C]' :
                    'text-[#FF4500]'
                  }`} />
                ) : (
                  <Users className={`w-5 h-5 ${
                    user.role === 'resident' ? 'text-[#2196F3]' :
                    user.role === 'bfp' ? 'text-[#DC143C]' :
                    'text-[#FF4500]'
                  }`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#F0F0F0] text-[14px] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-[6px] text-[9px] font-bold uppercase ${
                      user.role === 'resident' ? 'bg-[#2196F3]' :
                      user.role === 'bfp' ? 'bg-[#DC143C]' :
                      'bg-[#FF4500]'
                    } text-[#F0F0F0]`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {user.role === 'bfp' ? 'BFP/LGU' : user.role}
                    </div>
                    {user.status === 'active' ? (
                      <div className="px-2 py-1 bg-[#4CAF50]/20 border border-[#4CAF50] text-[#4CAF50] rounded-[6px] text-[9px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Active
                      </div>
                    ) : (
                      <div className="px-2 py-1 bg-[#DC143C]/20 border border-[#DC143C] text-[#DC143C] rounded-[6px] text-[9px] font-bold uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Suspended
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#A0A0A0] text-[11px] mb-1">
                  <Mail className="w-3 h-3" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#A0A0A0] text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {user.barangay} • Last active: {user.lastActive}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#505050]">
                  <button
                    onClick={() => openEditForm(user)}
                    className="flex-1 bg-[#2196F3] hover:bg-[#1976D2] text-[#F0F0F0] rounded-[8px] py-2 px-3 flex items-center justify-center gap-2 text-[11px] font-bold transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => {
                        setActionUser(user);
                        setShowConfirmDialog('suspend');
                      }}
                      className="flex-1 bg-[#2C2C2C] border border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500]/10 rounded-[8px] py-2 px-3 flex items-center justify-center gap-2 text-[11px] font-bold transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <Ban className="w-3 h-3" />
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActionUser(user);
                        setShowConfirmDialog('activate');
                      }}
                      className="flex-1 bg-[#2C2C2C] border border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 rounded-[8px] py-2 px-3 flex items-center justify-center gap-2 text-[11px] font-bold transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <UserCheck className="w-3 h-3" />
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setActionUser(user);
                      setShowConfirmDialog('delete');
                    }}
                    className="bg-[#2C2C2C] border border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C]/10 rounded-[8px] py-2 px-3 flex items-center justify-center gap-2 text-[11px] font-bold transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-8 text-center">
            <Users className="w-12 h-12 text-[#A0A0A0] mx-auto mb-3" />
            <p className="text-[#F0F0F0] text-[14px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              No users found
            </p>
            <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && actionUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-6 max-w-[400px] w-full">
            <h2 className="text-[#F0F0F0] text-[16px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {showConfirmDialog === 'delete' && 'Delete User Account'}
              {showConfirmDialog === 'suspend' && 'Suspend User Account'}
              {showConfirmDialog === 'activate' && 'Activate User Account'}
            </h2>
            <p className="text-[#A0A0A0] text-[13px] leading-relaxed mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {showConfirmDialog === 'delete' && `Are you sure you want to permanently delete "${actionUser.name}"? This action cannot be undone.`}
              {showConfirmDialog === 'suspend' && `Suspend "${actionUser.name}"? They will no longer be able to access the system.`}
              {showConfirmDialog === 'activate' && `Reactivate "${actionUser.name}"? They will regain access to the system.`}
            </p>
            <p className="text-[#505050] text-[11px] mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {actionUser.email}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowConfirmDialog(null);
                  setActionUser(null);
                }}
                disabled={isProcessing}
                className="flex-1 px-4 py-2.5 bg-[#3C3C3C] hover:bg-[#4C4C4C] text-[#F0F0F0] rounded-[10px] text-[13px] font-semibold transition-all"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={isProcessing}
                className={`flex-1 px-4 py-2.5 rounded-[10px] text-[#F0F0F0] text-[13px] font-semibold transition-all ${
                  showConfirmDialog === 'delete' 
                    ? 'bg-[#DC143C] hover:bg-[#c41230]'
                    : showConfirmDialog === 'suspend'
                    ? 'bg-[#FF4500] hover:bg-[#DC143C]'
                    : 'bg-[#4CAF50] hover:bg-[#45a049]'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {isProcessing ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
