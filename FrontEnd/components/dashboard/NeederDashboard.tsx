import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { 
  Plus, 
  MapPin, 
  Clock, 
  Star, 
  DollarSign, 
  CheckCircle, 
  Heart,
  AlertCircle,
  MessageCircle,
  Phone,
  Edit3,
  Trash2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface User {
  id: string;
  name: string;
  role: 'helper' | 'needer';
}

interface NeederDashboardProps {
  user: User;
  onLogout: () => void;
}

interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  budget?: number;
  postedTime: string;
  status: 'pending' | 'matched' | 'in-progress' | 'completed';
  helper?: {
    name: string;
    avatar?: string;
    rating: number;
    phone: string;
  };
}

const mockUserRequests: HelpRequest[] = [
  {
    id: '1',
    title: 'Plumbing repair needed',
    description: 'Kitchen sink is leaking and needs immediate attention. Looking for a qualified plumber.',
    category: 'Home Repair',
    location: 'Downtown Area',
    urgency: 'high',
    budget: 200,
    postedTime: '1 hour ago',
    status: 'matched',
    helper: {
      name: 'John Martinez',
      rating: 4.9,
      phone: '(555) 123-4567',
    },
  },
  {
    id: '2',
    title: 'Dog walking service',
    description: 'Need someone to walk my dog daily for the next two weeks while I recover from surgery.',
    category: 'Pet Care',
    location: 'Midtown',
    urgency: 'medium',
    budget: 25,
    postedTime: '3 days ago',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Tutoring for math',
    description: 'Looking for a math tutor for my high school daughter. Algebra II and Geometry.',
    category: 'Education',
    location: 'Westside',
    urgency: 'low',
    budget: 40,
    postedTime: '1 week ago',
    status: 'completed',
    helper: {
      name: 'Sarah Wilson',
      rating: 5.0,
      phone: '(555) 987-6543',
    },
  },
];

export function NeederDashboard({ user, onLogout }: NeederDashboardProps) {
  const [activeTab, setActiveTab] = useState('requests');
  const [userRequests, setUserRequests] = useState(mockUserRequests);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    urgency: 'medium' as const,
    budget: '',
  });

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.description && newRequest.category) {
      const request: HelpRequest = {
        id: Date.now().toString(),
        title: newRequest.title,
        description: newRequest.description,
        category: newRequest.category,
        location: newRequest.location || 'Not specified',
        urgency: newRequest.urgency,
        budget: newRequest.budget ? parseInt(newRequest.budget) : undefined,
        postedTime: 'Just now',
        status: 'pending',
      };
      
      setUserRequests(prev => [request, ...prev]);
      setNewRequest({
        title: '',
        description: '',
        category: '',
        location: '',
        urgency: 'medium',
        budget: '',
      });
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeleteRequest = (requestId: string) => {
    setUserRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const stats = {
    activeRequests: userRequests.filter(req => req.status === 'pending' || req.status === 'matched' || req.status === 'in-progress').length,
    completedRequests: userRequests.filter(req => req.status === 'completed').length,
    totalSpent: userRequests
      .filter(req => req.status === 'completed' && req.budget)
      .reduce((sum, req) => sum + (req.budget || 0), 0),
    averageRating: 4.8,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'matched': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const RequestCard = ({ request }: { request: HelpRequest }) => (
    <Card key={request.id} className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{request.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{request.category}</Badge>
              <Badge className={getStatusColor(request.status)}>
                {request.status.replace('-', ' ')}
              </Badge>
              <Badge className={getUrgencyColor(request.urgency)}>
                {request.urgency} priority
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {request.budget && (
              <div className="text-right">
                <div className="flex items-center gap-1 text-lg font-semibold text-green-600">
                  <DollarSign className="w-4 h-4" />
                  {request.budget}
                </div>
              </div>
            )}
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDeleteRequest(request.id)}
                disabled={request.status !== 'pending'}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{request.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {request.location}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {request.postedTime}
            </div>
          </div>
        </div>

        {request.helper && (
          <div className="bg-muted p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={request.helper.avatar} />
                  <AvatarFallback>{request.helper.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{request.helper.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">{request.helper.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {request.status === 'pending' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            Waiting for helpers to respond...
          </div>
        )}

        {request.status === 'completed' && (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Leave Review
            </Button>
            <Button variant="outline" className="flex-1">
              Request Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">HelpConnect</h1>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">Help Seeker</p>
            </div>
            <Button variant="ghost" onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Requests</p>
                  <p className="text-2xl font-semibold">{stats.activeRequests}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-semibold">{stats.completedRequests}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-semibold">${stats.totalSpent}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-semibold">{stats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Help Requests</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Help Request</DialogTitle>
                <DialogDescription>
                  Describe what kind of help you need and we'll connect you with qualified helpers.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Request Title</Label>
                  <Input
                    id="title"
                    placeholder="What do you need help with?"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about your request..."
                    rows={3}
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newRequest.category} onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Home Repair">Home Repair</SelectItem>
                        <SelectItem value="Moving">Moving</SelectItem>
                        <SelectItem value="Tech Support">Tech Support</SelectItem>
                        <SelectItem value="Pet Care">Pet Care</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Priority</Label>
                    <Select value={newRequest.urgency} onValueChange={(value) => setNewRequest(prev => ({ ...prev, urgency: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Your location"
                      value={newRequest.location}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Optional"
                      value={newRequest.budget}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateRequest} className="flex-1">
                    Create Request
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="requests">All Requests ({userRequests.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({stats.activeRequests})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({stats.completedRequests})</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-6">
            <div className="space-y-4">
              {userRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
              {userRequests.length === 0 && (
                <Card className="p-8 text-center">
                  <CardContent>
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3>No requests yet</h3>
                    <p className="text-muted-foreground">Create your first help request to get started</p>
                    <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Request
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {userRequests
                .filter(req => req.status === 'pending' || req.status === 'matched' || req.status === 'in-progress')
                .map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {userRequests
                .filter(req => req.status === 'completed')
                .map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}