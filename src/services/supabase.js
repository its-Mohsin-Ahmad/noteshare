import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://emyssqrpnyifmozzjupt.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteXNzcXJwbnlpZm1venpqdXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU2OTQ3ODUsImV4cCI6MjExMTI3MDc4NX0.IlCDdDPfBZnTIR5VDcj9_gx38lQKuHF1xDl5nIrnCvQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload file to Supabase Storage bucket
export const uploadFileToStorage = async (file, folder = 'uploads') => {
  if (!file) return null;
  try {
    const fileExt = file.name ? file.name.split('.').pop() : 'pdf';
    const cleanFileName = file.name ? file.name.replace(/[^a-zA-Z0-9.-]/g, '_') : `document.${fileExt}`;
    const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('noteshare-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.warn('Supabase storage upload error:', error.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('noteshare-files')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (err) {
    console.warn('Failed to upload file to storage:', err);
    return null;
  }
};

// --- DATA MAPPERS (Supabase DB snake_case <-> React camelCase) ---

export const mapResourceFromDB = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description || '',
  category: row.category,
  subject: row.subject,
  subjectCode: row.subject_code || '',
  department: row.department || '',
  degreeProgram: row.degree_program || '',
  semester: row.semester || '',
  academicYear: row.academic_year || '2024-2025',
  examType: row.exam_type || 'General',
  fileType: row.file_type || 'PDF',
  fileSize: row.file_size || '2.0 MB',
  fileUrl: row.file_url || null,
  pagesCount: row.pages_count || 12,
  uploadDate: row.upload_date || new Date().toISOString().split('T')[0],
  uploadRelative: row.upload_relative || 'Recently',
  uploader: row.uploader || {
    name: 'Administrator',
    role: 'Faculty Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  },
  downloads: row.downloads || 0,
  likes: row.likes || 0,
  isPublished: row.is_published !== undefined ? row.is_published : true,
  isFeatured: Boolean(row.is_featured),
  tags: row.tags || [],
  rating: Number(row.rating) || 4.8,
  reviewsCount: row.reviews_count || 10
});

export const mapResourceToDB = (res) => ({
  id: res.id,
  title: res.title,
  description: res.description,
  category: res.category,
  subject: res.subject,
  subject_code: res.subjectCode,
  department: res.department,
  degree_program: res.degreeProgram,
  semester: res.semester,
  academic_year: res.academicYear,
  exam_type: res.examType,
  file_type: res.fileType,
  file_size: res.fileSize,
  file_url: res.fileUrl,
  pages_count: res.pagesCount,
  upload_date: res.uploadDate,
  upload_relative: res.uploadRelative,
  uploader: res.uploader,
  downloads: res.downloads || 0,
  likes: res.likes || 0,
  is_published: res.isPublished !== undefined ? res.isPublished : true,
  is_featured: Boolean(res.isFeatured),
  tags: res.tags || [],
  rating: res.rating || 4.8,
  reviews_count: res.reviewsCount || 0
});

export const mapSubjectFromDB = (row) => ({
  id: row.id,
  name: row.name,
  code: row.code,
  department: row.department,
  degreeProgram: row.degree_program,
  semester: row.semester,
  type: row.type || 'Core',
  notesCount: row.notes_count || 0,
  papersCount: row.papers_count || 0,
  icon: row.icon || 'BookOpen',
  description: row.description || ''
});

export const mapSubjectToDB = (sub) => ({
  id: sub.id,
  name: sub.name,
  code: sub.code,
  department: sub.department,
  degree_program: sub.degreeProgram,
  semester: sub.semester,
  type: sub.type,
  notes_count: sub.notesCount || 0,
  papers_count: sub.papersCount || 0,
  icon: sub.icon,
  description: sub.description
});

export const mapDepartmentFromDB = (row) => ({
  id: row.id,
  name: row.name,
  code: row.code,
  description: row.description,
  head: row.head,
  totalStudents: row.total_students || 0,
  totalPrograms: row.total_programs || 0
});

export const mapDepartmentToDB = (dept) => ({
  id: dept.id,
  name: dept.name,
  code: dept.code,
  description: dept.description,
  head: dept.head,
  total_students: dept.totalStudents || 0,
  total_programs: dept.totalPrograms || 0
});

