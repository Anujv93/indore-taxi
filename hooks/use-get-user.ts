"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useGetUserDetails = () => {
  const [orgId, setOrgId] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  useEffect(() => {
    const initializeUserDetails = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        if (!session) {
          setError("No active session");
          setLoading(false);
          return;
        }

        const fetchedUserId = session.user.id;
        const fetchedUserName = session.user.user_metadata.full_name;

        setUserId(fetchedUserId);
        setUserName(fetchedUserName);

        // Fetch organization data
        const { data, error: orgError } = await supabase
          .from("employee")
          .select("org_id")
          .eq("auth_user_id", fetchedUserId)
          .single();

        if (orgError) {
          setError(orgError.message);
        } else if (data) {
          setOrgId(data.org_id);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    initializeUserDetails();
  }, []); // Empty dependency array - only run once on mount

  // Function to clear user details (useful for logout)
  const clearUserDetails = () => {
    setOrgId(undefined);
    setUserName(undefined);
    setUserId(undefined);
    setError(null);
  };

  return {
    orgId,
    userName,
    userId,
    error,
    loading,
    clearUserDetails,
  };
};
