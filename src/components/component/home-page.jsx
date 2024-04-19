"use client";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiSettings, FiUpload, FiLogOut, FiUser, FiPackage, FiFlag } from "react-icons/fi";
import { cv } from "@/components/component/cv";
import { useState } from "react";
import {settings} from "@/components/component/settings";

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };
  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <header className="flex h-20 items-center justify-center px-4 border-b md:px-6">
        <Link href="#" className="mr-auto flex items-center gap-2 text-lg font-semibold">
          <FiFlag className="w-6 h-6" />
          <span className="sr-only">Easy Internship</span>
          Easy Internship
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center justify-center space-x-4">
            <li>
              <div className="flex items-center gap-2">
                <FiPackage className="w-6 h-6" />
                <Link href="#" className="font-medium">
                  Emails
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <FiUpload className="w-6 h-6" />
                <button onClick={openModal} className="font-medium">
                  Upload CV
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <FiSettings className="w-6 h-6" />
                <button onClick={openSettings} className="font-medium">
                  Settings
                </button>
              </div>
            </li>
          </ul>
        </nav>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full border-2 border-gray-200" size="icon" variant="ghost">
              <span className="sr-only">Open messages</span>
              <Avatar
                alt="Avatar"
                className="border w-8 h-8 rounded-full object-cover"
                height="32"
                src="/placeholder-user.jpg"
                width="32"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div>
              <div className="flex items-center gap-2">
                <Avatar
                  alt="Avatar"
                  className="border w-10 h-10 rounded-full object-cover"
                  height="40"
                  src="/placeholder-user.jpg"
                  width="40"
                />
                <div className="space-y-1 leading-none">
                  <div className="font-semibold">Grace Smith</div>
                  <div className="text-xs leading-none text-gray-500 dark:text-gray-400">grace@example.com</div>
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <div className="flex justify-center items-center">
                    <div className="mt-4 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <FiUser className="w-6 h-6" />
                        <span>Profile</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiSettings className="w-6 h-6" />
                        <span>Settings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiLogOut className="w-6 h-6" />
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Compose new email</h1>
            <p className="text-gray-500 dark:text-gray-400">Fill in the details below.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter subject" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea className="min-h-[200px]" id="message" placeholder="Enter your message" />
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
    <div className="bg-white p-0 rounded-md max-w-md w-full h-3/4" onClick={stopPropagation}>
      <div className="flex flex-col justify-center h-full">
        {/* <div className="flex justify-end">
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> */}
        <div className="mb-8 flex justify-center">
          {cv()}
        </div>
      </div>
    </div>
  </div>
)}

      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeSettings}>
          <div className="bg-white p-0 rounded-md max-w-md w-full" onClick={stopPropagation}>
            {/* <div className="flex justify-end">
              <button onClick={closeSettings} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div> */}
            <div className="mb-8 h-1/2">
              {settings()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
