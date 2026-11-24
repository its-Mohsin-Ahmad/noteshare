import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { ExploreResources } from './pages/public/ExploreResources';
import { Notes } from './pages/public/Notes';
import { PastPapers } from './pages/public/PastPapers';
import { Subjects } from './pages/public/Subjects';
import { About } from './pages/public/About';
import { Login } from './pages/public/Login';
import { CreateAccount } from './pages/public/CreateAccount';
import { ForgotPassword } from './pages/public/ForgotPassword';
import { ResourceDetails } from './pages/public/ResourceDetails';
import { ContactUs } from './pages/public/ContactUs';
import { FAQ } from './pages/public/FAQ';
import { PrivacyPolicy } from './pages/public/PrivacyPolicy';
import { TermsConditions } from './pages/public/TermsConditions';

// Student Pages
import { StudentOverview } from './pages/student/StudentOverview';
import { StudentDownloads } from './pages/student/StudentDownloads';
import { StudentFavorites } from './pages/student/StudentFavorites';
import { StudentUploads } from './pages/student/StudentUploads';
import { StudentNotifications } from './pages/student/StudentNotifications';
import { StudentAnnouncements } from './pages/student/StudentAnnouncements';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentSettings } from './pages/student/StudentSettings';

// Admin Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminResources } from './pages/admin/AdminResources';
import { AdminUpload } from './pages/admin/AdminUpload';
import { AdminSubjects } from './pages/admin/AdminSubjects';
import { AdminDepartments } from './pages/admin/AdminDepartments';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminSemesters } from './pages/admin/AdminSemesters';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminSubmissions } from './pages/admin/AdminSubmissions';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminProfile } from './pages/admin/AdminProfile';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreResources />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/past-papers" element={<PastPapers />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/resource/:id" element={<ResourceDetails />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
          </Route>

          {/* Student Dashboard Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentOverview />} />
            <Route path="explore" element={<ExploreResources />} />
            <Route path="notes" element={<Notes />} />
            <Route path="past-papers" element={<PastPapers />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="downloads" element={<StudentDownloads />} />
            <Route path="favorites" element={<StudentFavorites />} />
            <Route path="uploads" element={<StudentUploads />} />
            <Route path="notifications" element={<StudentNotifications />} />
            <Route path="announcements" element={<StudentAnnouncements />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="resources" element={<AdminResources pageTitle="Manage All Resources" />} />
            <Route
              path="notes"
              element={<AdminResources filterCategory="Notes" pageTitle="Manage Lecture Notes" />}
            />
            <Route
              path="past-papers"
              element={<AdminResources filterCategory="Past Papers" pageTitle="Manage Examination Papers" />}
            />
            <Route path="upload" element={<AdminUpload />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="departments" element={<AdminDepartments />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="semesters" element={<AdminSemesters />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
