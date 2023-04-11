import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { api } from "../services/api";
import { queryClient } from "../services/reactQuery";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get('/users', {
    params: { page }
  })

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  });

  return { 
    users,
    totalCount
  };
}

export const getUser = async (userId: string) => {
  const response = await api.get(`users/${userId}`);
  return response.data;
}

export const useUsers = (page: number, options?: UseQueryOptions) => {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //10  minutos
    ...options
  }) as UseQueryResult<GetUsersResponse, unknown>
}

export const useUser = async (userId: string) => {
  return await queryClient.prefetchQuery(['user', userId], () => getUser(userId), {
    staleTime: 1000 * 60 * 10, //10  minutos
  })
}