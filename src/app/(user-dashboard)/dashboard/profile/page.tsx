import { UserCircle, ShieldCheck, Camera, UploadCloud, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ProfileAndKYC() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile & KYC</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and identity verification.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Edit Profile</button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-3xl">
                    ZR
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Zainab Raza</h4>
                  <p className="text-gray-500 text-sm">Joined January 2024</p>
                  <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified User
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
                  <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Zainab Raza</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                  <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2">zainab.raza@example.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                  <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2">+92 300 1234567</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                  <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Phase 6, DHA, Lahore</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Bank Information</h3>
              <p className="text-sm text-gray-500 mt-1">This account will be used for your committee payouts.</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Bank Name</p>
                  <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Habib Bank Limited (HBL)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Account Title</p>
                  <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Zainab Raza</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500 mb-1">IBAN Number</p>
                  <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2">PK35 HABB 0000 1234 5678 9012</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KYC Verification Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Identity Verification</h3>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Identity Verified</h4>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">Your identity has been successfully verified by our trust and safety team.</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">CNIC (Front & Back)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Approved on 10 Jan, 2024</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>

            {/* If pending/unverified state: */}
            {/* 
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Verification Required</h4>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">You need to verify your identity before joining any committees.</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-3" />
              <p className="text-sm font-semibold text-gray-900">Upload CNIC</p>
              <p className="text-xs text-gray-500 mt-1 text-center">JPG, PNG or PDF (Max 5MB)</p>
            </div>
            */}

          </div>
        </div>

      </div>
    </div>
  );
}
