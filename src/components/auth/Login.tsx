import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginThunk } from '../../features/slices/authSlice';
import Carouselwrapper from '../common/CarouselWrapper';
import Logo from '../common/Logo';
import FormDivider from '../common/Divider';
import ContinueWithGoogle from '../common/ContinueWithGoogle';
import Input from '../lib/Input';
import Button from '../lib/Button';
import Checkbox from '../lib/Checkbox';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation('login'); // Specify the 'login' namespace
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginThunk({ email, password }));

      if (loginThunk.fulfilled.match(resultAction)) {
        const userData = resultAction.payload;
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = '/';
      } else {
        console.error('Login failed', resultAction.payload);
      }
    } catch (err) {
      console.error('Login error', err);
    }
  };

  if (isAuthenticated) {
    window.location.href = '/';
  }

  return (
    <main className="flex flex-col sm:flex-row justify-between h-screen">
      <section className="flex justify-center items-center dark:bg-[#101828] sm:w-[860px] w-full px-4 sm:px-0">
        <div className="sm:w-[526px] w-full max-w-md space-y-4">
          <div className="mt-10 sm:mt-[80px] flex justify-center sm:justify-start">
            <Logo width={126.95} height={24.5} />
          </div>
          <div className="space-y-[32px]">
            <div className="space-y-[12px] sm:mt-[80px]">
              <h1 className="font-bold text-[#475467] text-[24px] dark:text-[#D0D5DD] text-center sm:text-left">
                {t('welcome_back')}
              </h1>
              <h3 className="text-[#475467] text-[16px] dark:text-[#D0D5DD] text-center sm:text-left">
                {t('enter_credentials')}
              </h3>
            </div>

            <ContinueWithGoogle text={t('google_sign_in')} />
            <FormDivider />

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder={t('enter_email')}
                  label={t('email')}
                  required
                />
              </div>

              <div className="mb-4">
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder={t('enter_password')}
                  label={t('password')}
                  required
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center mt-4">
                <Checkbox
                  id="remember"
                  label={t('remember_me')}
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="dark:text-white"
                />
              </div>

              <div className="flex flex-col items-center mt-8">
                <Button type="submit" className="w-full h-[48px]" disabled={loading}>
                  {loading ? t('signing_in') : t('login')}
                </Button>
              </div>
            </form>

            <p className="mt-4 w-full text-[16px] text-center text-gray-600 dark:text-white">
              {t('dont_have_account')}
              <a href="/signup" className="font-bold"> {t('sign_up')}</a>
            </p>

            <p className="mt-2 w-full text-center text-gray-600 text-sm">
              <a href="/forgot-password" className="font-bold text-[16px]">
                {t('forgot_password')}
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className="hidden sm:block ">
        <Carouselwrapper />
      </section>
    </main>
  );
};

export default Login;
