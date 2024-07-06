"use client";

import CircularImage from "./CircularImage";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <CircularImage
          src={user?.picture || undefined}
          alt={user?.name || undefined}
          size="40"
          email={user?.email || ""}
        />
        {/* <h2>{user.name}</h2> */}
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
}
