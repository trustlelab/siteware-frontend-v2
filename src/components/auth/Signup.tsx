import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import Carouselwrapper from '../common/CarouselWrapper';
import Logo from '../common/Logo';
import ContinueWithGoogle from '../common/ContinueWithGoogle';
import FormDivider from '../common/Divider';
import { RootState, AppDispatch } from '../../app/store';
import { signupThunk } from '../../features/slices/authSlice';
import Input from '../lib/Input';
import Checkbox from '../lib/Checkbox';
import Button from '../lib/Button';

const Signup: React.FC = () => {
  const { t } = useTranslation('signup'); // Specify 'signup' namespace
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t('passwords_not_match_alert'));
      return;
    }

    if (!termsAccepted) {
      alert(t('accept_terms_alert'));
      return;
    }

    dispatch(signupThunk({ email, password, confirmPassword }));
  };

  if (isAuthenticated) {
    window.location.href = '/';
  }

  return (
    <main className="flex justify-between dark:bg-[#101828]">
      <section className="flex justify-center dark:bg-[#101828] sm:w-[860px]">
        <div className="sm:w-[526px]">
          <div className="mt-[80px]">
            <Logo width={126.95} height={24.5} />
          </div>
          <div className="space-y-[32px]">
            <div className="space-y-[12px sm:mt-[80px]">
              <h1 className="font-bold text-[24px] dark:text-[#D0D5DD]">{t('create_account')}</h1>
              <h3 className="text-[#475467] text-[16px] dark:text-[#D0D5DD]">{t('welcome_details')}</h3>
            </div>

            <ContinueWithGoogle text={t('signup')} />
            <FormDivider />

            <form onSubmit={handleSignup}>
              <Input
                id="email"
                label={t('email')}
                type="email"
                placeholder={t('enter_email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                id="password"
                label={t('password')}
                type="password"
                placeholder={t('enter_password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={password.length < 6 ? t('password_must_be_6') : ''}
              />

              <Input
                id="confirm-password"
                label={t('confirm_password')}
                type="password"
                placeholder={t('confirm_your_password')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                error={password !== confirmPassword ? t('passwords_do_not_match') : ''}
              />

              {error && <p className="font-bold text-red-500">{error}</p>}
              <div className="flex items-center mt-4">
                <Checkbox
                  id="remember"
                  label={t('terms_and_conditions')}
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
              </div>

              <div className="flex flex-col items-center mt-8">
                <Button
                  type="submit"
                  className="w-full h-[48px]"
                  disabled={loading || !termsAccepted}
                >
                  {loading ? t('signing_up') : t('signup')}
                </Button>
              </div>
            </form>

            <p className="space-x-1 mt-4 w-full text-[16px] text-center text-gray-600 dark:text-[#D0D5DD]">
              {t('already_have_account')}{' '}
              <a href="/login" className="font-bold">{t('login')}</a>
            </p>
          </div>
        </div>
      </section>
      <Carouselwrapper />
    </main>
  );
};

export default Signup;
