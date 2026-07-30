"use client"

import { useUser } from "@clerk/nextjs"
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

const ProfileHeader = () => {

    const { user } = useUser();
    const userId = user?.id as string;
    
    const plans = useQuery(api.plans.getUserPlans, { userId });
    
  return (
    <div>ProfileHeader</div>
  )
}

export default ProfileHeader
