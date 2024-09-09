"use client";

import { useQuery, useIsFetching } from "@tanstack/react-query";

interface Todo {
  // userId: number;
  id: number;
  title: string;
  // completed: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface Geo {
  lat: string;
  lng: string;
}

const ReactQuery = () => {

  const isFetching = useIsFetching();

  //   TODOS
  const {
    data: todosData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    select: (todos)=> 
      todos.map((todo) => ({ id: todo.id, title: todo.title }))
  });

  //   USERS
  const { data: usersData } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
      enabled: !!todosData
  });

  // LOADING
  if (isLoading) {
    return (
      <main className="mt-4 flex min-h-screen flex-col items-center">
        It's Loading...
      </main>
    );
  }

  // ERROR
  if (isError) {
    return (
      <main className="mt-4 flex min-h-screen flex-col items-center">
        There is an error
      </main>
    );
  }

  console.log(todosData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* TODOS */}
      <h1 className="text-xl">TODOS</h1>
      <div className="flex flex-col gap-2">
        {todosData?.slice(0, 5).map((todo: Todo) => (
          <div className="flex" key={todo.id}>
            <h2>{" " + todo.title}</h2>
          </div>
        ))}
      </div>

      {/* USERS */}
      <h1 className="text-xl">USERS</h1>
      <div className="flex flex-col gap-2">
        {usersData?.map((user: User) => (
          <div className="flex" key={user.id}>
            <h2>{" " + user.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ReactQuery;
