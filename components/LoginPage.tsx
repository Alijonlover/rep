import * as React from 'react';
import Button from './common/Button';
import Input from './common/Input';
import JournalistVector from './JournalistVector';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => void;
}

const MailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, pass);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row items-center justify-center p-4">
        {/* Vector Section - Mobile top, Desktop left */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-12 animate-fade-in">
            <JournalistVector className="w-full max-w-sm lg:max-w-md h-auto" />
        </div>

        {/* Form Section - Mobile bottom, Desktop right */}
        <div className="w-full max-w-md lg:w-1/2 flex flex-col justify-center text-right p-4">
             <div className="w-full bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div>
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-white text-center">
                        ثبت‌نام و رای‌دهی
                    </h1>
                    <p className="mt-2 text-gray-300 text-center">
                        به بزرگترین نظرسنجی خبرنگاران بپیوندید.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">جیمیل</label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                        icon={<MailIcon />}
                        aria-label="جیمیل"
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">رمز جیمیل</label>
                    <Input
                        id="password"
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="********"
                        required
                        icon={<LockIcon />}
                        aria-label="رمز جیمیل"
                    />
                    </div>
                    <div>
                    <Button type="submit" className="w-full">
                        ورود / ثبت‌نام
                    </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;