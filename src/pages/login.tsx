import { SignInForm } from '@/components/form/signin';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { redirectAuthenticatedUser } from '@/lib/server/props';
import Link from 'next/link';

export default function Login() {
  return (
    <Container>
      <div className="w-full max-w-xxs sm:max-w-sm md:max-w-md lg:max-w-lg my-2 py-2 max">
        <h1 className="text-2xl md:text-3xl mb-10 text-center">Login</h1>

        <SignInForm />

        <div className="py-10 px-8 h-6 relative">
          <hr className="border-t border-black dark:border-white w-full" />
          <div className="flex justify-center items-center absolute top-1/2 start-[50%] -translate-x-1/2 -translate-y-1/2 px-4 bg-white dark:bg-black">
            Ou
          </div>
        </div>

        <div className="flex h-full justify-center items-center w-full">
          <span className="text-xs md:text-base">Não possui uma conta?</span>
          <Button variant="link" asChild className="text-[#1A7FC1] pl-1 text-xs md:text-base py-0">
            <Link href="/signup">Cadastre-se</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}

export const getServerSideProps = redirectAuthenticatedUser();
