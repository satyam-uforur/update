"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, LogIn, LogOut, Users, User, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface Participant {
  userId: string;
  name: string;
  email: string;
  department: string;
  year: string;
  semester: string;
  phoneNumber: string;
  enrollmentNo: string;
  registeredAt: string;
}

interface GroupParticipant {
  groupId: string;
  members: Participant[];
}

interface Event {
  _id: string;
  name: string;
  eventType: "SOLO" | "GROUP";
  minMember?: number;
  maxMember?: number;
}

interface AttendanceRecord {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  entryTime?: string;
  exitTime?: string;
  status: "PRESENT" | "ABSENT" | "PARTIAL";
}

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[] | GroupParticipant[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchEventData();
      fetchAttendance();
    }
  }, [params.id]);

  const fetchEventData = async () => {
    try {
      const response = await fetch(`/api/event/${params.id}/participants`);
      const data = await response.json();
      
      if (data.success) {
        setEvent(data.event);
        setParticipants(data.participants);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch event data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch event data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`/api/attendance?eventId=${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setAttendance(data.attendance);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const recordAttendance = async (userId: string, type: "entry" | "exit", groupId?: string) => {
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: params.id,
          userId,
          groupId,
          type,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        });
        fetchAttendance(); // Refresh attendance data
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record attendance",
        variant: "destructive",
      });
    }
  };

  const getAttendanceStatus = (userId: string) => {
    const record = attendance.find(a => a.userId._id === userId);
    return record || null;
  };

  const downloadPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      await import("jspdf-autotable");
      
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text(`${event?.name} - Attendance Report`, 20, 20);
      
      // Event details
      doc.setFontSize(12);
      doc.text(`Event Type: ${event?.eventType}`, 20, 35);
      doc.text(`Generated on: ${format(new Date(), "PPP")}`, 20, 45);
      
      // Prepare table data
      let tableData: any[] = [];
      let headers: string[] = [];

      if (event?.eventType === "SOLO") {
        headers = ["Name", "Email", "Department", "Year", "Phone", "Entry Time", "Exit Time", "Status"];
        
        (participants as Participant[]).forEach(participant => {
          const attendanceRecord = getAttendanceStatus(participant.userId);
          tableData.push([
            participant.name,
            participant.email,
            participant.department,
            participant.year,
            participant.phoneNumber,
            attendanceRecord?.entryTime ? format(new Date(attendanceRecord.entryTime), "HH:mm:ss") : "-",
            attendanceRecord?.exitTime ? format(new Date(attendanceRecord.exitTime), "HH:mm:ss") : "-",
            attendanceRecord?.status || "ABSENT"
          ]);
        });
      } else {
        headers = ["Group", "Name", "Email", "Department", "Year", "Phone", "Entry Time", "Exit Time", "Status"];
        
        (participants as GroupParticipant[]).forEach((group, groupIndex) => {
          group.members.forEach((member, memberIndex) => {
            const attendanceRecord = getAttendanceStatus(member.userId);
            tableData.push([
              memberIndex === 0 ? `Group ${groupIndex + 1}` : "",
              member.name,
              member.email,
              member.department,
              member.year,
              member.phoneNumber,
              attendanceRecord?.entryTime ? format(new Date(attendanceRecord.entryTime), "HH:mm:ss") : "-",
              attendanceRecord?.exitTime ? format(new Date(attendanceRecord.exitTime), "HH:mm:ss") : "-",
              attendanceRecord?.status || "ABSENT"
            ]);
          });
        });
      }

      // Add table
      (doc as any).autoTable({
        head: [headers],
        body: tableData,
        startY: 60,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [59, 130, 246] },
      });

      // Save PDF
      doc.save(`${event?.name}-attendance-${format(new Date(), "yyyy-MM-dd")}.pdf`);
      
      toast({
        title: "Success",
        description: "Attendance report downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 capitalize">
                {event?.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={event?.eventType === "SOLO" ? "default" : "secondary"}>
                  {event?.eventType}
                </Badge>
                {event?.eventType === "GROUP" && (
                  <span className="text-sm text-gray-600">
                    Team Size: {event.minMember}-{event.maxMember}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button onClick={downloadPDF} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {event?.eventType === "SOLO" ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Solo Participants ({(participants as Participant[]).length})
              </CardTitle>
              <CardDescription>
                Individual participants for this event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Entry Time</TableHead>
                    <TableHead>Exit Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(participants as Participant[]).map((participant) => {
                    const attendanceRecord = getAttendanceStatus(participant.userId);
                    return (
                      <TableRow key={participant.userId}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.department}</TableCell>
                        <TableCell>{participant.year}</TableCell>
                        <TableCell>{participant.phoneNumber}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              attendanceRecord?.status === "PRESENT" ? "default" :
                              attendanceRecord?.status === "PARTIAL" ? "secondary" : "destructive"
                            }
                            className="flex items-center gap-1"
                          >
                            {attendanceRecord?.status === "PRESENT" && <CheckCircle className="h-3 w-3" />}
                            {attendanceRecord?.status === "PARTIAL" && <AlertCircle className="h-3 w-3" />}
                            {attendanceRecord?.status === "ABSENT" && <XCircle className="h-3 w-3" />}
                            {attendanceRecord?.status || "ABSENT"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {attendanceRecord?.entryTime ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <Clock className="h-3 w-3" />
                              {format(new Date(attendanceRecord.entryTime), "HH:mm:ss")}
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {attendanceRecord?.exitTime ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <Clock className="h-3 w-3" />
                              {format(new Date(attendanceRecord.exitTime), "HH:mm:ss")}
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => recordAttendance(participant.userId, "entry")}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={!!attendanceRecord?.entryTime}
                            >
                              <LogIn className="h-3 w-3 mr-1" />
                              Entry
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => recordAttendance(participant.userId, "exit")}
                              className="border-red-600 text-red-600 hover:bg-red-50"
                              disabled={!!attendanceRecord?.exitTime}
                            >
                              <LogOut className="h-3 w-3 mr-1" />
                              Exit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {(participants as GroupParticipant[]).map((group, groupIndex) => (
              <Card key={group.groupId}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Group {groupIndex + 1} ({group.members.length} members)
                  </CardTitle>
                  <CardDescription>
                    Group ID: {group.groupId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Entry Time</TableHead>
                        <TableHead>Exit Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.members.map((member) => {
                        const attendanceRecord = getAttendanceStatus(member.userId);
                        return (
                          <TableRow key={member.userId}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.department}</TableCell>
                            <TableCell>{member.year}</TableCell>
                            <TableCell>{member.phoneNumber}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  attendanceRecord?.status === "PRESENT" ? "default" :
                                  attendanceRecord?.status === "PARTIAL" ? "secondary" : "destructive"
                                }
                                className="flex items-center gap-1"
                              >
                                {attendanceRecord?.status === "PRESENT" && <CheckCircle className="h-3 w-3" />}
                                {attendanceRecord?.status === "PARTIAL" && <AlertCircle className="h-3 w-3" />}
                                {attendanceRecord?.status === "ABSENT" && <XCircle className="h-3 w-3" />}
                                {attendanceRecord?.status || "ABSENT"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {attendanceRecord?.entryTime ? (
                                <div className="flex items-center gap-1 text-green-600">
                                  <Clock className="h-3 w-3" />
                                  {format(new Date(attendanceRecord.entryTime), "HH:mm:ss")}
                                </div>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                            <TableCell>
                              {attendanceRecord?.exitTime ? (
                                <div className="flex items-center gap-1 text-red-600">
                                  <Clock className="h-3 w-3" />
                                  {format(new Date(attendanceRecord.exitTime), "HH:mm:ss")}
                                </div>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => recordAttendance(member.userId, "entry", group.groupId)}
                                  className="bg-green-600 hover:bg-green-700"
                                  disabled={!!attendanceRecord?.entryTime}
                                >
                                  <LogIn className="h-3 w-3 mr-1" />
                                  Entry
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => recordAttendance(member.userId, "exit", group.groupId)}
                                  className="border-red-600 text-red-600 hover:bg-red-50"
                                  disabled={!!attendanceRecord?.exitTime}
                                >
                                  <LogOut className="h-3 w-3 mr-1" />
                                  Exit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {event?.eventType === "SOLO" 
                    ? (participants as Participant[]).length 
                    : (participants as GroupParticipant[]).reduce((acc, group) => acc + group.members.length, 0)
                  }
                </div>
                <div className="text-sm text-gray-600">Total Registered</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {attendance.filter(a => a.status === "PRESENT").length}
                </div>
                <div className="text-sm text-gray-600">Present</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {attendance.filter(a => a.status === "PARTIAL").length}
                </div>
                <div className="text-sm text-gray-600">Partial</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {attendance.filter(a => a.status === "ABSENT").length}
                </div>
                <div className="text-sm text-gray-600">Absent</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}