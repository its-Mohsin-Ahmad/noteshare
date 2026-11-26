import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import {
  supabase,
  uploadFileToStorage,
  mapResourceFromDB,
  mapResourceToDB,
  mapSubjectFromDB,
  mapSubjectToDB,
  mapDepartmentFromDB,
  mapDepartmentToDB,
  mapDegreeProgramFromDB,
  mapDegreeProgramToDB,
  mapSemesterFromDB,
  mapSemesterToDB,
  mapStudentFromDB,
  mapStudentToDB,
  mapAnnouncementFromDB,
  mapAnnouncementToDB,
  mapSubmissionFromDB,
  mapSubmissionToDB,
  mapNotificationFromDB,
  mapNotificationToDB
} from '../services/supabase';
import { saveFileToDB, deleteFileFromDB, triggerBrowserDownload } from '../services/indexedDb';

const AppContext = createContext();

const safeLoad = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'undefined' || saved === 'null') return fallback;
    return JSON.parse(saved);
  } catch (err) {
    console.warn(`Failed to parse localStorage key "${key}":`, err);
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  // Current user state (Student / Admin / Guest)
  const [user, setUser] = useState(() => safeLoad('noteshare_user', null));

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Core entities state
  const [resources, setResources] = useState(() => safeLoad('noteshare_resources', INITIAL_RESOURCES));
  const [subjects, setSubjects] = useState(() => safeLoad('noteshare_subjects', INITIAL_SUBJECTS));
  const [departments, setDepartments] = useState(() => safeLoad('noteshare_departments', INITIAL_DEPARTMENTS));
  const [degreePrograms, setDegreePrograms] = useState(() => safeLoad('noteshare_degree_programs', INITIAL_DEGREE_PROGRAMS));
  const [semesters, setSemesters] = useState(() => safeLoad('noteshare_semesters', INITIAL_SEMESTERS));
  const [announcements, setAnnouncements] = useState(() => safeLoad('noteshare_announcements', INITIAL_ANNOUNCEMENTS));
  const [students, setStudents] = useState(() => safeLoad('noteshare_students', INITIAL_STUDENTS));
  const [submissions, setSubmissions] = useState(() => safeLoad('noteshare_submissions', INITIAL_SUBMISSIONS));
  const [notifications, setNotifications] = useState(() => safeLoad('noteshare_notifications', INITIAL_NOTIFICATIONS));

  // User-specific state
  const [favorites, setFavorites] = useState(() => safeLoad('noteshare_favorites', ['res-note-1', 'res-paper-1']));
  const [downloads, setDownloads] = useState(() => safeLoad('noteshare_downloads', [
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
  ]));

  // Recently viewed resource IDs
  const [recentlyViewed, setRecentlyViewed] = useState(() => safeLoad('noteshare_recently_viewed', ['res-note-1', 'res-paper-1', 'res-note-2']));

  // Reported resources
  const [reports, setReports] = useState(() => safeLoad('noteshare_reports', []));

  // Active resource in PDF Preview modal
  const [previewResource, setPreviewResource] = useState(null);

  // Active toast notification message
  const [toast, setToast] = useState(null);

  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  // --- INITIAL DATA FETCH FROM SUPABASE ---
  const fetchDataFromSupabase = useCallback(async () => {
    try {
      setIsLoading(true);

      const [
        resRes,
        subRes,
        deptRes,
        progRes,
        semRes,
        ancRes,
        stdRes,
        submRes,
        notifRes
      ] = await Promise.all([
        supabase.from('resources').select('*').order('created_at', { ascending: false }),
        supabase.from('subjects').select('*').order('name', { ascending: true }),
        supabase.from('departments').select('*').order('name', { ascending: true }),
        supabase.from('degree_programs').select('*').order('name', { ascending: true }),
        supabase.from('semesters').select('*').order('id', { ascending: true }),
        supabase.from('announcements').select('*').order('created_at', { ascending: false }),
        supabase.from('students').select('*').order('joined_at', { ascending: false }),
        supabase.from('submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('notifications').select('*').order('created_at', { ascending: false })
      ]);

      if (resRes.data && resRes.data.length > 0) {
        setResources(resRes.data.map(mapResourceFromDB));
      }
      if (subRes.data && subRes.data.length > 0) {
        setSubjects(subRes.data.map(mapSubjectFromDB));
      }
      if (deptRes.data && deptRes.data.length > 0) {
        setDepartments(deptRes.data.map(mapDepartmentFromDB));
      }
      if (progRes.data && progRes.data.length > 0) {
        setDegreePrograms(progRes.data.map(mapDegreeProgramFromDB));
      }
      if (semRes.data && semRes.data.length > 0) {
        setSemesters(semRes.data.map(mapSemesterFromDB));
      }
      if (ancRes.data && ancRes.data.length > 0) {
        setAnnouncements(ancRes.data.map(mapAnnouncementFromDB));
      }
      if (stdRes.data && stdRes.data.length > 0) {
        setStudents(stdRes.data.map(mapStudentFromDB));
      }
      if (submRes.data && submRes.data.length > 0) {
        setSubmissions(submRes.data.map(mapSubmissionFromDB));
      }
      if (notifRes.data && notifRes.data.length > 0) {
        setNotifications(notifRes.data.map(mapNotificationFromDB));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, continuing with cached/initial data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch favorites and downloads for active user from Supabase
  const fetchUserData = useCallback(async (userEmail) => {
    if (!userEmail) return;
    try {
      const [favRes, dlRes] = await Promise.all([
        supabase.from('user_favorites').select('resource_id').eq('user_email', userEmail),
        supabase.from('user_downloads').select('*').eq('user_email', userEmail).order('downloaded_at', { ascending: false })
      ]);

      if (favRes.data && favRes.data.length > 0) {
        setFavorites(favRes.data.map(f => f.resource_id));
      }
      if (dlRes.data && dlRes.data.length > 0) {
        setDownloads(dlRes.data.map(d => ({
          id: `dl-${d.id}`,
          resourceId: d.resource_id,
          title: d.resource_title || 'Resource',
          subject: d.subject || '',
          category: d.category || 'Notes',
          fileType: d.file_type || 'PDF',
          fileSize: d.file_size || '2.0 MB',
          downloadedAt: d.downloaded_at
        })));
      }
    } catch (err) {
      console.warn('Error fetching user data from Supabase:', err);
    }
  }, []);

  // On mount: fetch all data
  useEffect(() => {
    fetchDataFromSupabase();
  }, [fetchDataFromSupabase]);

  // When user changes, sync their favorites/downloads
  useEffect(() => {
    if (user?.email) {
      fetchUserData(user.email);
    }
  }, [user, fetchUserData]);

  // Keep localStorage as an instant cache
  useEffect(() => { localStorage.setItem('noteshare_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('noteshare_resources', JSON.stringify(resources)); }, [resources]);
  useEffect(() => { localStorage.setItem('noteshare_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('noteshare_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('noteshare_degree_programs', JSON.stringify(degreePrograms)); }, [degreePrograms]);
  useEffect(() => { localStorage.setItem('noteshare_semesters', JSON.stringify(semesters)); }, [semesters]);
  useEffect(() => { localStorage.setItem('noteshare_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('noteshare_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('noteshare_submissions', JSON.stringify(submissions)); }, [submissions]);
  useEffect(() => { localStorage.setItem('noteshare_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('noteshare_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('noteshare_downloads', JSON.stringify(downloads)); }, [downloads]);
  useEffect(() => { localStorage.setItem('noteshare_recently_viewed', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
  useEffect(() => { localStorage.setItem('noteshare_reports', JSON.stringify(reports)); }, [reports]);

  // --- AUTHENTICATION ---
  const login = async (email, password, roleHint = null) => {
    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter your registered email address.' };
    }

    // 1. Check if logging in as Administrator
    const isAdminEmail = cleanEmail === 'admin@noteshare.edu' || cleanEmail === 'shahzad.admin@noteshare.edu' || roleHint === 'admin';

    if (isAdminEmail) {
      // Validate admin password
      let adminPasswordValid = password === 'admin123' || password === 'password123';
      if (!adminPasswordValid) {
        try {
          const { error: authErr } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
          if (!authErr) adminPasswordValid = true;
        } catch (e) {
          adminPasswordValid = false;
        }
      }

      if (!adminPasswordValid) {
        return { success: false, error: 'Incorrect administrator password. Please try again.' };
      }

      const adminUser = {
        id: 'admin-1',
        name: 'Dr. Shahzad Tariq',
        email: cleanEmail === 'admin@noteshare.edu' ? 'admin@noteshare.edu' : cleanEmail,
        role: 'admin',
        title: 'Academic Repository Administrator',
        department: 'Academic Affairs',
        avatar: user?.role === 'admin' && user?.avatar ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
      };
      setUser(adminUser);
      showToast('Welcome back, Administrator Dr. Shahzad Tariq!', 'success');
      return { success: true, role: 'admin' };
    }

    // 2. Query live Supabase database directly for authoritative student credentials & fresh data
    let matchedStudent = null;
    try {
      const { data: dbStudent, error: dbErr } = await supabase
        .from('students')
        .select('*')
        .ilike('email', cleanEmail)
        .maybeSingle();

      if (dbStudent && !dbErr) {
        matchedStudent = mapStudentFromDB(dbStudent);
        setStudents((prev) => [matchedStudent, ...prev.filter((s) => s.id !== matchedStudent.id)]);
      }
    } catch (err) {
      console.warn('Live student database lookup error:', err);
    }

    // Fallback to local memory if offline/network failure
    if (!matchedStudent) {
      matchedStudent = students.find((s) => s.email?.toLowerCase() === cleanEmail);
    }

    // 4. Strict check: If account is not found anywhere, reject and show error!
    if (!matchedStudent) {
      return {
        success: false,
        error: 'Account not found with this email. Please check your spelling or click "Signup".'
      };
    }

    // 5. Strict Password Validation: Check against Supabase Auth session, DB password, and demo defaults
    let passwordMatches = false;

    // A. Check against Supabase Auth session first
    if (password) {
      try {
        const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });
        if (authData?.user && !authErr) {
          passwordMatches = true;
        }
      } catch (e) {
        // Auth check error
      }
    }

    // B. Check against student record's saved password in DB
    if (!passwordMatches && matchedStudent?.password) {
      if (matchedStudent.password.trim() === password.trim()) {
        passwordMatches = true;
      }
    }

    // C. Fallback for default seed demo accounts
    if (!passwordMatches && (!matchedStudent?.password || matchedStudent.password === 'password123')) {
      if (password === 'password123' || password === 'student123') {
        passwordMatches = true;
      }
    }

    // If password does not match, reject login!
    if (!passwordMatches) {
      return {
        success: false,
        error: 'Incorrect password. Please verify your password or use "Forgot password?".'
      };
    }

    // 6. Successful login for detected student account
    const studentUser = {
      id: matchedStudent.id,
      name: matchedStudent.name,
      email: matchedStudent.email,
      role: 'student',
      regNo: matchedStudent.regNo || 'REG-USER',
      department: matchedStudent.department || 'Computer Science',
      degreeProgram: matchedStudent.degreeProgram || 'BS Computer Science',
      semester: matchedStudent.semester || 'Semester 1',
      avatar: matchedStudent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(matchedStudent.name)}&background=14213D&color=F4A62A&bold=true`
    };

    setUser(studentUser);
    showToast(`Welcome back, ${studentUser.name}!`, 'success');
    return { success: true, role: 'student' };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase auth signOut error:', e);
    }
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const registerStudent = async (studentData, avatarFile = null) => {
    let avatarUrl = studentData.avatar || null;
    
    // Upload custom profile picture to Supabase Storage if file is provided
    if (avatarFile) {
      try {
        const uploaded = await uploadFileToStorage(avatarFile, 'avatars');
        if (uploaded) {
          avatarUrl = uploaded;
        }
      } catch (e) {
        console.warn('Avatar upload error:', e);
      }
    }

    if (!avatarUrl) {
      avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.fullName || 'Student')}&background=14213D&color=F4A62A&bold=true`;
    }

    const newStudent = {
      id: `std-${Date.now()}`,
      name: studentData.fullName,
      email: studentData.email,
      password: studentData.password || 'password123',
      regNo: studentData.regNo || `REG-${Math.floor(1000 + Math.random() * 9000)}`,
      department: studentData.department || 'Computer Science',
      degreeProgram: studentData.degreeProgram || 'BS Computer Science',
      semester: studentData.semester || 'Semester 1',
      session: studentData.session || '2024-2028',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: avatarUrl,
      totalDownloads: 0,
      totalUploads: 0
    };

    // Save student to Supabase Auth & DB
    try {
      await supabase.auth.signUp({
        email: studentData.email,
        password: studentData.password || 'password123',
        options: {
          data: {
            name: studentData.fullName,
            role: 'student',
            regNo: newStudent.regNo
          }
        }
      });
    } catch (e) {
      console.warn('Error signing up in Supabase Auth:', e);
    }

    try {
      await supabase.from('students').insert(mapStudentToDB(newStudent));
    } catch (e) {
      console.warn('Error creating student in Supabase:', e);
    }

    setStudents((prev) => [newStudent, ...prev]);

    // Admin notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      target: 'admin',
      title: 'New Student Registered',
      message: `${newStudent.name} registered in ${newStudent.degreeProgram} (${newStudent.semester}).`,
      time: 'Just now',
      read: false,
      type: 'admin_registration'
    };

    try {
      await supabase.from('notifications').insert(mapNotificationToDB(newNotif));
    } catch (e) {
      console.warn('Error saving notification in Supabase:', e);
    }

    setNotifications((prev) => [newNotif, ...prev]);

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
    let fileUrl = resourceData.fileUrl || null;

    if (file) {
      // 1. Upload to Supabase Storage
      fileUrl = await uploadFileToStorage(file, 'resources');
      // 2. Also keep indexedDB backup
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
      fileUrl: fileUrl,
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

    // Save to Supabase
    try {
      await supabase.from('resources').insert(mapResourceToDB(newResource));
    } catch (e) {
      console.warn('Error inserting resource in Supabase:', e);
    }

    setResources((prev) => [newResource, ...prev]);

    // Update subject counters
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.name.toLowerCase() === newResource.subject.toLowerCase()) {
          const updatedSub = {
            ...sub,
            notesCount: newResource.category === 'Notes' ? sub.notesCount + 1 : sub.notesCount,
            papersCount: newResource.category === 'Past Papers' ? sub.papersCount + 1 : sub.papersCount
          };
          supabase.from('subjects').update(mapSubjectToDB(updatedSub)).eq('id', sub.id).catch(console.warn);
          return updatedSub;
        }
        return sub;
      })
    );

    // Notify students
    const notif = {
      id: `notif-${Date.now()}`,
      target: 'student',
      title: `New ${newResource.category} Uploaded`,
      message: `"${newResource.title}" for ${newResource.subject} is now available.`,
      time: 'Just now',
      read: false,
      type: newResource.category === 'Past Papers' ? 'paper' : 'note'
    };
    supabase.from('notifications').insert(mapNotificationToDB(notif)).catch(console.warn);
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Resource "${newResource.title}" published successfully!`, 'success');
    return newResource;
  };

  const updateResource = async (id, updatedFields) => {
    const existing = resources.find(r => r.id === id);
    if (!existing) return;
    const merged = { ...existing, ...updatedFields };

    try {
      await supabase.from('resources').update(mapResourceToDB(merged)).eq('id', id);
    } catch (e) {
      console.warn('Error updating resource in Supabase:', e);
    }

    setResources((prev) => prev.map((res) => (res.id === id ? merged : res)));
    showToast('Resource updated successfully!', 'success');
  };

  const deleteResource = async (id) => {
    try {
      await supabase.from('resources').delete().eq('id', id);
      await supabase.from('user_favorites').delete().eq('resource_id', id);
    } catch (e) {
      console.warn('Error deleting resource from Supabase:', e);
    }

    await deleteFileFromDB(id);
    setResources((prev) => prev.filter((res) => res.id !== id));
    setFavorites((prev) => prev.filter((fid) => fid !== id));
    showToast('Resource deleted from system.', 'info');
  };

  const bulkDeleteResources = async (ids) => {
    try {
      await supabase.from('resources').delete().in('id', ids);
      await supabase.from('user_favorites').delete().in('resource_id', ids);
    } catch (e) {
      console.warn('Error bulk deleting from Supabase:', e);
    }

    for (const id of ids) {
      await deleteFileFromDB(id);
    }
    setResources((prev) => prev.filter((res) => !ids.includes(res.id)));
    setFavorites((prev) => prev.filter((fid) => !ids.includes(fid)));
    showToast(`${ids.length} resources removed successfully.`, 'info');
  };

  const bulkPublishResources = async (ids, status = true) => {
    try {
      await supabase.from('resources').update({ is_published: status }).in('id', ids);
    } catch (e) {
      console.warn('Error bulk updating in Supabase:', e);
    }

    setResources((prev) =>
      prev.map((res) => (ids.includes(res.id) ? { ...res, isPublished: status } : res))
    );
    showToast(`${ids.length} resources ${status ? 'published' : 'unpublished'}.`, 'success');
  };

  const togglePublish = async (id) => {
    const res = resources.find(r => r.id === id);
    if (!res) return;
    const next = !res.isPublished;

    try {
      await supabase.from('resources').update({ is_published: next }).eq('id', id);
    } catch (e) {
      console.warn('Error toggling publish in Supabase:', e);
    }

    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isPublished: next } : r))
    );
    showToast(`Resource ${next ? 'published' : 'unpublished'}.`, 'info');
  };

  // --- SUBJECT MANAGEMENT ---
  const addSubject = async (data) => {
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

    try {
      await supabase.from('subjects').insert(mapSubjectToDB(newSubject));
    } catch (e) {
      console.warn('Error inserting subject in Supabase:', e);
    }

    setSubjects((prev) => [newSubject, ...prev]);
    showToast(`Subject "${newSubject.name}" created successfully.`, 'success');
    return newSubject;
  };

  const updateSubject = async (id, fields) => {
    const existing = subjects.find(s => s.id === id);
    if (!existing) return;
    const updated = { ...existing, ...fields };

    try {
      await supabase.from('subjects').update(mapSubjectToDB(updated)).eq('id', id);
    } catch (e) {
      console.warn('Error updating subject in Supabase:', e);
    }

    setSubjects((prev) => prev.map((s) => (s.id === id ? updated : s)));
    showToast('Subject updated.', 'success');
  };

  const deleteSubject = async (id) => {
    try {
      await supabase.from('subjects').delete().eq('id', id);
    } catch (e) {
      console.warn('Error deleting subject in Supabase:', e);
    }
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    showToast('Subject deleted.', 'info');
  };

  // --- DEPARTMENT MANAGEMENT ---
  const addDepartment = async (deptData) => {
    const newDept = {
      id: deptData.code.toLowerCase(),
      name: deptData.name,
      code: deptData.code,
      description: deptData.description || 'Academic department',
      head: deptData.head || 'Department Chair',
      totalStudents: 0,
      totalPrograms: deptData.totalPrograms || 1
    };

    try {
      await supabase.from('departments').insert(mapDepartmentToDB(newDept));
    } catch (e) {
      console.warn('Error inserting department in Supabase:', e);
    }

    setDepartments((prev) => [newDept, ...prev]);
    showToast(`Department "${newDept.name}" added.`, 'success');
  };

  const updateDepartment = async (id, fields) => {
    const existing = departments.find(d => d.id === id);
    if (!existing) return;
    const updated = { ...existing, ...fields };

    try {
      await supabase.from('departments').update(mapDepartmentToDB(updated)).eq('id', id);
    } catch (e) {
      console.warn('Error updating department in Supabase:', e);
    }

    setDepartments((prev) => prev.map((d) => (d.id === id ? updated : d)));
    showToast('Department updated.', 'success');
  };

  const deleteDepartment = async (id) => {
    try {
      await supabase.from('departments').delete().eq('id', id);
    } catch (e) {
      console.warn('Error deleting department in Supabase:', e);
    }
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    showToast('Department removed.', 'info');
  };

  // --- DEGREE PROGRAM & SEMESTER ---
  const addDegreeProgram = async (programData) => {
    const newProg = {
      id: `prog-${Date.now()}`,
      name: programData.name,
      code: programData.code,
      department: programData.department,
      duration: programData.duration || '4 Years (8 Semesters)'
    };

    try {
      await supabase.from('degree_programs').insert(mapDegreeProgramToDB(newProg));
    } catch (e) {
      console.warn('Error inserting degree program in Supabase:', e);
    }

    setDegreePrograms((prev) => [newProg, ...prev]);
    showToast(`Program "${newProg.name}" created.`, 'success');
  };

  const deleteDegreeProgram = async (id) => {
    try {
      await supabase.from('degree_programs').delete().eq('id', id);
    } catch (e) {
      console.warn('Error deleting degree program in Supabase:', e);
    }
    setDegreePrograms((prev) => prev.filter((p) => p.id !== id));
    showToast('Program deleted.', 'info');
  };

  const addSemester = async (semData) => {
    const newSem = {
      id: String(semesters.length + 1),
      name: semData.name || `Semester ${semesters.length + 1}`,
      label: semData.label || `${semesters.length + 1}th Semester`,
      term: semData.term || 'Fall/Spring',
      academicYear: semData.academicYear || '2024-2025',
      isActive: true
    };

    try {
      await supabase.from('semesters').insert(mapSemesterToDB(newSem));
    } catch (e) {
      console.warn('Error inserting semester in Supabase:', e);
    }

    setSemesters((prev) => [...prev, newSem]);
    showToast(`Semester "${newSem.name}" added.`, 'success');
  };

  const deleteSemester = async (id) => {
    try {
      await supabase.from('semesters').delete().eq('id', String(id));
    } catch (e) {
      console.warn('Error deleting semester in Supabase:', e);
    }
    setSemesters((prev) => prev.filter((s) => String(s.id) !== String(id)));
    showToast('Semester removed.', 'info');
  };

  // --- ANNOUNCEMENTS ---
  const addAnnouncement = async (data) => {
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

    try {
      await supabase.from('announcements').insert(mapAnnouncementToDB(newAnc));
    } catch (e) {
      console.warn('Error inserting announcement in Supabase:', e);
    }

    setAnnouncements((prev) => [newAnc, ...prev]);

    // Student notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      target: 'student',
      title: `Announcement: ${newAnc.title}`,
      message: newAnc.description.slice(0, 100) + '...',
      time: 'Just now',
      read: false,
      type: 'announcement'
    };
    supabase.from('notifications').insert(mapNotificationToDB(newNotif)).catch(console.warn);
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('Announcement posted successfully.', 'success');
    return newAnc;
  };

  const updateAnnouncement = async (id, fields) => {
    const existing = announcements.find(a => a.id === id);
    if (!existing) return;
    const updated = { ...existing, ...fields };

    try {
      await supabase.from('announcements').update(mapAnnouncementToDB(updated)).eq('id', id);
    } catch (e) {
      console.warn('Error updating announcement in Supabase:', e);
    }

    setAnnouncements((prev) => prev.map((a) => (a.id === id ? updated : a)));
    showToast('Announcement updated.', 'success');
  };

  const deleteAnnouncement = async (id) => {
    try {
      await supabase.from('announcements').delete().eq('id', id);
    } catch (e) {
      console.warn('Error deleting announcement in Supabase:', e);
    }
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('Announcement deleted.', 'info');
  };

  // --- STUDENT SUBMISSIONS WORKFLOW ---
  const submitResource = async (subData, file = null) => {
    const subId = `sub-${Date.now()}`;
    let fileUrl = null;

    if (file) {
      fileUrl = await uploadFileToStorage(file, 'submissions');
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
      fileUrl: fileUrl,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
      remarks: '',
      rejectionReason: ''
    };

    try {
      await supabase.from('submissions').insert(mapSubmissionToDB(newSub));
    } catch (e) {
      console.warn('Error inserting submission in Supabase:', e);
    }

    setSubmissions((prev) => [newSub, ...prev]);

    // Notify admin
    const newNotif = {
      id: `notif-${Date.now()}`,
      target: 'admin',
      title: 'New Student Submission',
      message: `${newSub.studentName} submitted "${newSub.title}" for review.`,
      time: 'Just now',
      read: false,
      type: 'admin_submission'
    };
    supabase.from('notifications').insert(mapNotificationToDB(newNotif)).catch(console.warn);
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('Your material was submitted for admin review!', 'success');
    return newSub;
  };

  const approveSubmission = async (subId) => {
    const sub = submissions.find((s) => s.id === subId);
    if (!sub) return;

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
      fileUrl: sub.fileUrl,
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

    try {
      await supabase.from('submissions').update({ status: 'Approved', remarks: 'Verified by Administrator' }).eq('id', subId);
      await supabase.from('resources').insert(mapResourceToDB(newResource));
    } catch (e) {
      console.warn('Error approving submission in Supabase:', e);
    }

    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Approved', remarks: 'Verified by Administrator' } : s))
    );
    setResources((prev) => [newResource, ...prev]);

    const notif = {
      id: `notif-${Date.now()}`,
      target: 'student',
      title: 'Submission Approved! 🎉',
      message: `Your material "${sub.title}" has been verified and published to NOTEshare.`,
      time: 'Just now',
      read: false,
      type: 'submission'
    };
    supabase.from('notifications').insert(mapNotificationToDB(notif)).catch(console.warn);
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Submission "${sub.title}" approved and published!`, 'success');
  };

  const rejectSubmission = async (subId, reason = 'Does not meet academic guidelines') => {
    try {
      await supabase.from('submissions').update({ status: 'Rejected', remarks: reason, rejection_reason: reason }).eq('id', subId);
    } catch (e) {
      console.warn('Error rejecting submission in Supabase:', e);
    }

    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Rejected', remarks: reason, rejectionReason: reason } : s))
    );

    const notif = {
      id: `notif-${Date.now()}`,
      target: 'student',
      title: 'Submission Update',
      message: `Your submission was not approved: ${reason}`,
      time: 'Just now',
      read: false,
      type: 'submission'
    };
    supabase.from('notifications').insert(mapNotificationToDB(notif)).catch(console.warn);
    setNotifications((prev) => [notif, ...prev]);

    showToast('Submission rejected.', 'info');
  };

  const deleteSubmission = async (subId) => {
    try {
      await supabase.from('submissions').delete().eq('id', subId);
    } catch (e) {
      console.warn('Error deleting submission in Supabase:', e);
    }
    setSubmissions((prev) => prev.filter((s) => s.id !== subId));
    showToast('Submission deleted.', 'info');
  };

  // --- STUDENT RECORD MANAGEMENT (ADMIN) ---
  const toggleStudentStatus = async (id) => {
    const std = students.find(s => s.id === id);
    if (!std) return;
    const newStatus = std.status === 'Active' ? 'Suspended' : 'Active';

    try {
      await supabase.from('students').update({ status: newStatus }).eq('id', id);
    } catch (e) {
      console.warn('Error updating student status in Supabase:', e);
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast(`Student status updated to ${newStatus}.`, 'info');
  };

  const updateStudent = async (id, fields) => {
    const std = students.find(s => s.id === id);
    if (!std) return;
    const updated = { ...std, ...fields };

    try {
      await supabase.from('students').update(mapStudentToDB(updated)).eq('id', id);
    } catch (e) {
      console.warn('Error updating student in Supabase:', e);
    }

    setStudents((prev) => prev.map((s) => (s.id === id ? updated : s)));
    if (user && user.id === id) {
      setUser((prev) => ({ ...prev, ...fields }));
    }
    showToast('Student profile updated.', 'success');
  };

  const deleteStudent = async (id) => {
    try {
      await supabase.from('students').delete().eq('id', id);
    } catch (e) {
      console.warn('Error deleting student in Supabase:', e);
    }
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('Student record removed.', 'info');
  };

  // --- FAVORITES & DOWNLOADS ---
  const toggleFavorite = async (resourceId) => {
    const exists = favorites.includes(resourceId);
    const userEmail = user?.email || 'guest@noteshare.edu';

    if (exists) {
      try {
        await supabase.from('user_favorites').delete().match({ user_email: userEmail, resource_id: resourceId });
      } catch (e) {
        console.warn('Error deleting favorite in Supabase:', e);
      }
      setFavorites((prev) => prev.filter((id) => id !== resourceId));
      showToast('Removed from favorites', 'info');
    } else {
      try {
        await supabase.from('user_favorites').insert({ user_email: userEmail, resource_id: resourceId });
      } catch (e) {
        console.warn('Error adding favorite in Supabase:', e);
      }
      setFavorites((prev) => [...prev, resourceId]);
      showToast('Saved to your favorites ❤️', 'success');
    }
  };

  const isFavorite = (resourceId) => favorites.includes(resourceId);

  const recordDownload = async (resource) => {
    const userEmail = user?.email || 'guest@noteshare.edu';
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

    // Save download to Supabase
    try {
      await supabase.from('user_downloads').insert({
        user_email: userEmail,
        resource_id: resource.id,
        resource_title: resource.title,
        subject: resource.subject,
        category: resource.category,
        file_type: resource.fileType || 'PDF',
        file_size: resource.fileSize || '2.0 MB'
      });
      // Increment downloads count in DB
      await supabase.from('resources').update({ downloads: (resource.downloads || 0) + 1 }).eq('id', resource.id);
    } catch (e) {
      console.warn('Error logging download in Supabase:', e);
    }

    setDownloads((prev) => [newDl, ...prev]);

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
  const markAsRead = async (id) => {
    try {
      await supabase.from('notifications').update({ read: true }).eq('id', id);
    } catch (e) {
      console.warn('Error updating notification in Supabase:', e);
    }
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = async () => {
    try {
      await supabase.from('notifications').update({ read: true }).neq('id', '');
    } catch (e) {
      console.warn('Error updating all notifications in Supabase:', e);
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'success');
  };

  const clearNotifications = async () => {
    try {
      await supabase.from('notifications').delete().neq('id', '');
    } catch (e) {
      console.warn('Error clearing notifications in Supabase:', e);
    }
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoading,
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
        showToast,
        refreshData: fetchDataFromSupabase
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
