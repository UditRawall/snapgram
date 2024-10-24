import { UserCard } from "@/components/shared";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import {
  useGetRecentPosts,
  useGetUsers,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

//drawer
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    data: posts,
    isPending: isPostLoading,
    // isError: isPostError,
  } = useGetRecentPosts();
  console.log(posts);

  useEffect(() => {
    setIsDrawerOpen(true); // Open the drawer on page load
  }, []);

  const { data: creators, isPending: isUserLoading } = useGetUsers(10);

  const handleSignIn = () => {
    navigate('/sign-in' )
  }

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
                  <PostCard post={post} key={post.caption} />
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
      {/* drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      {/* No need for DrawerTrigger since the drawer opens automatically */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Connect, Share, and Explore - Join Us Today!</DrawerTitle>
          <DrawerDescription>Log in to see photos and videos from friends and discover other accounts you'll love.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          
          <Button onClick={handleSignIn} >Sign in</Button>
          
          <DrawerClose>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </div>
  );
};

export default Home;
