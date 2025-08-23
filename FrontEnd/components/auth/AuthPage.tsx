import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Heart, HandHeart, Mail, Lock, User, Phone } from 'lucide-react';

interface AuthPageProps {
  onAuth: (user: { id: string; name: string; role: 'helper' | 'needer' }) => void;
}

export function AuthPage({ onAuth }: AuthPageProps) {
  const [selectedRole, setSelectedRole] = useState<'helper' | 'needer' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuth = () => {
    if (selectedRole && formData.name && formData.email) {
      onAuth({
        id: Date.now().toString(),
        name: formData.name,
        role: selectedRole,
      });
    }
  };

  const RoleCard = ({ 
    role, 
    icon: Icon, 
    title, 
    description, 
    features 
  }: {
    role: 'helper' | 'needer';
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
  }) => (
    <Card 
      className={`cursor-pointer transition-all ${
        selectedRole === role 
          ? 'ring-2 ring-primary bg-accent' 
          : 'hover:bg-accent/50'
      }`}
      onClick={() => setSelectedRole(role)}
    >
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-semibold">HelpConnect</h1>
          </div>
          <p className="text-muted-foreground">
            Connecting those who need help with those who can help
          </p>
        </div>

        <Tabs defaultValue="role-selection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="role-selection">Choose Role</TabsTrigger>
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          </TabsList>

          <TabsContent value="role-selection" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <RoleCard
                role="helper"
                icon={HandHeart}
                title="I Want to Help"
                description="Offer your skills and time to help others in need"
                features={[
                  "Browse help requests",
                  "Offer your services",
                  "Track your impact",
                  "Build your reputation"
                ]}
              />
              <RoleCard
                role="needer"
                icon={Heart}
                title="I Need Help"
                description="Find people who can assist with your specific needs"
                features={[
                  "Post help requests",
                  "Connect with helpers",
                  "Track request status",
                  "Rate and review helpers"
                ]}
              />
            </div>

            {selectedRole && (
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Complete Your Profile</CardTitle>
                  <CardDescription>
                    {selectedRole === 'helper' 
                      ? "Set up your helper profile to start offering assistance"
                      : "Set up your profile to start requesting help"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleAuth}
                    disabled={!formData.name || !formData.email}
                  >
                    Create Account as {selectedRole === 'helper' ? 'Helper' : 'Help Seeker'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sign-in" className="mt-8">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your HelpConnect account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button className="w-full">Sign In</Button>
                
                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Forgot your password?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}