import { Nullable } from '@/lib/types/utils';
import { SignForm } from './sign';
import { RequestBody } from '@/pages/api/signup';
import { useRouter } from 'next/router';
import { FetcherException, fetcher } from '@/lib/utils/fetcher';
import { UserError } from '@/store/user';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/user/useUser';

export const SignUpForm = () => {
  const router = useRouter();
  const { signup } = useUser();

  const handleSubmit = async (user: Nullable<RequestBody>) => {
    signup.mutate(user, {
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
  }

  return <SignForm type={'signup'} onSubmit={handleSubmit} />;
};
