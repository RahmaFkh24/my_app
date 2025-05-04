
    import React, { useState, useCallback } from 'react';
    import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
    import format from 'date-fns/format';
    import parse from 'date-fns/parse';
    import startOfWeek from 'date-fns/startOfWeek';
    import getDay from 'date-fns/getDay';
    import enUS from 'date-fns/locale/en-US';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; // Use Dialog for modal
    import { Badge } from "@/components/ui/badge"; // Import Badge
    import { Facebook, Instagram, Twitter, Linkedin, PlusCircle, CalendarDays, Image as ImageIcon, CheckCircle, Clock, Trash2, Edit, BarChart2 } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';


    const locales = {
      'en-US': enUS,
    };

    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    });

    // Mock Events Data
    const initialEvents = [
      {
        id: 1,
        title: 'FB Post: New product launch details...',
        start: new Date(2025, 4, 2, 10, 0, 0), // May 2, 2025 10:00 AM
        end: new Date(2025, 4, 2, 10, 30, 0), // May 2, 2025 10:30 AM
        platform: 'facebook',
        status: 'Published',
        hasMedia: true,
      },
      {
        id: 2,
        title: 'IG Story: Team event highlights...',
        start: new Date(2025, 4, 5, 15, 0, 0), // May 5, 2025 3:00 PM
        end: new Date(2025, 4, 5, 15, 15, 0),
        platform: 'instagram',
        status: 'Scheduled',
        hasMedia: true,
      },
      {
         id: 3,
         title: 'Twitter: Webinar reminder tweet...',
         start: new Date(2025, 4, 8, 14, 0, 0),
         end: new Date(2025, 4, 8, 14, 10, 0),
         platform: 'twitter',
         status: 'Scheduled',
         hasMedia: false,
       },
        {
         id: 4,
         title: 'LinkedIn: Article share about industry trends...',
         start: new Date(2025, 4, 10, 9, 0, 0),
         end: new Date(2025, 4, 10, 9, 30, 0),
         platform: 'linkedin',
         status: 'Published',
         hasMedia: false,
       },
    ];

    const platformConfig = {
        facebook: { icon: Facebook, colorClass: 'platform-facebook' },
        instagram: { icon: Instagram, colorClass: 'platform-instagram' },
        twitter: { icon: Twitter, colorClass: 'platform-twitter' },
        linkedin: { icon: Linkedin, colorClass: 'platform-linkedin' },
    };

    // Custom Event Component
    const EventComponent = ({ event }) => {
      const platformInfo = platformConfig[event.platform] || {};
      const StatusIcon = event.status === 'Published' ? CheckCircle : Clock;

      return (
        <div className="flex flex-col h-full justify-between text-xs">
           <span className="rbc-event-label">{event.title}</span>
           <div className="flex items-center justify-end space-x-1 mt-1 opacity-80">
                {event.hasMedia && <ImageIcon size={12} />}
                <StatusIcon size={12} className={event.status === 'Published' ? 'text-green-600' : 'text-blue-600'} />
                {platformInfo.icon && <platformInfo.icon size={12} />}
           </div>
        </div>
      );
    };

    // Custom Toolbar (Optional - react-big-calendar's default is okay to start)


    const CalendarPage = () => {
      const [events, setEvents] = useState(initialEvents);
      const [selectedEvent, setSelectedEvent] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [platformFilter, setPlatformFilter] = useState('all');
      const navigate = useNavigate();

       const handleSelectEvent = useCallback((event) => {
         setSelectedEvent(event);
         setIsModalOpen(true);
       }, []);

       const closeModal = () => {
         setIsModalOpen(false);
         setSelectedEvent(null);
       };

        const handleDeleteEvent = () => {
            if (!selectedEvent) return;
            setEvents(prev => prev.filter(ev => ev.id !== selectedEvent.id));
            closeModal();
            // Add toast notification
        };

        const handleEditEvent = () => {
             if (!selectedEvent) return;
             navigate('/scheduler'); // Navigate to scheduler, potentially passing event ID
             closeModal();
        };

        const handleViewAnalytics = () => {
            if (!selectedEvent) return;
            navigate('/analytics'); // Navigate to analytics, potentially passing filters
            closeModal();
        };

       const filteredEvents = events.filter(event =>
          platformFilter === 'all' || event.platform === platformFilter
        );

       const eventStyleGetter = useCallback((event) => {
           const platformInfo = platformConfig[event.platform] || {};
           const className = `${platformInfo.colorClass || ''}`;
           return {
             className: className,
             // style: { backgroundColor: platformInfo.color }, // Inline styles also possible
           };
         }, []);


      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 h-[calc(100vh-120px)] flex flex-col" // Adjust height based on layout
        >
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <CalendarDays className="mr-2 h-7 w-7" /> Calendar View
            </h1>
             <div className="flex items-center gap-2">
                {/* Placeholder for View Toggle (Month/Week/Day) - handled by calendar toolbar */}
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Platform" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={() => navigate('/scheduler')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Post
                </Button>
             </div>
          </div>

          {/* Calendar */}
          <div className="flex-grow">
             <Calendar
               localizer={localizer}
               events={filteredEvents}
               startAccessor="start"
               endAccessor="end"
               style={{ height: '100%' }} // Make calendar fill container
               onSelectEvent={handleSelectEvent}
               eventPropGetter={eventStyleGetter}
               components={{
                 event: EventComponent, // Use custom event component
                 // toolbar: CustomToolbar, // Use custom toolbar if created
               }}
               views={['month', 'week', 'day']} // Enable different views
               step={30} // Time slot interval
               showMultiDayTimes // Show times for multi-day events in week/day view
             />
          </div>

          {/* Event Detail Modal */}
           <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
             <DialogContent className="sm:max-w-[425px]">
               {selectedEvent && (
                 <>
                   <DialogHeader>
                     <DialogTitle className="flex items-center">
                         {platformConfig[selectedEvent.platform]?.icon && React.createElement(platformConfig[selectedEvent.platform].icon, { className: `mr-2 h-5 w-5 ${platformConfig[selectedEvent.platform]?.colorClass?.replace('platform-', 'text-') || ''}` })}
                         Post Details
                     </DialogTitle>
                     <DialogDescription>
                       {format(selectedEvent.start, 'PPPp')}
                     </DialogDescription>
                   </DialogHeader>
                   <div className="py-4 space-y-4">
                      {/* Media Preview Placeholder */}
                     {selectedEvent.hasMedia && (
                        <div className="h-32 bg-secondary rounded flex items-center justify-center text-muted-foreground italic">
                            Media Preview Placeholder
                        </div>
                      )}
                     <p className="text-sm whitespace-pre-wrap">{selectedEvent.title}</p>
                     <div className="flex items-center space-x-2">
                         <span className="text-sm font-medium">Status:</span>
                         <Badge variant={selectedEvent.status === 'Published' ? 'secondary' : 'outline'} className={`border-0 ${selectedEvent.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                             {selectedEvent.status === 'Published' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                             {selectedEvent.status}
                         </Badge>
                     </div>
                   </div>
                   <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2 gap-2">
                     <Button variant="destructive" onClick={handleDeleteEvent} size="sm">
                         <Trash2 className="mr-1 h-4 w-4"/> Delete
                     </Button>
                      <div className="flex gap-2">
                         <Button variant="outline" onClick={handleEditEvent} size="sm">
                             <Edit className="mr-1 h-4 w-4"/> Edit
                         </Button>
                         <Button variant="outline" onClick={handleViewAnalytics} size="sm">
                              <BarChart2 className="mr-1 h-4 w-4"/> Analytics
                         </Button>
                     </div>
                   </DialogFooter>
                 </>
               )}
             </DialogContent>
           </Dialog>
        </motion.div>
      );
    };

    export default CalendarPage;
  