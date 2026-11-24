import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_RESOURCES,
  INITIAL_SUBJECTS,
  INITIAL_DEPARTMENTS,
  INITIAL_DEGREE_PROGRAMS,
  INITIAL_SEMESTERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_STUDENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';
import { saveFileToDB, deleteFileFromDB, triggerBrowserDownload } from '../services/indexedDb';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current user state (Student / Admin / Guest)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('noteshare_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Resources state
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('noteshare_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // Subjects state
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('noteshare_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  // Departments state
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('noteshare_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  // Degree programs state
  const [degreePrograms, setDegreePrograms] = useState(() => {
    const saved = localStorage.getItem('noteshare_degree_programs');
    return saved ? JSON.parse(saved) : INITIAL_DEGREE_PROGRAMS;
  });

  // Semesters state
  const [semesters, setSemesters] = useState(() => {
    const saved = localStorage.getItem('noteshare_semesters');
    return saved ? JSON.parse(saved) : INITIAL_SEMESTERS;
  });

  // Announcements state
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('noteshare_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Registered students state
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('noteshare_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // Student submissions (uploads pending review)
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('noteshare_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('noteshare_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Favorites (Array of resource IDs)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('noteshare_favorites');
    return saved ? JSON.parse(saved) : ['res-note-1', 'res-paper-1'];
  });

  // Downloads history
  const [downloads, setDownloads] = useState(() => {
    const saved = localStorage.getItem('noteshare_downloads');
    return saved ? JSON.parse(saved) : [
      {
        id: 'dl-1',
        resourceId: 'res-note-1',
        title: 'Data Structures Lecture Notes',
        subject: 'Computer Science',
        category: 'Notes',
        fileType: 'PDF',
        fileSize: '2.5 MB',
        downloadedAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'dl-2',
        resourceId: 'res-paper-1',
        title: 'Computer Science Final Term Paper 2024',
        subject: 'Computer Science',
        category: 'Past Papers',
        fileType: 'PDF',
        fileSize: '1.8 MB',
        downloadedAt: new Date(Date.now() - 3600000 * 48).toISOString()
      }
    ];
  });

  // Recently viewed resource IDs
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('noteshare_recently_viewed');
    return saved ? JSON.parse(saved) : ['res-note-1', 'res-paper-1', 'res-note-2'];
  });

  // Reported resources
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('noteshare_reports');
    return saved ? JSON.parse(saved) : [];
  });

  // Active resource in PDF Preview modal
  const [previewResource, setPreviewResource] = useState(null);

  // Active toast notification message
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('noteshare_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('noteshare_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('noteshare_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('noteshare_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('noteshare_degree_programs', JSON.stringify(degreePrograms));
  }, [degreePrograms]);

  useEffect(() => {
    localStorage.setItem('noteshare_semesters', JSON.stringify(semesters));
  }, [semesters]);

  useEffect(() => {
    localStorage.setItem('noteshare_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('noteshare_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('noteshare_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('noteshare_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('noteshare_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('noteshare_downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('noteshare_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('noteshare_reports', JSON.stringify(reports));
  }, [reports]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // --- AUTHENTICATION ---
  const login = (email, password, roleHint = 'student') => {
    if (roleHint === 'admin' || email.toLowerCase().includes('admin')) {
      const adminUser = {
        id: 'admin-1',
        name: 'Dr. Shahzad Tariq',
        email: email || 'admin@noteshare.edu',
        role: 'admin',
        title: 'Academic Repository Administrator',
        department: 'Academic Affairs',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
      };
      setUser(adminUser);
      showToast('Welcome back, Administrator Dr. Shahzad Tariq!', 'success');
      return { success: true, role: 'admin' };
    } else {
      // Find matching student or default demo student
      const matched = students.find((s) => s.email.toLowerCase() === email.toLowerCase()) || students[0];
      const studentUser = {
        id: matched?.id || 'std-1',
        name: matched?.name || 'Muhammad Bilal',
        email: email || 'student@noteshare.edu',
        role: 'student',
        regNo: matched?.regNo || 'FA22-BCS-089',
        department: matched?.department || 'Computer Science',
        degreeProgram: matched?.degreeProgram || 'BS Computer Science',
        semester: matched?.semester || 'Semester 4',
        avatar: matched?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop'
      };
      setUser(studentUser);
      showToast(`Welcome back, ${studentUser.name}!`, 'success');
      return { success: true, role: 'student' };
    }
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const registerStudent = (studentData) => {
    const newStudent = {
      id: `std-${Date.now()}`,
      name: studentData.fullName,
      email: studentData.email,
      regNo: studentData.regNo || `REG-${Math.floor(1000 + Math.random() * 9000)}`,
      department: studentData.department || 'Computer Science',
      degreeProgram: studentData.degreeProgram || 'BS Computer Science',
      semester: studentData.semester || 'Semester 1',
      session: studentData.session || '2024-2028',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: studentData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
      totalDownloads: 0,
      totalUploads: 0
    };

    setStudents((prev) => [newStudent, ...prev]);

    // Also notify admin
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        target: 'admin',
        title: 'New Student Registered',
        message: `${newStudent.name} registered in ${newStudent.degreeProgram} (${newStudent.semester}).`,
        time: 'Just now',
        read: false,
        type: 'admin_registration'
      },
      ...prev
    ]);

    // Automatically log in as new student
    const authed = {
      ...newStudent,
      role: 'student'
    };
    setUser(authed);
    showToast('Account created successfully! Welcome to NOTEshare.', 'success');
    return authed;
  };

  // --- RESOURCE CRUD (ADMIN & SYSTEM) ---
  const addResource = async (resourceData, file = null) => {
    const newId = `res-${Date.now()}`;
    if (file) {
      await saveFileToDB(newId, file, { title: resourceData.title });
    }

    const newResource = {
      id: newId,
      title: resourceData.title,
      description: resourceData.description || 'Comprehensive university educational material.',
      category: resourceData.category || 'Notes',
      subject: resourceData.subject || 'Computer Science',
      subjectCode: resourceData.subjectCode || 'CS-101',
      department: resourceData.department || 'Computer Science',
      degreeProgram: resourceData.degreeProgram || 'BS Computer Science',
      semester: resourceData.semester || 'Semester 1',
      academicYear: resourceData.academicYear || '2024-2025',
      examType: resourceData.examType || (resourceData.category === 'Past Papers' ? 'Final Term' : 'General Notes'),
      fileType: resourceData.fileType || (file?.name?.split('.').pop()?.toUpperCase() || 'PDF'),
      fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : (resourceData.fileSize || '2.1 MB'),
      pagesCount: resourceData.pagesCount || Math.floor(Math.random() * 50) + 10,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadRelative: 'Just now',
      uploader: {
        name: user?.name || 'Administrator',
        role: user?.role === 'admin' ? 'Faculty Admin' : 'Student Contributor',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
      },
      downloads: 0,
      likes: 0,
      isPublished: resourceData.isPublished !== undefined ? resourceData.isPublished : true,
      isFeatured: Boolean(resourceData.isFeatured),
      tags: resourceData.tags || [resourceData.subject, resourceData.category],
      rating: 5.0,
      reviewsCount: 1
    };

    setResources((prev) => [newResource, ...prev]);

    // Update subject resource counters
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.name.toLowerCase() === newResource.subject.toLowerCase()) {
          return {
            ...sub,
            notesCount: newResource.category === 'Notes' ? sub.notesCount + 1 : sub.notesCount,
            papersCount: newResource.category === 'Past Papers' ? sub.papersCount + 1 : sub.papersCount
          };
        }
        return sub;
      })
    );

    // Notify students
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        target: 'student',
        title: `New ${newResource.category} Uploaded`,
        message: `"${newResource.title}" for ${newResource.subject} is now available.`,
        time: 'Just now',
        read: false,
        type: newResource.category === 'Past Papers' ? 'paper' : 'note'
      },
      ...prev
    ]);

    showToast(`Resource "${newResource.title}" published successfully!`, 'success');
    return newResource;
  };

  const updateResource = (id, updatedFields) => {
    setResources((prev) =>
      prev.map((res) => (res.id === id ? { ...res, ...updatedFields } : res))
    );
    showToast('Resource updated successfully!', 'success');
  };

  const deleteResource = async (id) => {
    await deleteFileFromDB(id);
    setResources((prev) => prev.filter((res) => res.id !== id));
    setFavorites((prev) => prev.filter((fid) => fid !== id));
    showToast('Resource deleted from system.', 'info');
  };

  const bulkDeleteResources = async (ids) => {
    for (const id of ids) {
      await deleteFileFromDB(id);
    }
    setResources((prev) => prev.filter((res) => !ids.includes(res.id)));
    setFavorites((prev) => prev.filter((fid) => !ids.includes(fid)));
    showToast(`${ids.length} resources removed successfully.`, 'info');
  };

  const bulkPublishResources = (ids, status = true) => {
    setResources((prev) =>
      prev.map((res) => (ids.includes(res.id) ? { ...res, isPublished: status } : res))
    );
    showToast(`${ids.length} resources ${status ? 'published' : 'unpublished'}.`, 'success');
  };

  const togglePublish = (id) => {
    setResources((prev) =>
      prev.map((res) => {
        if (res.id === id) {
          const next = !res.isPublished;
          showToast(`Resource ${next ? 'published' : 'unpublished'}.`, 'info');
          return { ...res, isPublished: next };
        }
        return res;
      })
    );
  };

  // --- SUBJECT MANAGEMENT ---
  const addSubject = (data) => {
    const newSubject = {
      id: data.code.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: data.name,
      code: data.code,
      department: data.department || 'Computer Science',
      degreeProgram: data.degreeProgram || 'BS Computer Science',
      semester: data.semester || 'Semester 1',
      type: data.type || 'Core',
      notesCount: 0,
      papersCount: 0,
      icon: data.icon || 'BookOpen',
      description: data.description || 'Comprehensive curriculum subject.'
    };
    setSubjects((prev) => [newSubject, ...prev]);
    showToast(`Subject "${newSubject.name}" created successfully.`, 'success');
    return newSubject;
  };

  const updateSubject = (id, fields) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...fields } : s)));
    showToast('Subject updated.', 'success');
  };

  const deleteSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    showToast('Subject deleted.', 'info');
  };

  // --- DEPARTMENT MANAGEMENT ---
  const addDepartment = (deptData) => {
    const newDept = {
      id: deptData.code.toLowerCase(),
      name: deptData.name,
      code: deptData.code,
      description: deptData.description || 'Academic department',
      head: deptData.head || 'Department Chair',
      totalStudents: 0,
      totalPrograms: deptData.totalPrograms || 1
    };
    setDepartments((prev) => [newDept, ...prev]);
    showToast(`Department "${newDept.name}" added.`, 'success');
  };

  const updateDepartment = (id, fields) => {
    setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...fields } : d)));
    showToast('Department updated.', 'success');
  };

  const deleteDepartment = (id) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    showToast('Department removed.', 'info');
  };

  // --- DEGREE PROGRAM & SEMESTER ---
  const addDegreeProgram = (programData) => {
    const newProg = {
      id: `prog-${Date.now()}`,
      name: programData.name,
      code: programData.code,
      department: programData.department,
      duration: programData.duration || '4 Years (8 Semesters)'
    };
    setDegreePrograms((prev) => [newProg, ...prev]);
    showToast(`Program "${newProg.name}" created.`, 'success');
  };

  const deleteDegreeProgram = (id) => {
    setDegreePrograms((prev) => prev.filter((p) => p.id !== id));
    showToast('Program deleted.', 'info');
  };

  const addSemester = (semData) => {
    const newSem = {
      id: semesters.length + 1,
      name: semData.name || `Semester ${semesters.length + 1}`,
      label: semData.label || `${semesters.length + 1}th Semester`,
      term: semData.term || 'Fall/Spring'
    };
    setSemesters((prev) => [...prev, newSem]);
    showToast(`Semester "${newSem.name}" added.`, 'success');
  };

  const deleteSemester = (id) => {
    setSemesters((prev) => prev.filter((s) => s.id !== id));
    showToast('Semester removed.', 'info');
  };

  // --- ANNOUNCEMENTS ---
  const addAnnouncement = (data) => {
    const newAnc = {
      id: `anc-${Date.now()}`,
      title: data.title,
      description: data.description,
      category: data.category || 'General',
      publishDate: data.publishDate || new Date().toISOString().split('T')[0],
      expiryDate: data.expiryDate || '2026-12-31',
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      pinned: Boolean(data.pinned),
      author: data.author || user?.name || 'Academic Administrator',
      targetDepartment: data.targetDepartment || 'All Departments'
    };
    setAnnouncements((prev) => [newAnc, ...prev]);

    // Student notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        target: 'student',
        title: `Announcement: ${newAnc.title}`,
        message: newAnc.description.slice(0, 100) + '...',
        time: 'Just now',
        read: false,
        type: 'announcement'
      },
      ...prev
    ]);

    showToast('Announcement posted successfully.', 'success');
    return newAnc;
  };

  const updateAnnouncement = (id, fields) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...fields } : a)));
    showToast('Announcement updated.', 'success');
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('Announcement deleted.', 'info');
  };

  // --- STUDENT SUBMISSIONS WORKFLOW ---
  const submitResource = async (subData, file = null) => {
    const subId = `sub-${Date.now()}`;
    if (file) {
      await saveFileToDB(subId, file, { title: subData.title, student: user?.name });
    }

    const newSub = {
      id: subId,
      title: subData.title,
      description: subData.description,
      studentName: user?.name || 'Anonymous Student',
      studentEmail: user?.email || 'student@noteshare.edu',
      studentRegNo: user?.regNo || 'REG-USER',
      subject: subData.subject,
      category: subData.category || 'Notes',
      department: subData.department || user?.department || 'Computer Science',
      semester: subData.semester || user?.semester || 'Semester 1',
      academicYear: subData.academicYear || '2024-2025',
      fileType: file ? file.name.split('.').pop().toUpperCase() : 'PDF',
      fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '2.0 MB',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
      remarks: ''
    };

    setSubmissions((prev) => [newSub, ...prev]);

    // Notify admin
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        target: 'admin',
        title: 'New Student Submission',
        message: `${newSub.studentName} submitted "${newSub.title}" for review.`,
        time: 'Just now',
        read: false,
        type: 'admin_submission'
      },
      ...prev
    ]);

    showToast('Your material was submitted for admin review!', 'success');
    return newSub;
  };

  const approveSubmission = async (subId) => {
    const sub = submissions.find((s) => s.id === subId);
    if (!sub) return;

    // Create published resource from submission
    const resId = `res-pub-${Date.now()}`;
    const newResource = {
      id: resId,
      title: sub.title,
      description: sub.description,
      category: sub.category,
      subject: sub.subject,
      subjectCode: 'CS-101',
      department: sub.department,
      degreeProgram: 'BS Computer Science',
      semester: sub.semester,
      academicYear: sub.academicYear,
      examType: sub.category === 'Past Papers' ? 'Past Examination' : 'Student Notes',
      fileType: sub.fileType,
      fileSize: sub.fileSize,
      pagesCount: 15,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadRelative: 'Just now',
      uploader: {
        name: sub.studentName,
        role: 'Student Contributor',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop'
      },
      downloads: 1,
      likes: 1,
      isPublished: true,
      isFeatured: false,
      tags: [sub.subject, sub.category, 'Student Contributed'],
      rating: 5.0,
      reviewsCount: 1
    };

    // Update submission record
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Approved', remarks: 'Verified by Administrator' } : s))
    );

    // Add to public resource library
    setResources((prev) => [newResource, ...prev]);

    // Notify student
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        target: 'student',
        title: 'Submission Approved! 🎉',
        message: `Your material "${sub.title}" has been verified and published to NOTEshare.`,
        time: 'Just now',
        read: false,
        type: 'submission'
      },
      ...prev
    ]);

    showToast(`Submission "${sub.title}" approved and published!`, 'success');
  };

  const rejectSubmission = (subId, reason = 'Does not meet academic guidelines') => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Rejected', remarks: reason } : s))
    );

    // Notify student
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        target: 'student',
        title: 'Submission Update',
        message: `Your submission was not approved: ${reason}`,
        time: 'Just now',
        read: false,
        type: 'submission'
      },
      ...prev
    ]);

    showToast('Submission rejected.', 'info');
  };

  const deleteSubmission = (subId) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== subId));
    showToast('Submission deleted.', 'info');
  };

  // --- STUDENT RECORD MANAGEMENT (ADMIN) ---
  const toggleStudentStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = s.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`Student status updated to ${newStatus}.`, 'info');
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  const updateStudent = (id, fields) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...fields } : s)));
    // If updating current user profile
    if (user && user.id === id) {
      setUser((prev) => ({ ...prev, ...fields }));
    }
    showToast('Student profile updated.', 'success');
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('Student record removed.', 'info');
  };

  // --- FAVORITES & DOWNLOADS ---
  const toggleFavorite = (resourceId) => {
    setFavorites((prev) => {
      const exists = prev.includes(resourceId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter((id) => id !== resourceId);
      } else {
        showToast('Saved to your favorites ❤️', 'success');
        return [...prev, resourceId];
      }
    });
  };

  const isFavorite = (resourceId) => favorites.includes(resourceId);

  const recordDownload = async (resource) => {
    // Record download locally
    const newDl = {
      id: `dl-${Date.now()}`,
      resourceId: resource.id,
      title: resource.title,
      subject: resource.subject,
      category: resource.category,
      fileType: resource.fileType || 'PDF',
      fileSize: resource.fileSize || '2.0 MB',
      downloadedAt: new Date().toISOString()
    };

    setDownloads((prev) => [newDl, ...prev]);

    // Increment downloads count in resource list
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloads: (r.downloads || 0) + 1 } : r))
    );

    // Trigger physical browser download
    await triggerBrowserDownload(resource);
    showToast(`Downloading "${resource.title}"...`, 'success');
  };

  const recordView = (resourceId) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== resourceId);
      return [resourceId, ...filtered].slice(0, 10);
    });
  };

  // --- REPORTING ---
  const reportResource = (resourceId, reason, comment) => {
    const reportItem = {
      id: `rep-${Date.now()}`,
      resourceId,
      reason,
      comment,
      reportedBy: user?.name || 'Anonymous Student',
      reportedAt: new Date().toISOString(),
      status: 'Pending'
    };
    setReports((prev) => [reportItem, ...prev]);
    showToast('Thank you. Resource report submitted to administrator.', 'info');
  };

  const resolveReport = (reportId) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: 'Resolved' } : r)));
    showToast('Report marked as resolved.', 'success');
  };

  // --- NOTIFICATION ACTIONS ---
  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        registerStudent,
        resources,
        addResource,
        updateResource,
        deleteResource,
        bulkDeleteResources,
        bulkPublishResources,
        togglePublish,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        departments,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        degreePrograms,
        addDegreeProgram,
        deleteDegreeProgram,
        semesters,
        addSemester,
        deleteSemester,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        students,
        updateStudent,
        toggleStudentStatus,
        deleteStudent,
        submissions,
        submitResource,
        approveSubmission,
        rejectSubmission,
        deleteSubmission,
        favorites,
        toggleFavorite,
        isFavorite,
        downloads,
        recordDownload,
        recentlyViewed,
        recordView,
        notifications,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        reports,
        reportResource,
        resolveReport,
        previewResource,
        setPreviewResource,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
