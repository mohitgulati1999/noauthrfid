import { useState } from 'react';
    import LoginForm from "@/components/auth/LoginForm";
    import PageTransition from "@/components/shared/PageTransition";
    import { Moon, Shield, UserRound } from "lucide-react";
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';
    import GlassMorphismCard from '@/components/shared/GlassMorphismCard';

    const Login = () => {
      const navigate = useNavigate();
      const [selectedRole, setSelectedRole] = useState<'admin' | 'member' | null>(null);

      const handleRoleSelect = (role: 'admin' | 'member') => {
        navigate(`/login/${role}`);
      };

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
          <PageTransition className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="flex items-center mb-8">
              <Moon className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-display font-bold tracking-tight text-white">
                LaNeenos Daycare
              </h1>
            </div>
            {selectedRole ? (
              <LoginForm />
            ) : (
              <>
                <div className="text-center mb-8">
                  <p className="text-lg text-white/80 max-w-md mx-auto">
                    Select your role to continue
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                  <GlassMorphismCard
                    className="p-6 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center hover:ring-2 hover:ring-primary/70"
                    hoverEffect
                    onClick={() => handleRoleSelect('member')}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 text-primary mb-4">
                      <UserRound size={28} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">Member</h3>
                    <p className="mt-2 text-center text-white/80">
                      Access your daycare membership details.
                    </p>
                  </GlassMorphismCard>

                  <GlassMorphismCard
                    className="p-6 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center hover:ring-2 hover:ring-primary/70"
                    hoverEffect
                    onClick={() => handleRoleSelect('admin')}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 text-primary mb-4">
                      <Shield size={28} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">Admin</h3>
                    <p className="mt-2 text-center text-white/80">
                      Manage members, attendance, and payments.
                    </p>
                  </GlassMorphismCard>
                </div>
              </>
            )}
          </PageTransition>
        </div>
      );
    };

    export default Login;
