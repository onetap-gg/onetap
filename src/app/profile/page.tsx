"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [formData] = useState({
    name: "Jake Jonas",
    userId: "jakkk291i9",
    email: "jakejonas@gmail.com",
    password: "Jake Jonas",
    confirmPassword: "jakkk291i9",
  });

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
              className="block text-white font-semibold mb-2"
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
            </label>
            <div className="relative">
              <Input
                className="bg-[#383838] text-white border-gray-700 pr-10"
                value={formData.name}
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
                readOnly
              />
            </div>
          </div>

          <div>
            <label
              className="block text-white font-semibold mb-2"
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
            </label>
            <div className="relative">
              <Input
                className="bg-[#383838] text-white border-gray-700 pr-10"
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
                value={formData.password}
                readOnly
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
              value={formData.userId}
              readOnly
            />
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
              Confirm Password
            </label>
            <Input
              className="bg-[#383838] text-white "
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
              value={formData.confirmPassword}
              readOnly
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
                value={formData.email}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button
            className="bg-purple-600 hover:bg-purple-700 px-6 py-6"
            style={{ fontSize: "18px" }}
          >
            Confirm Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
