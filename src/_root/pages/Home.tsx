import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  
  const {
    data: posts,
    isPending: isPostLoading,
    // isError: isPostError,
  } = useGetRecentPosts();
  console.log(posts);

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
    </div>
  );
};

export default Home;
