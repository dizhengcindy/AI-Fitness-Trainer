"use client"
import React from 'react'
import { SignOutButton } from '@clerk/nextjs'

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <SignOutButton />
    </div>
  );
};
export default HomePage;
