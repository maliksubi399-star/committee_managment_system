"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  score: number;
  status: "Active" | "Pending" | "Suspended";
  committees: number;
  joined: string;
};

export type Committee = {
  id: string;
  name: string;
  duration: string;
  creator: string;
  members: number;
  maxMembers: number;
  amount: string;
  status: "Active" | "Recruiting" | "Completed";
};

export type Verification = {
  id: string;
  name: string;
  email: string;
  initials: string;
  docType: string;
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
};

export type Report = {
  id: string;
  reporter: string;
  reason: string;
  target: string;
  severity: "High" | "Medium" | "Low";
  date: string;
  status: "Open" | "Resolved" | "Ignored";
};

type AdminDataContextType = {
  users: User[];
  committees: Committee[];
  verifications: Verification[];
  reports: Report[];
  
  suspendUser: (id: string) => void;
  deleteUser: (id: string) => void;
  
  lockCommittee: (id: string) => void;
  deleteCommittee: (id: string) => void;
  
  approveVerification: (id: string) => void;
  rejectVerification: (id: string) => void;
  
  resolveReport: (id: string) => void;
  addCommittee: (committee: Omit<Committee, 'id'>) => void;
};

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: "1", name: "Ahmed Khan", email: "ahmed@example.com", initials: "AK", score: 85, status: "Active", committees: 2, joined: "12 Oct, 2023" },
  { id: "2", name: "Fatima Ali", email: "fatima@example.com", initials: "FA", score: 0, status: "Pending", committees: 0, joined: "18 Nov, 2023" },
  { id: "3", name: "Zainab Raza", email: "zainab@example.com", initials: "ZR", score: 92, status: "Active", committees: 4, joined: "05 Jan, 2024" },
  { id: "4", name: "Omar Tariq", email: "omar@example.com", initials: "OT", score: 45, status: "Suspended", committees: 1, joined: "22 Feb, 2024" },
  { id: "5", name: "Sara Saeed", email: "sara@example.com", initials: "SS", score: 78, status: "Active", committees: 1, joined: "10 Mar, 2024" },
];

const initialCommittees: Committee[] = [
  { id: "1", name: "Elite Savings Circle", duration: "10 months", creator: "Zainab Raza", members: 10, maxMembers: 10, amount: "50,000", status: "Active" },
  { id: "2", name: "Tech Founders Fund", duration: "12 months", creator: "Ahmed Khan", members: 8, maxMembers: 12, amount: "100,000", status: "Recruiting" },
  { id: "3", name: "Family Trust Pool", duration: "6 months", creator: "Sara Saeed", members: 6, maxMembers: 6, amount: "25,000", status: "Active" },
  { id: "4", name: "Neighborhood Co-op", duration: "20 months", creator: "Omar Tariq", members: 20, maxMembers: 20, amount: "10,000", status: "Completed" },
  { id: "5", name: "Women Entrepreneurs", duration: "10 months", creator: "Fatima Ali", members: 5, maxMembers: 10, amount: "75,000", status: "Recruiting" },
];

const initialVerifications: Verification[] = [
  { id: "1", name: "Fatima Ali", email: "fatima@example.com", initials: "FA", docType: "CNIC (Front & Back)", submitted: "2 hours ago", status: "Pending" },
  { id: "2", name: "Omar Tariq", email: "omar@example.com", initials: "OT", docType: "Passport", submitted: "5 hours ago", status: "Pending" },
  { id: "3", name: "Usman Ghani", email: "usman@example.com", initials: "UG", docType: "CNIC (Front)", submitted: "1 day ago", status: "Pending" },
];

const initialReports: Report[] = [
  { id: "1", reporter: "Sara Saeed", reason: "Non-payment in committee", target: "Omar Tariq (User)", severity: "High", date: "2 hours ago", status: "Open" },
  { id: "2", reporter: "Ahmed Khan", reason: "Suspicious committee behavior", target: "Tech Founders Fund (Committee)", severity: "Medium", date: "1 day ago", status: "Open" },
  { id: "3", reporter: "Zainab Raza", reason: "Inappropriate language", target: "Ali Hassan (User)", severity: "Low", date: "3 days ago", status: "Resolved" },
];

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [committees, setCommittees] = useState<Committee[]>(initialCommittees);
  const [verifications, setVerifications] = useState<Verification[]>(initialVerifications);
  const [reports, setReports] = useState<Report[]>(initialReports);

  const suspendUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "Suspended" } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const lockCommittee = (id: string) => {
    setCommittees(committees.map(c => c.id === id ? { ...c, status: "Completed" } : c));
  };

  const deleteCommittee = (id: string) => {
    setCommittees(committees.filter(c => c.id !== id));
  };

  const approveVerification = (id: string) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: "Approved" } : v));
  };

  const rejectVerification = (id: string) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: "Rejected" } : v));
  };

  const resolveReport = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: "Resolved" } : r));
  };

  const addCommittee = (committee: Omit<Committee, 'id'>) => {
    const newId = (committees.length + 1).toString();
    setCommittees([...committees, { ...committee, id: newId }]);
  };

  return (
    <AdminDataContext.Provider
      value={{
        users,
        committees,
        verifications,
        reports,
        suspendUser,
        deleteUser,
        lockCommittee,
        deleteCommittee,
        approveVerification,
        rejectVerification,
        resolveReport,
        addCommittee,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
