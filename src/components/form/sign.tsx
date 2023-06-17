import Link from 'next/link';
import { useRouter } from 'next/router';

import { Label } from '@radix-ui/react-label';
import { Eye, EyeOff, Mail, SquareAsterisk } from 'lucide-react';
import { useBoolean } from '@/hooks/utils/useBoolean';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RequestBody } from '@/pages/api/signup';
import { Nullable } from '@/lib/types/utils';

interface SignFormProps {
  type: 'login' | 'signup';
  onSubmit: (user: Nullable<RequestBody>) => void;
}

export const SignForm = ({ onSubmit, type }: SignFormProps) => {
  const router = useRouter();
  const [showPassword, _, toggle] = useBoolean(false);

  const login = type === 'login';
  const action = login ? '/api/login' : '/api/signup';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;

    onSubmit({ email, password });
  };

  return (
    <form
      className="grid gap-7"
      onSubmit={handleSubmit}
      method="post"
      action={action}>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="email">Email</Label>

        <div className="relative h-min">
          <Mail fill="white" color="black" className="absolute top-2 left-2" />
          <hr className="absolute top-2 left-10 h-6 border-l border-black dark:border-white" />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="pl-12 pr-8"
            required
          />
        </div>
      </div>

      <div className="grid w-full items-center gap-1">
        <Label htmlFor="email">Senha</Label>

        <div className="relative h-min">
          <SquareAsterisk
            className="absolute top-2 left-2"
            fill="white"
            color="black"
          />
          <hr className="absolute top-2 left-10 h-6 border-l border-black dark:border-white" />

          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Senha"
            className="pl-12 pr-8 peer"
            required
          />

          {showPassword && (
            <Eye
              className="absolute top-2 right-2 hover:bg-white hover:bg-opacity-40 rounded-lg p-1 cursor-pointer peer-autofill:stroke-black peer-autofill:hover:bg-black peer-autofill:hover:bg-opacity-40"
              onClick={toggle}
            />
          )}
          {!showPassword && (
            <EyeOff
              className="absolute top-2 right-2 hover:bg-white hover:bg-opacity-40 rounded-lg p-1 cursor-pointer peer-autofill:stroke-black peer-autofill:hover:bg-black peer-autofill:hover:bg-opacity-40"
              onClick={toggle}
            />
          )}
        </div>

        <div className="flex h-full justify-end w-full">
          <Button
            variant="link"
            asChild
            className="text-right text-[#1A7FC1] pb-0 leading-none h-fit font-bold">
            <Link href="#">Esqueceu sua senha?</Link>
          </Button>
        </div>
      </div>

      <div className="grid w-full">
        <Button type="submit">
          {login ? 'Logar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};
