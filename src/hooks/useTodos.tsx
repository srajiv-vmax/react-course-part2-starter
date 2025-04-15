import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const fetchData = () =>
  axios
    .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data);

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchData,
    staleTime: 10 * 1000,
  });

export default useTodos;
