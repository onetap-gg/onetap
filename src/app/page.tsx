"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useUser } from "@/context/user";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const { userData, setUserData } = useUser();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/getUserInfo");

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);

        // Set form values from fetched data
        setName(data.profileName || "");
        setUserId(data.id || "");
        setEmail(data.email || ""); // Assuming userName is the email

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [setUserData]);

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      // Send the entire userData object with updated values
      const updatedUserData = {
        ...userData,
        profileName: name,
      };

      const response = await fetch("/api/user/updateUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const updatedData = await response.json();

      // Update the context with the new data
      setUserData(updatedData);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setSaveError(err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsChangingPassword(true);
      setPasswordError("");
      setPasswordSuccess(false);

      // Basic validation
      if (!password || !confirmPassword) {
        setPasswordError("Both password fields are required");
        return;
      }

      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      const response = await fetch("/api/user/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update password");
      }

      // Clear password fields
      setPassword("");
      setConfirmPassword("");

      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error updating password:", err);
      setPasswordError(err.message || "Failed to update password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pl-15 bg-[#0a0a0a] text-white flex items-center justify-center">
        Loading user data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pl-15 bg-[#0a0a0a] text-white flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen pl-15 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-3xl">
        <h1
          className="text-2xl font-bold mb-6"
          style={{
            paddingTop: "35px",
            paddingBottom: "30px",
            fontFamily: "Impact",
            fontStyle: "normal",
            fontSize: "48px",
            lineHeight: "24px",
            color: "#FFFFFF",
            flex: "none",
            order: 0,
            alignSelf: "stretch",
            fontWeight: "400",
            flexGrow: 0,
          }}
        >
          My Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="flex gap-2 text-white font-semibold mb-2"
              style={{
                paddingTop: "30px",
                paddingBottom: "10px",
                fontFamily: "Impact",
                fontStyle: "normal",
                fontSize: "32px",
                lineHeight: "24px",
                color: "#FFFFFF",
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                fontWeight: "400",
                flexGrow: 0,
              }}
            >
              Name
              <Edit />
            </label>
            <div className="relative">
              <Input
                className="bg-[#383838] text-white border-gray-700 pr-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "10px 24px",
                  gap: "10px",
                  width: "343px",
                  height: "50px",
                  background: "#383838",
                  borderRadius: "4px",
                  flex: "none",
                  order: 1,
                  alignSelf: "stretch",
                  flexGrow: 0,
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="flex gap-2 text-white font-semibold mb-2"
              style={{
                paddingTop: "30px",
                paddingBottom: "10px",
                fontFamily: "Impact",
                fontStyle: "normal",
                fontSize: "32px",
                lineHeight: "24px",
                color: "#FFFFFF",
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                fontWeight: "400",
                flexGrow: 0,
              }}
            >
              Password
              <Edit />
            </label>
            <div className="relative">
              <Input
                className="bg-[#383838] text-white border-gray-700 pr-10"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "10px 24px",
                  gap: "10px",
                  width: "343px",
                  height: "50px",
                  background: "#383838",
                  borderRadius: "4px",
                  flex: "none",
                  order: 1,
                  alignSelf: "stretch",
                  flexGrow: 0,
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-white font-semibold mb-2"
              style={{
                paddingTop: "20px",
                paddingBottom: "10px",
                fontFamily: "Impact",
                fontStyle: "normal",
                fontSize: "32px",
                lineHeight: "24px",
                color: "#FFFFFF",
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                fontWeight: "400",
                flexGrow: 0,
              }}
            >
              User ID
            </label>
            <Input
              className="bg-[#383838] text-white border-gray-700"
              value={userId}
              readOnly
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px 24px",
                gap: "10px",
                width: "343px",
                height: "50px",
                background: "#383838",
                borderRadius: "4px",
                flex: "none",
                order: 1,
                alignSelf: "stretch",
                flexGrow: 0,
              }}
            />
          </div>

          <div>
            <label
              className="flex gap-2 text-white font-semibold mb-2"
              style={{
                paddingTop: "20px",
                paddingBottom: "10px",
                fontFamily: "Impact",
                fontStyle: "normal",
                fontSize: "32px",
                lineHeight: "24px",
                color: "#FFFFFF",
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                fontWeight: "400",
                flexGrow: 0,
              }}
            >
              Confirm Password
              <Edit />
            </label>
            <Input
              className="bg-[#383838] text-white"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px 24px",
                gap: "10px",
                width: "343px",
                height: "50px",
                background: "#383838",
                borderRadius: "4px",
                flex: "none",
                order: 1,
                alignSelf: "stretch",
                flexGrow: 0,
              }}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-white font-semibold mb-2"
              style={{
                paddingTop: "20px",
                paddingBottom: "10px",
                fontFamily: "Impact",
                fontStyle: "normal",
                fontSize: "32px",
                lineHeight: "24px",
                color: "#FFFFFF",
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                fontWeight: "400",
                flexGrow: 0,
              }}
            >
              Email ID
            </label>
            <div className="relative">
              <Input
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "10px 24px",
                  gap: "10px",
                  width: "343px",
                  height: "50px",
                  background: "#383838",
                  borderRadius: "4px",
                  flex: "none",
                  order: 1,
                  alignSelf: "stretch",
                  flexGrow: 0,
                }}
                value={email}
                readOnly
              />
            </div>
          </div>
        </div>

        {saveError && (
          <div className="mt-4 p-2 bg-red-500 text-white rounded">
            {saveError}
          </div>
        )}

        {saveSuccess && (
          <div className="mt-4 p-2 bg-green-500 text-white rounded">
            Profile updated successfully!
          </div>
        )}

        {passwordError && (
          <div className="mt-4 p-2 bg-red-500 text-white rounded">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="mt-4 p-2 bg-green-500 text-white rounded">
            Password updated successfully!
          </div>
        )}

        <div className="mt-10 flex gap-8">
          <Button
            className="bg-purple-600 hover:bg-purple-700 px-6 py-6"
            style={{ fontSize: "18px" }}
            onClick={handleSaveChanges}
            disabled={isLoading || isSaving || isChangingPassword}
          >
            {isSaving ? "Saving..." : "Confirm Changes"}
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 px-6 py-6"
            style={{ fontSize: "18px" }}
            onClick={handleChangePassword}
            disabled={isLoading || isSaving || isChangingPassword}
          >
            {isChangingPassword ? "Updating..." : "Change Password"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
