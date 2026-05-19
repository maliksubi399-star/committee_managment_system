"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserProfile = {
  name: string;
  email: string;
  initials: string;
  phone: string;
  address: string;
  bankName: string;
  accountTitle: string;
  iban: string;
  verified: boolean;
  kycStatus: "Unverified" | "Pending" | "Verified";
  trustScore: number;
};

export type UserCommittee = {
  id: string;
  name: string;
  role: "Member" | "Creator";
  amount: string;
  totalPool: string;
  progress: number;
  month: string;
  nextPaymentDate: string;
  myPayoutMonth: string;
  status: "Active" | "Recruiting" | "Completed";
  members: { name: string; initials: string; status: "Paid" | "Pending" | "Upcoming"; currentMonth: boolean; isMe?: boolean }[];
};

export type BrowseCommittee = {
  id: string;
  name: string;
  amount: string;
  payout: string;
  members: number;
  maxMembers: number;
  duration: string;
  risk: "Low" | "Medium" | "High";
  trustRequired: number;
};

export type DuePayment = {
  id: string;
  committeeName: string;
  amount: string;
  dueDate: string;
  daysLeft: number;
  status: "Unpaid" | "Paid";
};

export type PaymentHistory = {
  date: string;
  committeeName: string;
  amount: string;
  status: "Paid";
};

