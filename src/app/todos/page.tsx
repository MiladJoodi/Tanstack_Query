"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// POST
const Todos = () => {

    // for refresh after add
    const queryClient = useQueryClient();

  const mutation: any = useMutation<any>({
    mutationFn: (newTodo) => {
      return axios.post("http://localhost:3001/todos", newTodo);
    },
    onMutate: (variables) => {
      console.log("A mutation is about to happen");
    },
    onError: (error, variables, context) => {
      console.log("Error", error.message);
    },
    onSuccess: (data, variable, context) => {
      console.log("Success", data);
      queryClient.invalidateQueries({queryKey: ["todos"]})
    },
  });

  //   GET
  const { data: todosData } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("http://localhost:3001/todos").then((res) => res.json()),
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}

      <h1 className="text-xl mt-7">TODOS</h1>
      <div className="flex flex-col gap-2">
        {todosData?.map((todo: any) => (
          <div className="flex" key={todo.id}>
            <h2>{" " + todo.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
