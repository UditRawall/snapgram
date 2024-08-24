import { UserCard } from "@/components/shared";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  
  const {
    data: posts,
    isPending: isPostLoading,
    // isError: isPostError,
  } = useGetRecentPosts();
  console.log(posts);

  const { data: creators, isPending: isUserLoading } = useGetUsers(10);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h3 className="h3-bold md:h2-bold text-left w-full">Home Feed</h3>
          {!isPostLoading && !posts ? (
            <div>
              <Loader />
            </div>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
               {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} key={post.caption}/>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <div>
            <Loader />
          </div>
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator: Models.Document) => (
              <li key={creator?.$id} className="flex justify-center w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

export default Home;
