import { Nullable } from '@/lib/types/utils';
import { SignForm } from './sign';
import { RequestBody } from '@/pages/api/signup';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/user/useUser';
import { FetcherException } from '@/lib/utils/fetcher';
import { UserError } from '@/store/user';
import { toast } from 'react-toastify';

export const SignInForm = () => {
  const router = useRouter();
  const { login } = useUser();
  const handleSubmit = async (user: Nullable<RequestBody>) => {
    login.mutate(user, {
      onError: (err) => {
        const isFetcherError = err instanceof FetcherException;
        if (!isFetcherError) return;

        const error = err as FetcherException<UserError>;

        toast.error(error.data.error);
      },
      onSuccess: () => {
        toast("Logado com Sucesso")
        router.push('/');
      },
    });
  };

  return <SignForm type={'login'} onSubmit={handleSubmit} />;
};
