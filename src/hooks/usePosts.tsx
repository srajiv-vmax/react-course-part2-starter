import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// const usePosts = (userId: number | undefined) =>
//   useQuery<Post[], Error>({
//     queryKey: userId ? ["users", userId, "posts"] : ["posts"],
//     queryFn: () =>
//       axios
//         .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
//           params: {
//             userId,
//           },
//         })
//         .then((res) => res.data),
//     staleTime: 10 * 1000,
//   });

interface PageQuery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PageQuery) =>
  useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 10 * 1000,
    // keepPreviousData: true
  });

export default usePosts;
