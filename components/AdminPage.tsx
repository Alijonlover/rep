import * as React from 'react';
import { Journalist, AdminCredentials, GuestUserCredentials } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import Input from './common/Input';

interface AdminPageProps {
  journalists: Journalist[];
  currentCredentials: AdminCredentials;
  guestUsers: GuestUserCredentials[];
  onResetVotes: () => void;
  onUpdateCredentials: (newCreds: AdminCredentials) => void;
  onAddJournalist: (name: string, imageUrl: string) => void;
  onDeleteJournalist: (id: number) => void;
}

const DeleteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const AdminPage: React.FC<AdminPageProps> = ({ journalists, onResetVotes, onUpdateCredentials, currentCredentials, onAddJournalist, onDeleteJournalist, guestUsers }) => {
  const [newEmail, setNewEmail] = React.useState(currentCredentials.email);
  const [newPass, setNewPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [message, setMessage] = React.useState('');
  
  const [newJournalistName, setNewJournalistName] = React.useState('');
  const [newJournalistImageUrl, setNewJournalistImageUrl] = React.useState('');

  const sortedJournalists = [...journalists].sort((a, b) => b.votes - a.votes);

  const handleUpdateCredsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (newPass !== confirmPass) {
      setMessage('رمزهای جیمیل مطابقت ندارند.');
      return;
    }
    if(newPass && newPass.length < 8) {
        setMessage('رمز جیمیل جدید باید حداقل 8 کاراکتر باشد.');
        return;
    }
    onUpdateCredentials({ email: newEmail, pass: newPass || currentCredentials.pass });
    setMessage('اطلاعات ورود ادمین با موفقیت به‌روزرسانی شد.');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleReset = () => {
    if(window.confirm('آیا از صفر کردن تمام آرا مطمئن هستید؟ این عمل غیرقابل بازگشت است.')) {
        onResetVotes();
        setMessage('تمام آرا با موفقیت صفر شدند.');
        setTimeout(() => setMessage(''), 3000);
    }
  }

  const handleAddJournalistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJournalistName.trim() && newJournalistImageUrl.trim()) {
        onAddJournalist(newJournalistName, newJournalistImageUrl);
        setNewJournalistName('');
        setNewJournalistImageUrl('');
        setMessage('خبرنگار جدید با موفقیت اضافه شد.');
        setTimeout(() => setMessage(''), 3000);
    } else {
        setMessage('نام و آدرس عکس خبرنگار نمی‌تواند خالی باشد.');
        setTimeout(() => setMessage(''), 3000);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in text-right">
      <h2 className="text-4xl font-extrabold text-white text-center">داشبورد ادمین</h2>
      
      {message && <div className="bg-green-500/20 border border-green-500 text-green-300 text-center p-3 rounded-lg animate-fade-in">{message}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poll Results */}
        <Card className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-4 text-teal-400">نتایج نظرسنجی</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {sortedJournalists.map((j, index) => (
              <div key={j.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-lg font-bold text-teal-400 w-8 text-center">{j.votes.toLocaleString('fa-IR')}</span>
                  <img src={j.imageUrl} alt={j.name} className="w-12 h-12 rounded-full object-cover"/>
                  <span className="font-medium text-gray-200">{j.name}</span>
                </div>
                 <span className="text-xl font-bold text-gray-400">#{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Admin Actions */}
        <div className="space-y-8">
            <Card>
              <h3 className="text-2xl font-bold mb-4 text-teal-400">مدیریت نظرسنجی</h3>
               <Button onClick={handleReset} variant="danger">
                    صفر کردن تمام آرا
               </Button>
            </Card>
            
            <Card>
                <h3 className="text-2xl font-bold mb-4 text-teal-400">کاربران ثبت‌نام شده</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {guestUsers.length > 0 ? (
                        guestUsers.map((user, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md">
                                <div className="flex flex-col text-right" style={{ direction: 'ltr', textAlign: 'left' }}>
                                    <span className="font-medium text-gray-200 text-sm">{user.email}</span>
                                    <span className="text-xs text-gray-400">Pass: {user.pass}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm text-center py-4">هنوز کاربری ثبت‌نام نکرده است.</p>
                    )}
                </div>
            </Card>

            <Card>
                <h3 className="text-2xl font-bold mb-4 text-teal-400">مدیریت خبرنگاران</h3>
                <form onSubmit={handleAddJournalistSubmit} className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">نام خبرنگار</label>
                        <Input type="text" placeholder="مثال: سارا امینی" value={newJournalistName} onChange={e => setNewJournalistName(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">آدرس URL عکس</label>
                        <Input type="url" placeholder="https://example.com/photo.jpg" value={newJournalistImageUrl} onChange={e => setNewJournalistImageUrl(e.target.value)} required />
                    </div>
                    <Button type="submit">افزودن خبرنگار</Button>
                </form>
                <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-300 border-t border-gray-700 pt-4">لیست فعلی</h4>
                    {journalists.map(j => (
                        <div key={j.id} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md">
                            <div className="flex items-center space-x-3 space-x-reverse truncate">
                                <img src={j.imageUrl} alt={j.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0"/>
                                <span className="text-sm text-gray-200 truncate">{j.name}</span>
                            </div>
                            <button onClick={() => onDeleteJournalist(j.id)} className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-full"><DeleteIcon /></button>
                        </div>
                    ))}
                    {journalists.length === 0 && <p className="text-gray-500 text-sm text-center py-4">هنوز خبرنگاری اضافه نشده است.</p>}
                </div>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold mb-4 text-teal-400">تغییر اطلاعات ورود</h3>
              <form onSubmit={handleUpdateCredsSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">جیمیل جدید ادمین</label>
                    <Input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">رمز جیمیل جدید</label>
                    <Input type="password" placeholder="برای عدم تغییر، خالی بگذارید" value={newPass} onChange={e => setNewPass(e.target.value)} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">تکرار رمز جیمیل جدید</label>
                    <Input type="password" placeholder="تکرار رمز جیمیل" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                 </div>
                 <Button type="submit" variant="secondary">به‌روزرسانی</Button>
              </form>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;