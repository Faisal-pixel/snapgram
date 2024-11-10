import {
    useQuery, // Used for querying the data
    useMutation, // Used for mutating/modifying the data
    useQueryClient, // Used for interacting with the query client
    useInfiniteQuery, // Used for querying paginated data
} from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/api';
import { INewUser } from '@/types';

export const useCreateUserAccountMutation = () => {
    // so here we are using the useMutation hook to create a new user account. We are passing in an object of methods.
    // First is the mutationFn that is basically an arrow function that calls the createUserAccount function from the api.
    // So then we can use it at the client side
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    })
}

export const useSignInAccountMutation = () => {
    return useMutation({
        // We are passing in the mutationFn that is an arrow function that calls the signInAccount function from the api.
        // But here user is an object that has email and password.
        mutationFn: (user: {email: string; password: string}) => signInAccount(user),
    })
}
export const useSignOutAccountMutation = () => {
    return useMutation({
        // We are passing in the mutationFn that is an arrow function that calls the signOutAccount function from the api.
        mutationFn: signOutAccount,
    })
}