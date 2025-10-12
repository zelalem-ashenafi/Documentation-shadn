"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// your cards section
import LandingPage from "@/components/LandingPage";
import IndexLayout from "@/app/index-layout";
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p></p>;

  return (
      <LandingPage />)
    
}