type UserDataContextType = {
  profile: UserProfile;
  myCommittees: UserCommittee[];
  browseCommittees: BrowseCommittee[];
  upcomingDues: DuePayment[];
  paymentHistory: PaymentHistory[];
  totalPaidContributions: number;
  
  joinCommittee: (id: string) => boolean;
  payDue: (id: string) => void;
  updateBankInfo: (bank: string, title: string, iban: string) => void;
  updatePersonalInfo: (name: string, email: string, phone: string, address: string) => void;
  submitKYCDocuments: () => void;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const initialProfile: UserProfile = {
  name: "Zainab Raza",
  email: "zainab.raza@example.com",
  initials: "ZR",
  phone: "+92 300 1234567",
  address: "Phase 6, DHA, Lahore",
  bankName: "Habib Bank Limited (HBL)",
  accountTitle: "Zainab Raza",
  iban: "PK35 HABB 0000 1234 5678 9012",
  verified: true,
  kycStatus: "Verified",
  trustScore: 92,
};

const initialMyCommittees: UserCommittee[] = [
  { 
    id: "mc-1",
    name: "Elite Savings Circle", 
    role: "Member", 
    amount: "50,000", 
    totalPool: "500,000",
    progress: 40, 
    month: "Month 4 of 10",
    nextPaymentDate: "05 May, 2024",
    myPayoutMonth: "August 2024",
    status: "Active",
    members: [
      { name: "Ahmed Khan", initials: "AK", status: "Paid", currentMonth: true },
      { name: "Fatima Ali", initials: "FA", status: "Paid", currentMonth: false },
      { name: "Zainab Raza", initials: "ZR", status: "Pending", currentMonth: false, isMe: true },
      { name: "Omar Tariq", initials: "OT", status: "Upcoming", currentMonth: false },
    ]
  },
  { 
    id: "mc-2",
    name: "Family Trust Pool", 
    role: "Creator", 
    amount: "25,000", 
    totalPool: "150,000",
    progress: 83, 
    month: "Month 5 of 6",
    nextPaymentDate: "10 May, 2024",
    myPayoutMonth: "June 2024",
    status: "Active",
    members: [
      { name: "Sara Saeed", initials: "SS", status: "Paid", currentMonth: false },
      { name: "Usman Ghani", initials: "UG", status: "Paid", currentMonth: false },
      { name: "Zainab Raza", initials: "ZR", status: "Paid", currentMonth: true, isMe: true },
    ]
  }
];

const initialBrowseCommittees: BrowseCommittee[] = [
  { id: "b-1", name: "Premium Wealth Circle", amount: "100,000", payout: "1.2M", members: 8, maxMembers: 12, duration: "12 Mos", risk: "Low", trustRequired: 80 },
  { id: "b-2", name: "Young Professionals Pool", amount: "20,000", payout: "200K", members: 7, maxMembers: 10, duration: "10 Mos", risk: "Low", trustRequired: 40 },
  { id: "b-3", name: "DHA SME Growth Fund", amount: "150,000", payout: "1.5M", members: 6, maxMembers: 10, duration: "10 Mos", risk: "Medium", trustRequired: 85 },
  { id: "b-4", name: "Secure Savings Pool", amount: "10,000", payout: "120K", members: 11, maxMembers: 12, duration: "12 Mos", risk: "Low", trustRequired: 30 },
  { id: "b-5", name: "High-Yield Syndicate", amount: "250,000", payout: "2.5M", members: 3, maxMembers: 10, duration: "10 Mos", risk: "High", trustRequired: 90 },
];

const initialDues: DuePayment[] = [
  { id: "due-1", committeeName: "Elite Savings Circle", amount: "50,000", dueDate: "05 May, 2024", daysLeft: 3, status: "Unpaid" },
  { id: "due-2", committeeName: "Family Trust Pool", amount: "25,000", dueDate: "10 May, 2024", daysLeft: 8, status: "Unpaid" },
];

const initialHistory: PaymentHistory[] = [
  { date: "05 Apr, 2024", committeeName: "Elite Savings Circle", amount: "50,000", status: "Paid" },
  { date: "10 Apr, 2024", committeeName: "Family Trust Pool", amount: "25,000", status: "Paid" },
  { date: "05 Mar, 2024", committeeName: "Elite Savings Circle", amount: "50,000", status: "Paid" },
  { date: "10 Mar, 2024", committeeName: "Family Trust Pool", amount: "25,000", status: "Paid" },
  { date: "05 Feb, 2024", committeeName: "Elite Savings Circle", amount: "50,000", status: "Paid" },
];

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [myCommittees, setMyCommittees] = useState<UserCommittee[]>(initialMyCommittees);
  const [browseCommittees, setBrowseCommittees] = useState<BrowseCommittee[]>(initialBrowseCommittees);
  const [upcomingDues, setUpcomingDues] = useState<DuePayment[]>(initialDues);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>(initialHistory);
  const [totalPaidContributions, setTotalPaidContributions] = useState<number>(150000); // initial Rs. 150,000

  const joinCommittee = (id: string): boolean => {
    const committeeToJoin = browseCommittees.find(c => c.id === id);
    if (!committeeToJoin) return false;

    // Check trust score requirement
    if (profile.trustScore < committeeToJoin.trustRequired) {
      return false;
    }

    // Add to My Committees
    const joined: UserCommittee = {
      id: `mc-${myCommittees.length + 1}`,
      name: committeeToJoin.name,
      role: "Member",
      amount: committeeToJoin.amount,
      totalPool: (parseInt(committeeToJoin.amount.replace(/,/g, '')) * committeeToJoin.maxMembers).toLocaleString(),
      progress: 0,
      month: "Month 1 of " + committeeToJoin.duration.split(" ")[0],
      nextPaymentDate: "01 of next month",
      myPayoutMonth: "End of tenure",
      status: "Recruiting",
      members: [
        { name: "Ahmed Khan", initials: "AK", status: "Paid", currentMonth: true },
        { name: profile.name, initials: profile.initials, status: "Paid", currentMonth: false, isMe: true },
      ]
    };

    setMyCommittees([...myCommittees, joined]);

    // Update browse member count
    setBrowseCommittees(browseCommittees.map(c => 
      c.id === id ? { ...c, members: c.members + 1 } : c
    ));

    // Create a new future due payment
    const newDue: DuePayment = {
      id: `due-${upcomingDues.length + 1}`,
      committeeName: committeeToJoin.name,
      amount: committeeToJoin.amount,
      dueDate: "01 of next month",
      daysLeft: 12,
      status: "Unpaid"
    };
    setUpcomingDues([...upcomingDues, newDue]);

    return true;
  };

  const payDue = (id: string) => {
    const targetDue = upcomingDues.find(d => d.id === id);
    if (!targetDue) return;

    // Remove from upcoming dues
    setUpcomingDues(upcomingDues.filter(d => d.id !== id));

    // Add to payment history
    const dateStr = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    setPaymentHistory([
      { date: dateStr, committeeName: targetDue.committeeName, amount: targetDue.amount, status: "Paid" },
      ...paymentHistory
    ]);

    // Add to total contributions
    const numericAmt = parseInt(targetDue.amount.replace(/,/g, ''));
    setTotalPaidContributions(prev => prev + numericAmt);

    // Update specific committee roster status to "Paid" for current month
    setMyCommittees(myCommittees.map(c => {
      if (c.name === targetDue.committeeName) {
        return {
          ...c,
          members: c.members.map(m => m.isMe ? { ...m, status: "Paid" } : m)
        };
      }
      return c;
    }));
  };

  const updateBankInfo = (bank: string, title: string, iban: string) => {
    setProfile(prev => ({
      ...prev,
      bankName: bank,
      accountTitle: title,
      iban: iban
    }));
  };

  const updatePersonalInfo = (name: string, email: string, phone: string, address: string) => {
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
    setProfile(prev => ({
      ...prev,
      name,
      email,
      phone,
      address,
      initials
    }));
  };

  const submitKYCDocuments = () => {
    setProfile(prev => ({
      ...prev,
      kycStatus: "Pending"
    }));
  };

  return (
    <UserDataContext.Provider
      value={{
        profile,
        myCommittees,
        browseCommittees,
        upcomingDues,
        paymentHistory,
        totalPaidContributions,
        joinCommittee,
        payDue,
        updateBankInfo,
        updatePersonalInfo,
        submitKYCDocuments
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
