"use client";

import CircularImage from "./CircularImage";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAccount } from "@account-kit/react";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  const account = useAccount({
    type: "LightAccount",
  });


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && account ? (
      <div className="profile-container">
        <div className="profile-image">
          <CircularImage
            src={user?.picture || undefined}
            alt={user?.name || undefined}
            size="40"
            email={user?.email || ""}
          />
        </div>
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Connected Address:</strong> {account.address || "Not connected"}</p>
        </div>
      </div>
    ) : (
      <></>
    )
  );
}
