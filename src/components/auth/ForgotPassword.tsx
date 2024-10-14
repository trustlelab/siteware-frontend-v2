import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { requestPasswordResetThunk, resetPasswordThunk } from '../../features/slices/authSlice';
import Carouselwrapper from '../common/CarouselWrapper';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../common/Logo';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Input from '../lib/Input';
import Button from '../lib/Button';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation('forgotPassword'); // Use 'forgotPassword' namespace
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestPasswordResetThunk({ email }))
      .unwrap()
      .then(() => {
        toast.success(t('verification_code_sent'));
        setStep(2);
      })
      .catch((err) => toast.error(err));
  };

  const handleVerificationAndPasswordResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t('password_must_match'));
      return;
    }

    dispatch(resetPasswordThunk({ email, otp: verificationCode, newPassword }))
      .unwrap()
      .then(() => {
        toast.success(t('password_reset_success'));
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((err) => toast.error(err));
  };

  const passwordStrength = () => {
    if (newPassword.length < 6) return { strength: t('weak'), color: 'red' };
    if (newPassword.length < 10) return { strength: t('medium'), color: 'orange' };
    if (/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) && newPassword.length >= 10)
      return { strength: t('strong'), color: 'green' };
    return { strength: t('super_strong'), color: 'darkgreen' };
  };

  const getIconColor = () => {
    const theme = localStorage.getItem('theme');
    return theme === 'dark' ? 'white' : 'black';
  };

  return (
    <main className="flex justify-between">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} pauseOnFocusLoss draggable pauseOnHover />

      <section className="flex justify-center dark:bg-[#101828] sm:w-[860px]">
        <div className="sm:w-[526px]">
          <div className="mt-[80px]">
            <Logo width={126.95} height={24.5} />
          </div>
          <div className="space-y-[32px]">
            <div className="space-y-[12px] sm:mt-[80px]">
              <h1 className="font-bold text-[24px] dark:text-[#D0D5DD]">{t('forgot_password')}</h1>
              <h3 className="text-[#475467] text-[16px]">{t('enter_details')}</h3>
            </div>

            {step === 1 && (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <Input
                    type="email"
                    id="email"
                    placeholder={t('enter_email')}
                    label={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? t('sending_email') : t('send_verification_code')}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerificationAndPasswordResetSubmit}>
                <div className="mb-4">
                  <Input
                    type="text"
                    id="verificationCode"
                    placeholder={t('enter_verification_code')}
                    label={t('verification_code')}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    placeholder={t('enter_new_password')}
                    label={t('new_password')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="top-[12px] right-0 absolute flex items-center pr-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash color={getIconColor()} /> : <FaEye color={getIconColor()} />}
                  </button>
                  {newPassword.length > 0 && (
                    <p className={`text-sm mt-1 ${passwordStrength().color}`}>{passwordStrength().strength}</p>
                  )}
                </div>
                <div className="mb-4">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder={t('confirm_new_password')}
                    label={t('confirm_password')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="top-[12px] right-0 absolute flex items-center pr-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash color={getIconColor()} /> : <FaEye color={getIconColor()} />}
                  </button>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? t('verifying') : t('reset_password')}
                </Button>
              </form>
            )}

            <p className="mt-4 w-full text-center text-gray-600 text-sm">
              {t('remembered_password')}
              <a href="/login" className="font-bold text-[#6941C6]">{' '}{t('login')}</a>
            </p>
          </div>
        </div>
      </section>

      <Carouselwrapper />
    </main>
  );
};

export default ForgotPassword;
