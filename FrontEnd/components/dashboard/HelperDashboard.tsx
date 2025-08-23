import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  DollarSign, 
  CheckCircle, 
  Heart,
  Filter,
  Calendar,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface User {
  id: string;
  name: string;
  role: 'helper' | 'needer';
}

interface HelperDashboardProps {
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
  requester: {
    name: string;
    avatar?: string;
    rating: number;
  };
  postedTime: string;
  status: 'pending' | 'accepted' | 'completed';
}

const mockRequests: HelpRequest[] = [
  {
    id: '1',
    title: 'Need help moving furniture',
    description: 'Looking for 2-3 people to help move furniture from a 2nd floor apartment to a truck. Heavy lifting involved.',
    category: 'Moving',
    location: 'Downtown, 0.5 miles away',
    urgency: 'medium',
    budget: 150,
    requester: {
      name: 'Sarah Johnson',
      rating: 4.8,
    },
    postedTime: '2 hours ago',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Computer repair needed',
    description: 'My laptop won\'t start up. Looking for someone with technical knowledge to diagnose and fix the issue.',
    category: 'Tech Support',
    location: 'Midtown, 1.2 miles away',
    urgency: 'high',
    budget: 80,
    requester: {
      name: 'Mike Chen',
      rating: 4.9,
    },
    postedTime: '4 hours ago',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Grocery shopping assistance',
    description: 'Elderly person needs help with weekly grocery shopping. Must have reliable transportation.',
    category: 'Shopping',
    location: 'Westside, 2.1 miles away',
    urgency: 'low',
    budget: 40,
    requester: {
      name: 'Eleanor Davis',
      rating: 5.0,
    },
    postedTime: '6 hours ago',
    status: 'accepted',
  },
];

export function HelperDashboard({ user, onLogout }: HelperDashboardProps) {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [requests, setRequests] = useState(mockRequests);

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' as const } : req
    ));
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || req.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const availableRequests = filteredRequests.filter(req => req.status === 'pending');
  const acceptedRequests = filteredRequests.filter(req => req.status === 'accepted');
  const completedRequests = filteredRequests.filter(req => req.status === 'completed');

  const stats = {
    helpedToday: 3,
    totalHelped: 47,
    rating: 4.9,
    earnings: 1250,
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const RequestCard = ({ request, showActions = true }: { request: HelpRequest; showActions?: boolean }) => (
    <Card key={request.id} className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{request.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{request.category}</Badge>
              <Badge className={getUrgencyColor(request.urgency)}>
                {request.urgency} priority
              </Badge>
            </div>
          </div>
          {request.budget && (
            <div className="text-right">
              <div className="flex items-center gap-1 text-lg font-semibold text-green-600">
                <DollarSign className="w-4 h-4" />
                {request.budget}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{request.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={request.requester.avatar} />
                <AvatarFallback>{request.requester.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">{request.requester.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{request.requester.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {request.location}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {request.postedTime}
          </div>
        </div>

        {showActions && request.status === 'pending' && (
          <div className="flex gap-2">
            <Button 
              onClick={() => handleAcceptRequest(request.id)}
              className="flex-1"
            >
              Accept Request
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        )}

        {request.status === 'accepted' && (
          <div className="flex gap-2">
            <Button className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Contact Requester
            </Button>
            <Button variant="outline">Mark Complete</Button>
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
              <p className="text-xs text-muted-foreground">Helper</p>
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
                  <p className="text-sm text-muted-foreground">Helped Today</p>
                  <p className="text-2xl font-semibold">{stats.helpedToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Helped</p>
                  <p className="text-2xl font-semibold">{stats.totalHelped}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-semibold">{stats.rating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Earnings</p>
                  <p className="text-2xl font-semibold">${stats.earnings}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="browse">Browse Requests</TabsTrigger>
            <TabsTrigger value="active">Active Tasks ({acceptedRequests.length})</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="moving">Moving</SelectItem>
                  <SelectItem value="tech support">Tech Support</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="gardening">Gardening</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="space-y-4">
              {availableRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
              {availableRequests.length === 0 && (
                <Card className="p-8 text-center">
                  <CardContent>
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3>No matching requests found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {acceptedRequests.map(request => (
                <RequestCard key={request.id} request={request} showActions={false} />
              ))}
              {acceptedRequests.length === 0 && (
                <Card className="p-8 text-center">
                  <CardContent>
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3>No active tasks</h3>
                    <p className="text-muted-foreground">Browse requests to find people to help</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {completedRequests.map(request => (
                <RequestCard key={request.id} request={request} showActions={false} />
              ))}
              {completedRequests.length === 0 && (
                <Card className="p-8 text-center">
                  <CardContent>
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3>No completed tasks yet</h3>
                    <p className="text-muted-foreground">Your completed help requests will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}