export const mapDegreeProgramFromDB = (row) => ({
  id: row.id,
  name: row.name,
  code: row.code,
  department: row.department,
  duration: row.duration
});

export const mapDegreeProgramToDB = (prog) => ({
  id: prog.id,
  name: prog.name,
  code: prog.code,
  department: prog.department,
  duration: prog.duration
});

export const mapSemesterFromDB = (row) => ({
  id: row.id,
  name: row.name,
  label: row.label,
  term: row.term,
  academicYear: row.academic_year,
  isActive: row.is_active !== undefined ? row.is_active : true
});

export const mapSemesterToDB = (sem) => ({
  id: String(sem.id),
  name: sem.name,
  label: sem.label,
  term: sem.term,
  academic_year: sem.academicYear || '2024-2025',
  is_active: sem.isActive !== undefined ? sem.isActive : true
});

export const mapStudentFromDB = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  regNo: row.reg_no,
  university: row.university || 'NOTEshare University',
  department: row.department,
  degreeProgram: row.degree_program,
  semester: row.semester,
  session: row.academic_session || '2022-2026',
  avatar: row.avatar,
  role: row.role || 'student',
  status: row.status || 'Active',
  totalDownloads: row.downloads_count || 0,
  totalUploads: row.uploads_count || 0,
  joinDate: row.joined_at ? row.joined_at.split('T')[0] : '2023-09-01'
});

export const mapStudentToDB = (std) => ({
  id: std.id,
  name: std.name,
  email: std.email,
  reg_no: std.regNo,
  university: std.university || 'NOTEshare University',
  department: std.department,
  degree_program: std.degreeProgram,
  semester: std.semester,
  academic_session: std.session || '2022-2026',
  avatar: std.avatar,
  role: std.role || 'student',
  status: std.status || 'Active',
  downloads_count: std.totalDownloads || 0,
  uploads_count: std.totalUploads || 0
});

export const mapAnnouncementFromDB = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  category: row.category,
  publishDate: row.publish_date,
  expiryDate: row.expiry_date,
  isPublished: row.is_published !== undefined ? row.is_published : true,
  pinned: Boolean(row.pinned),
  author: row.author,
  targetDepartment: row.target_department
});

export const mapAnnouncementToDB = (anc) => ({
  id: anc.id,
  title: anc.title,
  description: anc.description,
  category: anc.category,
  publish_date: anc.publishDate,
  expiry_date: anc.expiryDate,
  is_published: anc.isPublished !== undefined ? anc.isPublished : true,
  pinned: Boolean(anc.pinned),
  author: anc.author,
  target_department: anc.targetDepartment
});

export const mapSubmissionFromDB = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  studentName: row.student_name,
  studentEmail: row.student_email,
  studentRegNo: row.student_reg_no,
  subject: row.subject,
  category: row.category,
  department: row.department,
  semester: row.semester,
  academicYear: row.academic_year,
  fileType: row.file_type,
  fileSize: row.file_size,
  fileUrl: row.file_url,
  submittedAt: row.submitted_at,
  status: row.status,
  remarks: row.remarks || '',
  rejectionReason: row.rejection_reason || ''
});

export const mapSubmissionToDB = (sub) => ({
  id: sub.id,
  title: sub.title,
  description: sub.description,
  student_name: sub.studentName,
  student_email: sub.studentEmail,
  student_reg_no: sub.studentRegNo,
  subject: sub.subject,
  category: sub.category,
  department: sub.department,
  semester: sub.semester,
  academic_year: sub.academicYear,
  file_type: sub.fileType,
  file_size: sub.fileSize,
  file_url: sub.fileUrl,
  submitted_at: sub.submittedAt,
  status: sub.status,
  remarks: sub.remarks || '',
  rejection_reason: sub.rejectionReason || ''
});

export const mapNotificationFromDB = (row) => ({
  id: row.id,
  title: row.title,
  message: row.message,
  target: row.target,
  read: Boolean(row.read),
  time: row.time,
  type: row.type
});

export const mapNotificationToDB = (notif) => ({
  id: notif.id,
  title: notif.title,
  message: notif.message,
  target: notif.target,
  read: Boolean(notif.read),
  time: notif.time,
  type: notif.type
});
