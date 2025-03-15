import React, { useState } from "react";
    import { Button } from "@/components/ui/button";
    import { Label } from "@/components/ui/label";
    import { Input } from "@/components/ui/input";
    import { useAuth } from "@/hooks/useAuth";
    import GlassMorphismCard from "@/components/shared/GlassMorphismCard";
    import { Eye, EyeOff, Loader2 } from "lucide-react";
    import { useParams } from 'react-router-dom';
    import { Role } from "@/types";

    const LoginForm = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const { login } = useAuth();
      const { role } = useParams<{ role?: Role }>(); // Get role from URL params

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Use the role from the URL params, default to 'member' if not provided
        const userRole = (role === 'admin' || role === 'member') ? role : 'member';

        // Simulate a login delay (optional)
        setTimeout(() => {
          login(userRole); // Pass the role to the login function
          setIsSubmitting(false);
        }, 500);
      };

      return (
        <GlassMorphismCard className="p-6 w-full max-w-md mx-auto mt-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </GlassMorphismCard>
      );
    };

    export default LoginForm;
