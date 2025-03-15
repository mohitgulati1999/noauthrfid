 role selection before login
	 import React from 'react';
  import { useAuth } from '@/hooks/useAuth';
  import { Button } from '@/components/ui/button';
  import { Shield, UserRound } from 'lucide-react';
  import GlassMorphismCard from '@/components/shared/GlassMorphismCard';

  const RoleSelectionPage = () => {
    const { setUserRole } = useAuth();

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Select Your Role</h1>
          <p className="text-lg text-white/80 mt-2">Choose your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
          <GlassMorphismCard
            className="p-6 cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/70"
            hoverEffect
            onClick={() => setUserRole('member')}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <UserRound size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white">Member</h3>
            <p className="mt-2 text-center text-white/80">
              Access your daycare membership details.
            </p>
          </GlassMorphismCard>

          <GlassMorphismCard
            className="p-6 cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/70"
            hoverEffect
            onClick={() => setUserRole('admin')}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white">Admin</h3>
            <p className="mt-2 text-center text-white/80">
              Manage members, attendance, and payments.
            </p>
          </GlassMorphismCard>
        </div>
      </div>
    );
  };

  export default RoleSelectionPage;
