import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { auth } from "../auth/lucia";

type GetServerSidePropsFn<T> = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<T>>

export const redirectAuthenticatedUser = <T extends object = {}> (fn?: GetServerSidePropsFn<T>) => async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<T>> => {
  const authRequest = auth.handleRequest(context);
	const { session } = await authRequest.validateUser();

  if (session) {
		// redirect the user if authenticated
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};
	}

  const result = await fn?.(context) || { props: {} as T }
  
	return result;
};

export const getPagePropsUser = <T extends object = {}> (fn?: GetServerSidePropsFn<T>) => async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<T>> => {
  const authRequest = auth.handleRequest(context);
	const { user } = await authRequest.validateUser();

  const result = await fn?.(context) || { props: {} as T }
  console.log('result')
  
  if (!result || 'props' in result) {
    const props = await result.props;
    console.log('props', {
      props: {
        ...props,
        user
      }
    })

    return {
      props: {
        ...props,
        user
      }
    }
  } 

	return result;
};
